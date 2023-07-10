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
      const redirectUrl = `/${event.Type.toLowerCase()}landingpage/${user[`${event.Type}ID`]}`;
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
