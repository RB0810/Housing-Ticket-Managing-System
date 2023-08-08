import "jsdom-global/register";
import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import CreateTicket from "./createticket";
import supabase from "../../config/supabaseClient";

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

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("Create Ticket Component", () => {
  jest.setTimeout(20000);
  let originalTicketData;
  let createdTicketID;

  beforeAll(async () => {
    // Save the original staff data before running the test
    const { data } = await supabase.from("Service Request").select("*");
    originalTicketData = data;
  });

  afterAll(async () => {
    // Delete the created staff record from the StaffUsers table
    await supabase.from("Service Request").delete().eq("ServiceRequestID", createdTicketID);
  });

  test("should create a new ticket", async () => {
    render(<CreateTicketWrapper />);

    // Fill in the form fields
    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "testticket" } });
    const selectNode = screen.getByTestId("tenant-create-ticket-request-type-select");
    fireEvent.change(selectNode, { target: { value: "Toilet" } });
    fireEvent.change(screen.getByLabelText("Description"), { target: { value: "integration-testing" } });

    // Wait for the property dropdown to be populated
    const propertyDropdown = await screen.findByTestId("tenant-create-ticket-property-type-select");
    // Assuming that the dropdown options are rendered as <option> elements, you can select the desired option like this:
    fireEvent.change(propertyDropdown, { target: { value: "TESTUNITDONTDELETE" } });

    // Simulate the form submission
    fireEvent.click(screen.getByTestId("tenant-create-ticket-submit-button"));

    await sleep(5000);

    // Assertions and verifications
    const { data: updatedTicketData } = await supabase.from("Service Request").select("*");
    expect(updatedTicketData.length).toBe(originalTicketData.length+1);
    const newTicket = updatedTicketData.find(
      (ticket) => !originalTicketData.some((original) => original.ServiceRequestID === ticket.ServiceRequestID)
    );

    console.log(newTicket)

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
