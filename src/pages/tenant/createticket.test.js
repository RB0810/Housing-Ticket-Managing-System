import "jsdom-global/register";
import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import CreateTicket from "./createticket"; 
import supabase from "../../config/supabaseClient";
import Cookies from "js-cookie";
jest.mock('js-cookie');


const CreateTicketWrapper = () => {
    const TenantID = 999;
    return (
        <MemoryRouter initialEntries={[`/tenantportal/createticket/${TenantID}`]}>
        <Routes>
            <Route path="/tenantportal/createticket/:TenantID" element={<CreateTicket />} />
        </Routes>  
        </MemoryRouter>
    );
  };

describe("Create Ticket Component", () => {
  let originalTicketData;
  let createdTicketID;

  beforeAll(async () => {
    // Save the original staff data before running the test
    const { data } = await supabase.from("Service Request").select("*");
    originalTicketData = data;

    //Mock the cookies
    Cookies.get.mockImplementation((key) => {
        const SHA256 = require('crypto-js').SHA256;
        switch (key) {
            case 'userId':
            return  SHA256('999').toString(); ;  //Hash the tenantID and store
            case 'type':
            return 'Tenant';  // The user type must be "Tenant"
            default:
            return null;
        }
        });
  });

  afterAll(async () => {
    // Delete the created staff record from the StaffUsers table
    await supabase.from("Service Request").delete().eq("ServiceRequestID", createdTicketID);
  });


  test("should create a new ticket", async () => {
    jest.setTimeout(50000);
    render(<CreateTicketWrapper />);
  
    // Fill in the form fields (replace data-testid with the actual test IDs in your component)
    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "testticket" } });
    const selectNode = screen.getByTestId("tenant-create-ticket-request-type-select");
    fireEvent.change(selectNode, { target: { value: "Toilet" } });
    fireEvent.change(screen.getByLabelText("Description"), { target: { value: "integration-testing" } });
    const selectNode2 = screen.getByTestId("tenant-create-ticket-property-type-select");
    fireEvent.change(selectNode2, { target: { value: "TESTUNITDONTDELETE" } });
  
    // Simulate the form submission
    fireEvent.click(screen.getByTestId("tenant-create-ticket-submit-button"));
  
    // Increase the timeout and adjust the interval for waitFor
    await waitFor(
      async () => {
        const { data } = await supabase.from("Service Request").select("*");
        const newTicket = data.find(
          (ticket) => !originalTicketData.some((original) => original.ServiceRequestID === ticket.ServiceRequestID)
        );
        return newTicket;
      },
      { interval: 5000, timeout: 70000 } // Increase the interval and timeout
    );
  
    const { data: updatedTicketData } = await supabase.from("Service Request").select("*");
    // After insertion the length should increase to 1
    expect(updatedTicketData.length).toBe(originalTicketData.length + 1);
  
    const newTicket = updatedTicketData.find(
      (ticket) => !originalTicketData.some((original) => original.ServiceRequestID === ticket.ServiceRequestID)
    );
    console.log(newTicket);

    createdTicketID = newTicket.ServiceRequestID;
    expect(newTicket.Name).toBe("testticket");
    expect(newTicket.TenantID).toBe(999);
    expect(newTicket.SupervisorID).toBe(999);
    expect(newTicket.Category).toBe("Toilet");
    expect(newTicket.Description).toBe("integration-testing");
    expect(newTicket.Status).toBe("Awaiting Review");
    expect(newTicket.PARCStatus).toBe("PENDING");
  });
  
});