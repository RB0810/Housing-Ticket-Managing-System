import AccountManager from "./accountmanager";
import supabase from "../config/supabaseClient";

import { JSDOM } from "jsdom";
const dom = new JSDOM();
global.window = dom.window;

describe("AccountManager all test cases", () => {
  let accountManager;

  beforeAll(() => {
    accountManager = new AccountManager();
  });

  // Sample test data
  const supervisorData = {
    SupervisorID: 1000,
    SupervisorName: "TEST SUPERVISOR",
    SupervisorEmail: "testsupervisor@gmail.com",
    SupervisorPassword: "testsupervisor123",
    SupervisorPhone: 12345678,
    BuildingID: null,
  };

  const buildingData = {
    BuildingID: 1000,
    BuildingName: "TEST BUILDING",
    Address: "Clarke Quay",
    PostalCode: "356123",
  };

  const commenceTimestamp = 1679683200000; // July 23, 2023
  const terminationTimestamp = 1737628800000; // July 23, 2024

  const leaseData = {
    CommenceDate: new Date(commenceTimestamp).toISOString(),
    TerminationDate: new Date(terminationTimestamp).toISOString(),
    Status: "ACTIVE",
    AreaInSqMeters: "5000",
    TradeType: "TESTING",
    MonthlyRental: "5000",
  };

  const unitsData = {
    number: 2,
    unit: ["L3-101","L4-100"],
  };

  test("Create supervisor account", async () => {
    const { data: originalSupervisorData } = await supabase.from("SupervisorUsers").select("*");
    await accountManager.createSupervisorAcc(buildingData, supervisorData);
    const { data: updatedSupervisorData } = await supabase.from("SupervisorUsers").select("*");
  
    // After insertion the length should increase to 1
    expect(updatedSupervisorData.length).toBe(originalSupervisorData.length + 1);
  
    // Find the newly inserted supervisor by comparing the data before and after insertion
    const newSupervisor = updatedSupervisorData.find(
      (supervisor) => !originalSupervisorData.some((original) => original.SupervisorID === supervisor.SupervisorID)
    );

    // Check if the supervisor is correctly linked to the building
    expect(newSupervisor.SupervisorID).toBe(1000);
    expect(newSupervisor.BuildingID).toBe(1000);

  });
  
  const tenantData = {
    TenantID: 1000,
    TenantName: "TEST TENANT",
    TenantEmail: "testtenant@gmail.com",
    TenantPassword: "testtenant123",
    TenantPhone: 12345678,
    UnderSupervisor: 1000,
    Lease: null,
  };
  
  test("Create tenant account with lease and units", async () => {
    const { data: originalTenantData } = await supabase.from("TenantUsers").select("*");
    const { data: originalLeaseData } = await supabase.from("Lease").select("*");
    const { data: originalUnitsData } = await supabase.from("Unit").select("*");
  
    await accountManager.createTenantAccount(tenantData, leaseData, unitsData);
  
    const { data: updatedTenantData } = await supabase.from("TenantUsers").select("*");
    const { data: updatedLeaseData } = await supabase.from("Lease").select("*");
    const { data: updatedUnitsData } = await supabase.from("Unit").select("*");
  
    // After insertion the length should increase to 1
    expect(updatedTenantData.length).toBe(originalTenantData.length + 1);
    expect(updatedLeaseData.length).toBe(originalLeaseData.length + 1);
    expect(updatedUnitsData.length).toBe(originalUnitsData.length + 2);

    const newTenant = updatedTenantData.find(
      (tenant) => !originalTenantData.some((original) => original.TenantID === tenant.TenantID)
    );
  
    // Check if the Tenant is correctly linked to the Supervisor
    expect(newTenant.TenantID).toBe(1000);
    expect(newTenant.UnderSupervisor).toBe(1000);
  });
  
  const staffData = {
    StaffID: 1000,
    StaffName: "TEST STAFF",
    StaffEmail: "teststaff@gmail.com",
    StaffPassword: "teststaff123",
    StaffPhone: 12345678,
    BuildingID: 1000,
  };

  test("Create staff account", async () => {
    const { data: originalStaffData } = await supabase.from("StaffUsers").select("*");  
    await accountManager.createStaffAccount(staffData);
    const { data: updatedStaffData } = await supabase.from("StaffUsers").select("*");
  
    // After insertion the length should increase to 1
    expect(updatedStaffData.length).toBe(originalStaffData.length + 1);

    const newStaff = updatedStaffData.find(
      (staff) => !originalStaffData.some((original) => original.StaffID === staff.StaffID)
    );
  
    // Check if the new staff is correctly linked to the building
    expect(newStaff.StaffID).toBe(1000);
    expect(newStaff.BuildingID).toBe(1000);
  });
  
  

  test("Get supervisor details", async () => {
    const supervisorDetails = await accountManager.getSupervisorDetails(1000);
    // Assertions
    expect(supervisorDetails).toBeDefined();
    expect(supervisorDetails.SupervisorID).toBe(1000);
    expect(supervisorDetails.BuildingDetails).toBeDefined();
  });
  

  test("Get staff details", async () => {
    const staffDetails = await accountManager.getStaffDetails(1000);
    // Assertions
    expect(staffDetails).toBeDefined();
    expect(staffDetails.StaffID).toBe(1000);
    expect(staffDetails.BuildingDetails).toBeDefined();
    expect(staffDetails.SupervisorDetails).toBeDefined();
  });

  test("Get tenant details", async () => {
    const tenantDetails = await accountManager.getTenantDetails(1000);
    // Assertions
    expect(tenantDetails).toBeDefined();
    expect(tenantDetails.TenantID).toBe(1000);
    expect(tenantDetails.LeaseDetails).toBeDefined();
    expect(tenantDetails.Units).toBeDefined();
    expect(tenantDetails.BuildingDetails).toBeDefined();
    expect(tenantDetails.SupervisorDetails).toBeDefined();
  });

  test("Get units", async () => {
    const units = await accountManager.getUnits(1000);
    // Assertions
    expect(units).toBeDefined();
    expect(Array.isArray(units)).toBe(true);
    expect(units.length).toBe(2);
  });
  

  test("Get all building details", async () => {
    const buildingsWithSupervisor = await accountManager.getBuildingsandSupervisors();
    // Assertions
    expect(buildingsWithSupervisor).toBeDefined();
    expect(Array.isArray(buildingsWithSupervisor)).toBe(true);
    expect(buildingsWithSupervisor.length).toBeGreaterThanOrEqual(1);
    expect(buildingsWithSupervisor[0].BuildingID).toBeDefined();
    expect(buildingsWithSupervisor[0].BuildingName).toBeDefined();
    expect(buildingsWithSupervisor[0].supervisor).toBeDefined();
  });

  test("Get all staff for a supervisor", async () => {
    const staffForSupervisor = await accountManager.getAllStaffForSupervisorID(1000);
    // Assertions
    expect(staffForSupervisor).toBeDefined();
    expect(Array.isArray(staffForSupervisor)).toBe(true);
  });

  // test("loginAuth should redirect to correct URL on successful login", async () => {
  //   const event = {
  //     Type: "Supervisor",
  //     ID: "rohan@gmail.com",
  //     password: "rohan123",
  //   };

  //   // Mock window.location.href
  //   delete window.location;
  //   window.location = { href: "" };

  //   await accountManager.loginAuth(event);

  //   // Replace 'expectedUserID' with the expected user ID after successful login
  //   expect(window.location.href).toBe("/supervisorportal/landingpage/10");
  // });

  // test("loginAuth should throw an error on invalid credentials", async () => {
  //   // Mock event data with incorrect password
  //   const event = {
  //     Type: "Supervisor",
  //     ID: "testsupervisor@gmail.com",
  //     password: "wrong-password",
  //   };

  //   await expect(accountManager.loginAuth(event)).rejects.toThrow("Invalid credentials");
  // });

  test("setPassword should set the password successfully", async () => {
    // Mock user type, user ID, and new password
    const userType = "Supervisor";
    const userID = 1000;
    const password = "new-password";

    // Mock console.log
    const consoleLogSpy = jest.spyOn(console, "log");

    await accountManager.setPassword(userType, userID, password);

    expect(consoleLogSpy).toHaveBeenCalledWith("Password set successfully!");
  });

  afterAll(async () => {
    //Clean up testing data
    await supabase.from("TenantUsers").delete().eq("TenantName", "TEST TENANT");
    await supabase.from("Unit").delete().eq("UnitNumber", "L3-101");
    await supabase.from("Unit").delete().eq("UnitNumber", "L4-100");
    await supabase.from("Lease").delete().eq("TradeType", "TESTING");

    await supabase.from("StaffUsers").delete().eq("StaffName", "TEST STAFF");
    
    await supabase.from("SupervisorUsers").delete().eq("SupervisorName", "TEST SUPERVISOR");
    await supabase.from("Buildings").delete().eq("BuildingName", "TEST BUILDING");
    
  });
});
