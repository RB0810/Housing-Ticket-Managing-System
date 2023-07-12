import supabase from "../config/supabaseClient";

class AccountManager {
  
  async loginAuth(event) {
    const { data, error } = await supabase
      .from(`${event.Type}Users`)
      .select("*")
      .eq(`${event.Type}Email`, event.ID);

    if (error) {
      throw error;
    }

    const user = data[0];

    if (user && user[`${event.Type}Password`] === event.password) {
      const redirectUrl = `/${event.Type.toLowerCase()}portal/landingpage/${user[`${event.Type}ID`]}`;
      window.location.href = redirectUrl;
    } else {
      throw new Error("Invalid credentials");
    }
  }

  async createSupervisorAcc(building, supervisor) {
    const { data } = await supabase.from("Buildings").insert(building).select();
    const buildingID = data[0].BuildingID;
    console.log(buildingID);
    supervisor.BuildingID = buildingID;
    await supabase.from("SupervisorUsers").insert(supervisor);
  }

  async getBuildings() {
    const { data } = await supabase.from("Buildings").select("*");
    return data;
  }

  async getBuildingsandSupervisors() {
    const { data: buildings } = await supabase.from('Buildings').select('*');
  
    const buildingsWithSupervisor = await Promise.all(
      buildings.map(async (building) => {
        const { data: supervisor } = await supabase
          .from('SupervisorUsers')
          .select('*')
          .eq('BuildingID', parseInt(building.BuildingID));
  
        return { ...building, supervisor: supervisor[0] || null };
      })
    );
  
    return buildingsWithSupervisor;
  }

  async getBuildingDetails(buildingId) {
    const {data : buildingData} = await supabase.from("Buildings").select("*").eq("BuildingID", parseInt(buildingId));
    const { data: supervisor } = await supabase.from("SupervisorUsers").select("SupervisorID").eq("BuildingID", parseInt(buildingId));
    const { data: staffData } = await supabase.from("StaffUsers").select("*").eq("BuildingID", parseInt(buildingId)); 
    const { data: tenantData } = await supabase.from("TenantUsers").select("*").eq("UnderSupervisor", parseInt(supervisor[0].SupervisorID));
    const leaseIds = tenantData.map((tenant) => tenant.Lease);
    const { data: leaseData } = await supabase.from("Lease").select("*").in("LeaseID", leaseIds);
    const unitDataPromises = leaseData.map((lease) => 
        supabase.from("Unit").select("UnitNumber").eq("LeaseID", lease.LeaseID)
        .then((response) => response.data)
    );
    const unitData = await Promise.all(unitDataPromises);
    const buildingDetails = {
      Building: buildingData[0],
      staff: staffData,
      tenant: tenantData.map((tenant, index) => ({
        ...tenant,
        LeaseDetails: leaseData.find((lease) => lease.LeaseID === tenant.Lease),
        Units: unitData[index],
      })),
    };
  
    return buildingDetails;
  }
  
  

  async createStaffAccount(staff) {
    await supabase.from("StaffUsers").insert(staff);
  }

  async createTenantAccount(tenant, lease, units) {
    console.log(tenant, lease, units);
    const { data } = await supabase.from("Lease").insert(lease).select();
    const leaseID = data[0].LeaseID;
    tenant.Lease = leaseID;
    await supabase.from("TenantUsers").insert(tenant);
    const supervisorID = tenant.UnderSupervisor;
    console.log(supervisorID);
    const { data: dataBuilding } = await supabase
      .from("SupervisorUsers")
      .select("*")
      .eq("SupervisorID", parseInt(supervisorID));
    console.log(dataBuilding[0].BuildingID);
    var unitInsert = {
      LeaseID: leaseID,
      BuildingID: dataBuilding[0].BuildingID,
      UnitNumber: null,
    };
    for (var i = 0; i < units.number; i++) {
      unitInsert.UnitNumber = units.unit[i];
      console.log(unitInsert);
      await supabase.from("Unit").insert(unitInsert);
    }
  }
}

export default AccountManager;