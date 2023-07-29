import supabase from "../config/supabaseClient";
import { Jwt } from "jsonwebtoken";

class AccountManager {
  constructor() {
    this.loginStatus = false;
    this.sessionToken = null;
  }

  saveLoginStatus() {
    localStorage.setItem("loginStatus", JSON.stringify(this.loginStatus));
    localStorage.setItem("sessionToken", JSON.stringify(this.sessionToken));
  }

  // Load login status and session token from localStorage
  loadLoginStatus() {
    const loginStatus = localStorage.getItem("loginStatus");
    const sessionToken = localStorage.getItem("sessionToken");
    this.loginStatus = loginStatus ? JSON.parse(loginStatus) : false;
    this.sessionToken = sessionToken ? JSON.parse(sessionToken) : null;
    return loginStatus;
  }

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

      // Generate a session token (JWT)
      const payload = { userId: user[`${event.Type}ID`] };
      const secretKey = "your-secret-key"; // Replace with your actual secret key
      const options = { expiresIn: "1d" }; // Token expires in 1 day, change as needed
      this.sessionToken = Jwt.sign(payload, secretKey, options);

      this.loginStatus = true;
      this.saveLoginStatus(); // Store login status and session token in local storage
      window.location.href = redirectUrl;
    } else {
      throw new Error("Invalid credentials");
    }
  }

  logout() {
    this.loginStatus = false;
    this.sessionToken = null;
    this.saveLoginStatus(); // Store login status and session token in local storage
    window.location.href = "/"; // Redirect to the home page after logout
  }

  getSessionToken() {
    return this.sessionToken;
  }

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
    const unitDataPromises = leaseData.map((lease) =>
      supabase
        .from("Unit")
        .select("UnitNumber")
        .eq("LeaseID", lease.LeaseID)
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

  static getInstance(loginStatus = false) {
    if (!AccountManager.instance) {
      AccountManager.instance = new AccountManager(loginStatus);
    }
    return AccountManager.instance;
  }

}

export default AccountManager;
