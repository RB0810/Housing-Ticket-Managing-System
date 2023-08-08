import "jsdom-global/register";
import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import CreateSupervisorAcc from "./createsupervisoracc"; 
import supabase from "../../config/supabaseClient"; 

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("CreateSupervisorAcc Component", () => {
  jest.setTimeout(20000);
  let originalSupervisorData;
  let createdBuildingId;
  let createdSupervisorId;

  beforeAll(async () => {
    // Save the original supervisor and building data before running the test
    const { data } = await supabase.from("SupervisorUsers").select("*");
    originalSupervisorData = data;

    console.log("original", originalSupervisorData);
  });

  afterAll(async () => {
    // Delete the created supervisor and building record from the StaffUsers table
    await supabase.from("SupervisorUsers").delete().eq("SupervisorID", createdSupervisorId);
    await supabase.from("Buildings").delete().eq("BuildingID", createdBuildingId);

  });

  test("should create a new supervisor account", async () => {
    render(
      <MemoryRouter>
        <CreateSupervisorAcc />
      </MemoryRouter>
    );

    // Fill in the form fields (replace data-testid with the actual test IDs in your component)
    fireEvent.change(screen.getByLabelText("Supervisor Username:"), { target: { value: "testuser" } });
    fireEvent.change(screen.getByLabelText("Supervisor Email:"), { target: { value: "test123@example.com" } });
    fireEvent.change(screen.getByLabelText("Enter Password:"), { target: { value: "testpassword123" } });
    fireEvent.change(screen.getByLabelText("Re-enter Password:"), { target: { value: "testpassword123" } });
    fireEvent.change(screen.getByLabelText("Supervisor Phone:"), { target: { value: "82793729" } });
    fireEvent.change(screen.getByLabelText("Building Name:"), { target: { value: "testbuilding" } });
    fireEvent.change(screen.getByLabelText("Building Address:"), { target: { value: "12 test avenue" } });
    fireEvent.change(screen.getByLabelText("Postal Code:"), { target: { value: "12373" } });

    // Simulate the form submission
    fireEvent.click(screen.getByTestId("create-supervisor-submit-button"));
    
    await sleep(5000);

    // Fetch the updated data
    const { data: updatedSupervisorData } = await supabase.from("SupervisorUsers").select("*");
    console.log("updated", updatedSupervisorData);

    // After insertion the length should increase to 1
    expect(updatedSupervisorData.length).toBe(originalSupervisorData.length + 1);

    const newSupervisor = updatedSupervisorData.find(
      (supervisor) => !originalSupervisorData.some((original) => original.SupervisorID === supervisor.SupervisorID)
    );
    console.log(newSupervisor);
    createdSupervisorId = newSupervisor.SupervisorID;

    
    createdBuildingId = newSupervisor.BuildingID;
    console.log("created building", createdBuildingId);
    const {data: newBuilding} = await supabase.from("Buildings").select("*").eq("BuildingID", createdBuildingId);
    console.log(newBuilding[0]);

    expect(newSupervisor.SupervisorName).toBe("testuser");
    expect(newSupervisor.SupervisorEmail).toBe("test123@example.com");
    expect(newSupervisor.SupervisorPassword).toBe("testpassword123");
    expect(newBuilding[0].BuildingName).toBe("testbuilding");
    expect(newBuilding[0].Address).toBe("12 test avenue");
    expect(newBuilding[0].PostalCode).toBe(12373);

  });
});
