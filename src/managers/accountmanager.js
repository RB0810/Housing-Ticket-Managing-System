import supabase from "../config/supabaseClient";

class AccountManager {

  async setPassword(Type, ID, password) {
    const { data, error } = await supabase
      .from(`${Type}Users`)
      .update({ [`${Type}Password`]: password })
      .eq(`${Type}ID`, parseInt(ID));

    if (error) {
      console.error("Failed to set password");
    } else {
      console.log("Password set successfully!");
    }
  }

  async getSupervisorDetails(supervisorID) {
    const { data: supervisor } = await supabase
      .from("SupervisorUsers")
      .select("*")
      .eq("SupervisorID", parseInt(supervisorID));
    const buildingID = supervisor[0].BuildingID;
    const { data: Building } = await supabase
      .from("Buildings")
      .select("*")
      .eq("BuildingID", buildingID);
    const supervisorDetails = {
      ...supervisor[0],
      BuildingDetails: Building[0],
    };
    return supervisorDetails;
  }

  async getStaffDetails(staffID) {
    const { data: staffData } = await supabase
      .from("StaffUsers")
      .select("*")
      .eq("StaffID", parseInt(staffID));
    const buildingID = staffData[0].BuildingID;
    const { data: buildingData } = await supabase
      .from("Buildings")
      .select("*")
      .eq("BuildingID", buildingID);
    const { data: supervisorData } = await supabase
      .from("SupervisorUsers")
      .select("*")
      .eq("BuildingID", buildingID);
    const staffDetails = {
      ...staffData[0],
      BuildingDetails: buildingData[0],
      SupervisorDetails: supervisorData[0],
    };
    return staffDetails;
  }

  async getAssignedStaffDetails(staffID) {
    if (staffID == null) {
      return false;
    }
    const { data: staffData } = await supabase
      .from("StaffUsers")
      .select("*")
      .eq("StaffID", parseInt(staffID));
    return staffData[0];
  }

  async getSubmittedByTenantDetails(tenantID) {
    if (tenantID == null) {
      return false;
    }
    const { data: tenantData } = await supabase
      .from("TenantUsers")
      .select("*")
      .eq("TenantID", parseInt(tenantID));
    return tenantData[0];
  }

  async getTenantDetails(tenantID) {
    const { data: tenantData } = await supabase
      .from("TenantUsers")
      .select("*")
      .eq("TenantID", parseInt(tenantID));
    const leaseID = tenantData[0].Lease;
    const supervisorID = tenantData[0].UnderSupervisor;
    const { data: supervisor } = await supabase
      .from("SupervisorUsers")
      .select("*")
      .eq("SupervisorID", supervisorID);
    const { data: leaseData } = await supabase
      .from("Lease")
      .select("*")
      .eq("LeaseID", leaseID);
    const { data: unitData } = await supabase
      .from("Unit")
      .select("*")
      .eq("LeaseID", leaseID);
    const buildingID = unitData[0].BuildingID;
    const { data: Building } = await supabase
      .from("Buildings")
      .select("*")
      .eq("BuildingID", buildingID);
    const tenantDetails = {
      ...tenantData[0],
      LeaseDetails: leaseData[0],
      Units: unitData,
      BuildingDetails: Building[0],
      SupervisorDetails: supervisor[0],
    };

    return tenantDetails;
  }

  async getUnits(tenantID) {
    const { data: tenantData } = await supabase
      .from("TenantUsers")
      .select("*")
      .eq("TenantID", parseInt(tenantID));
    const leaseID = tenantData[0].Lease;
    const { data: unitData } = await supabase
      .from("Unit")
      .select("UnitNumber")
      .eq("LeaseID", leaseID);
    console.log(unitData);
    return unitData;
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
    const { data: buildings } = await supabase.from("Buildings").select("*");

    const buildingsWithSupervisor = await Promise.all(
      buildings.map(async (building) => {
        const { data: supervisor } = await supabase
          .from("SupervisorUsers")
          .select("*")
          .eq("BuildingID", parseInt(building.BuildingID));

        return { ...building, supervisor: supervisor[0] || null };
      })
    );

    return buildingsWithSupervisor;
  }

  async getBuildingDetails(buildingId) {
    const { data: buildingData } = await supabase
      .from("Buildings")
      .select("*")
      .eq("BuildingID", parseInt(buildingId));
    const { data: supervisor } = await supabase
      .from("SupervisorUsers")
      .select("SupervisorID")
      .eq("BuildingID", parseInt(buildingId));
    const { data: staffData } = await supabase
      .from("StaffUsers")
      .select("*")
      .eq("BuildingID", parseInt(buildingId));
    const { data: tenantData } = await supabase
      .from("TenantUsers")
      .select("*")
      .eq("UnderSupervisor", parseInt(supervisor[0].SupervisorID));
    const leaseIds = tenantData.map((tenant) => tenant.Lease);
    const { data: leaseData } = await supabase
      .from("Lease")
      .select("*")
      .in("LeaseID", leaseIds);
  
    // Fetch all the unit data for each tenant concurrently
    const unitDataPromises = tenantData.map((tenant) =>
      supabase
        .from("Unit")
        .select("UnitNumber")
        .eq("LeaseID", tenant.Lease)
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
      const { data } = await supabase.from("Lease").insert(lease).select();
      const leaseID = data[0].LeaseID;
      tenant.Lease = leaseID;
  
      // Use a transaction to ensure all operations are performed together
      const { data: tenantData, error: tenantError } = await supabase
        .from("TenantUsers")
        .insert(tenant)
        .single();
  
      if (tenantError) {
        throw new Error("Error creating tenant account.");
      }
  
      const supervisorID = tenant.UnderSupervisor;
      const { data: dataBuilding } = await supabase
        .from("SupervisorUsers")
        .select("*")
        .eq("SupervisorID", parseInt(supervisorID));
  
      const buildingID = dataBuilding[0].BuildingID;
  
      // Use a loop to insert each unit separately
      for (var i = 0; i < units.number; i++) {
        const unitInsert = {
          LeaseID: leaseID,
          BuildingID: buildingID,
          UnitNumber: units.unit[i],
        };
        await supabase.from("Unit").insert(unitInsert);
      }
  }
  

  async getAllStaffForSupervisorID(supervisorID) {
    // Get building ID of supervisor
    const { data: buildingID } = await supabase
      .from("SupervisorUsers")
      .select("BuildingID")
      .eq("SupervisorID", parseInt(supervisorID));

    // Get all staff
    const { data: staffData } = await supabase
      .from("StaffUsers")
      .select("*")
      .eq("BuildingID", buildingID[0].BuildingID);

    console.log(staffData);
    return staffData;
  }
}

export default AccountManager;
