import "jsdom-global/register";
import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import CreateStaffAcc from "./createstaffacc"; 
import supabase from "../../config/supabaseClient"; 

describe("CreateStaffAcc Component", () => {
  let originalStaffData;
  let createdStaffId;

  beforeAll(async () => {
    // Save the original staff data before running the test
    const { data } = await supabase.from("StaffUsers").select("*");
    originalStaffData = data;
  });

  afterAll(async () => {
    // Delete the created staff record from the StaffUsers table
    await supabase.from("StaffUsers").delete().eq("StaffID", createdStaffId);
  });

  test("should create a new staff account", async () => {
    jest.setTimeout(50000);
    render(
      <MemoryRouter>
        <CreateStaffAcc />
      </MemoryRouter>
    );

    // Fill in the form fields (replace data-testid with the actual test IDs in your component)
    fireEvent.change(screen.getByLabelText("Staff Username"), { target: { value: "testuser" } });
    fireEvent.change(screen.getByLabelText("Staff Email"), { target: { value: "test123@example.com" } });
    fireEvent.change(screen.getByLabelText("Enter Password"), { target: { value: "testpassword123" } });
    fireEvent.change(screen.getByLabelText("Re-enter Password"), { target: { value: "testpassword123" } });
    fireEvent.change(screen.getByLabelText("Staff Phone Number"), { target: { value: "82793729" } });

    const selectNode = screen.getByTestId("create-staff-building-id-select");
    fireEvent.change(selectNode, { target: { value: 999 } });

    // Simulate the form submission
    fireEvent.click(screen.getByTestId("create-staff-submit-button"));

    await waitFor(
      async () => {
        const { data } = await supabase.from("StaffUsers").select("*");
        const newStaff = data.find(
          (staff) => !originalStaffData.some((original) => original.StaffID === staff.StaffID)
        );
        return newStaff;
      },
      { interval: 1000, timeout: 10000 }
    );

    const { data: updatedStaffData } = await supabase.from("StaffUsers").select("*");
    // After insertion the length should increase to 1
    expect(updatedStaffData.length).toBe(originalStaffData.length + 1);

    const newStaff = updatedStaffData.find(
      (staff) => !originalStaffData.some((original) => original.StaffID === staff.StaffID)
    );
    console.log(newStaff);
    createdStaffId = newStaff.StaffID;
    expect(newStaff.StaffName).toBe("testuser");
    expect(newStaff.StaffEmail).toBe("test123@example.com");
    expect(newStaff.StaffPassword).toBe("testpassword123");
    expect(newStaff.BuildingID).toBe(999);
  });
});
