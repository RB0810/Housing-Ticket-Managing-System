import "jsdom-global/register";
import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import CreateTenant from "./createtenantacc"; 
import supabase from "../../config/supabaseClient";
import Cookies from "js-cookie";
import { update } from "lodash";
jest.mock('js-cookie');


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

describe("Create Tenant Component", () => {
  let originalTenantData;
  let originalUnitData;
  let createdTenantID;

  beforeAll(async () => {
    
    jest.setTimeout(90000);

    // Save the original staff data before running the test
    const { data } = await supabase.from("TenantUsers").select("*");
    originalTenantData = data;

    const { data2 } = await supabase.from("Unit").select("*");
    originalUnitData = data2;

    //Mock the cookies
    Cookies.get.mockImplementation((key) => {
        const SHA256 = require('crypto-js').SHA256;
        switch (key) {
            case 'userId':
            return  SHA256('999').toString(); ;  //Hash the tenantID and store
            case 'type':
            return 'Supervisor';  // The user type must be "Tenant"
            default:
            return null;
        }
        });
  });

  afterAll(async () => {
    // Delete the created staff record from the StaffUsers table
  });

  const waitForCondition = (condition, interval = 1000, timeout = 70000) =>
    new Promise((resolve, reject) => {
      const startTime = Date.now();
      const checkCondition = async () => {
        try {
          const result = await condition();
          if (result) {
            resolve(result);
          } else if (Date.now() - startTime > timeout) {
            reject(new Error("Custom waitFor timeout"));
          } else {
            setTimeout(checkCondition, interval);
          }
        } catch (error) {
          reject(error);
        }
      };
      checkCondition();
    });

  test("should create tenant account", async () => {

    jest.setTimeout(90000);

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
    fireEvent.change(screen.getByLabelText("Lease Commencement Date:"), { target: { value: CommenceDate } });
    fireEvent.change(screen.getByLabelText("Lease Termination Date:"), { target: { value: TerminatiinDate } });
    fireEvent.change(screen.getByLabelText("Area (in Sq Meters):"), { target: { value: 3000 } });
  
    // Simulate the form submission
    fireEvent.click(screen.getByTestId("supervisor-portal-create-tenant-submit-button"));
  
    try {
      const newUnit = await waitForCondition(async () => {
        const { data } = await supabase.from("Unit").select("*");
        return data.find((unit) => !originalUnitData.some((original) => original.UnitID === unit.UnitID));
      });
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
    } catch (error) {
      console.error(error.message);
    }
  
  });

});