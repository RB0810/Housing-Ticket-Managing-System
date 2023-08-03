import TicketManager from "./ticketmanager";
import Ticket from "../objects/ticket";
import supabase from "../config/supabaseClient";

describe("TicketManager all test cases", () => {
  let ticketManager = new TicketManager();
  beforeAll(async () => {
    let currentDate = new Date();
    let timezoneOffset = currentDate.getTimezoneOffset() * 60000;
    let localTime = new Date(currentDate - timezoneOffset);
    let submittedDateTime = localTime
      .toISOString()
      .replace("T", " ")
      .slice(0, -5);
    // Create a ticket with the name "TESTINGTICKETJEST" with ID 11111
    const { data, error } = await supabase // Create a new ticket
      .from("Service Request")
      .insert([
        {
          ServiceRequestID: 11111,
          Name: "TESTINGTICKETJEST",
          TenantID: 999,
          Status: "TESTINGTICKETSTATUS",
          SubmittedDateTime: submittedDateTime,
          Category: "TESTINGCATEGORYJEST",
          Description: "TESTINGDESCRIPTIONJEST",
          PARCStatus: "TESTINGPARCSTATUSJEST",
        },
      ])
      .select();

    if (error) {
      throw error;
    } else {
      console.log("Created a new ticket for testing.");
    }
  });

  test("Getting Ticket does not return False", async () => {
    const retrieved = await ticketManager.getTicket(11111);
    expect(retrieved).not.toEqual(false);
  });

  test("Change ticket status returns true if changed", async () => {
    const updated = await ticketManager.updateTicket(
      11111,
      "Status",
      "TESTINGSTATUSJEST"
    );
    expect(updated).toEqual(true);
  });

  test("Change ticket PARC status returns true if changed", async () => {
    const updated = await ticketManager.updateTicket(
      11111,
      "PARCStatus",
      "TESTINGPARCSTATUSJEST"
    );
    expect(updated).toEqual(true);
  });

  test("Assign Ticket to Staff", async () => {
    const assigned = await ticketManager.assignTicket(11111, 999);
    expect(assigned).toEqual(true);
  });

  test("Submits feedback rating for ticket", async () => {
    const feedbackRating = await ticketManager.updateTicket(
      11111,
      "FeedbackRating",
      "TESTINGFEEDBACKRATINGJEST"
    );
    expect(feedbackRating).toEqual(true);
  });

  test("Submits feedback comments for ticket", async () => {
    const feedbackComments = await ticketManager.updateTicket(
      11111,
      "FeedbackComments",
      "TESTINGFEEDBACKCOMMENTSJEST"
    );
    expect(feedbackComments).toEqual(true);
  });

  test("Sends no quotation required to database", async () => {
    const quotationRequired = await ticketManager.updateTicket(
      11111,
      "QuotationRequired",
      false
    );
    expect(quotationRequired).toEqual(true);
  });

  test("View all active tickets for a particular tenant", async () => {
    const activeTickets = await ticketManager.getTicketsByPARCStatusForTenantID(
      "ACTIVE",
      999
    );
    expect(activeTickets).not.toEqual(false);
  });

  test("View all pending tickets for a particular tenant", async () => {
    const pendingTickets =
      await ticketManager.getTicketsByPARCStatusForTenantID("PENDING", 1);
    expect(pendingTickets).not.toEqual(false);
  });

  test("View all closed tickets for a particular tenant", async () => {
    const closedTickets = await ticketManager.getTicketsByPARCStatusForTenantID(
      "CLOSED",
      999
    );
    expect(closedTickets).not.toEqual(false);
  });

  // Negative test cases
  test("Creating a new ticket with invalid TenantID should return false", async () => {
    const ticket = new Ticket(
      "TESTINGTICKETSTATUS",
      "hello",
      "2021-08-01 00:00:00",
      "TESTINGCATEGORYJEST",
      "TESTINGDESCRIPTIONJEST",
      "TESTINGLOCATIONJEST"
    );
    const added = await ticketManager.addTicket(ticket);
    expect(added).toEqual(false);
  });

  test("Getting a non-existent ticket should return false", async () => {
    const retrieved = await ticketManager.getTicket(999999);
    expect(retrieved).toEqual(false);
  });

  test("Updating a non-existent ticket should return false", async () => {
    const updated = await ticketManager.updateTicket(
      999999,
      "Status",
      "TESTINGSTATUSJEST"
    );
    expect(updated).toEqual(false);
  });

  test("Deleting a non-existent ticket should return false", async () => {
    const deleted = await ticketManager.deleteTicket(999999);
    expect(deleted).toEqual(false);
  });

  test("Assigning ticket to non-existent staff should return false", async () => {
    const assigned = await ticketManager.assignTicket(999999, 999999);
    expect(assigned).toEqual(false);
  });

  afterAll(async () => {
    // Clean up testing
    try {
      const { data, error } = await supabase
        .from("Service Request")
        .delete()
        .eq("ServiceRequestID", 11111);
      if (error) {
        throw new Error("Failed to clean up testing data from the database.");
      }
    } catch (err) {
      console.error("Error during cleanup:", err);
    }
  });
});
