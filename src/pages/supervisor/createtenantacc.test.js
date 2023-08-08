import "jsdom-global/register";
import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import CreateTenant from "./createtenantacc"; 
import supabase from "../../config/supabaseClient";

const CreateTenantWrapper = () => {
    const SupervisorID = 999;
    return (
        <MemoryRouter initialEntries={[`/supervisorportal/createtennantacc/${SupervisorID}`]}>
        <Routes>
            <Route path="/supervisorportal/createtennantacc/:SupervisorID" element={<CreateTenant />} />
        </Routes>  
        </MemoryRouter>
    );
  };

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("Create Tenant Component", () => {
  jest.setTimeout(20000);
  let originalTenantData;
  let createdTenantID;
  let createdLeaseID;

  beforeAll(async () => {
    // Save the original staff data before running the test
    const { data } = await supabase.from("TenantUsers").select("*");
    originalTenantData = data;


  });

  afterAll(async () => {
    // Delete the created staff record from the StaffUsers table
    await supabase.from("Unit").delete().eq("UnitNumber", "TESTUNITINTEGRATION");
    await supabase.from("TenantUsers").delete().eq("TenantID", createdTenantID);
    await supabase.from("Lease").delete().eq("LeaseID", createdLeaseID);
  });


  test("should create tenant account", async () => {

    render(<CreateTenantWrapper />);
    const commenceTimestamp = 1679683200000; // July 23, 2023
    const terminationTimestamp = 1737628800000; // July 23, 2024
    const CommenceDate = new Date(commenceTimestamp).toISOString();
    const TerminatiinDate = new Date(terminationTimestamp).toISOString();
  
    // Fill in the form fields (replace data-testid with the actual test IDs in your component)
    fireEvent.change(screen.getByLabelText("Tenant Username:"), { target: { value: "testuser" } });
    fireEvent.change(screen.getByLabelText("Tenant Email:"), { target: { value: "testtenant@gmail.com" } });
    fireEvent.change(screen.getByLabelText("Password:"), { target: { value: "testtenant123" } });
    fireEvent.change(screen.getByLabelText("Re-enter Password:"), { target: { value: "testtenant123" } });
    fireEvent.change(screen.getByLabelText("Tenant Phone:"), { target: { value: "98738291" } });
    fireEvent.change(screen.getByLabelText("Monthly Rental:"), { target: { value: 3000 } });
    fireEvent.change(screen.getByLabelText("Trade Type:"), { target: { value: "Business" } });
    fireEvent.change(screen.getByLabelText("Lease Commencement Date:"), { target: { value: CommenceDate } });
    fireEvent.change(screen.getByLabelText("Lease Termination Date:"), { target: { value: TerminatiinDate } });
    fireEvent.change(screen.getByLabelText("Area (in Sq Meters):"), { target: { value: 3000 } });


    // Simulate the form submission
    fireEvent.click(screen.getByTestId("supervisor-portal-create-tenant-submit-button"));
  
    await sleep(5000);

    const { data: updatedTenantData } = await supabase.from("TenantUsers").select("*");
    // After insertion, the length should increase to 1
    expect(updatedTenantData.length).toBe(originalTenantData.length + 1);

    const newTenant = updatedTenantData.find(
      (tenant) => !originalTenantData.some((original) => original.TenantID === tenant.TenantID)
    );
    console.log(newTenant);

    expect(newTenant.TenantName).toBe("testuser");
    expect(newTenant.TenantEmail).toBe("testtenant@gmail.com");
    expect(newTenant.TenantPassword).toBe("testtenant123");
    createdTenantID = newTenant.TenantID;
    createdLeaseID = newTenant.Lease;

  });

});