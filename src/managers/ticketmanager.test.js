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
    // Create a ticket with the name "TESTINGTICKETJEST"
    const ticket = new Ticket(
      "TESTINGTICKETJEST",
      1,
      submittedDateTime,
      "TESTINGCATEGORYJEST",
      "TESTINGDESCRIPTIONJEST",
      "TESTINGLOCATIONJEST"
    );

    // Use promise chaining to ensure each step executes in the right sequence
    await ticketManager
      .addTicket(ticket)
      .then(async () => {
        ticket.id = await ticketManager.getTestingTicketId();
      })
      .then(() => {
        global.testTicket = ticket;
      });
  });

  test("Getting Ticket does not return False", async () => {
    const retrieved = await ticketManager.getTicket(global.testTicket.id);
    expect(retrieved).not.toEqual(false);
  });

  test("Change ticket status returns true if changed", async () => {
    const updated = await ticketManager.updateTicket(
      global.testTicket.id,
      "Status",
      "TESTINGSTATUSJEST"
    );
    expect(updated).toEqual(true);
  });

  test("Change ticket PARC status returns true if changed", async () => {
    const updated = await ticketManager.updateTicket(
      global.testTicket.id,
      "PARCStatus",
      "TESTINGPARCSTATUSJEST"
    );
    expect(updated).toEqual(true);
  });

  test("Assign Ticket to Staff", async () => {
    const assigned = await ticketManager.assignTicket(
      global.testTicket.id,
      999
    );
    expect(assigned).toEqual(true);
  });

  test("Submits feedback rating for ticket", async () => {
    const feedbackRating = await ticketManager.updateTicket(
      global.testTicket.id,
      "FeedbackRating",
      "TESTINGFEEDBACKRATINGJEST"
    );
    expect(feedbackRating).toEqual(true);
  });

  test("Submits feedback comments for ticket", async () => {
    const feedbackComments = await ticketManager.updateTicket(
      global.testTicket.id,
      "FeedbackComments",
      "TESTINGFEEDBACKCOMMENTSJEST"
    );
    expect(feedbackComments).toEqual(true);
  });

  test("Sends no quotation required to database", async () => {
    const quotationRequired = await ticketManager.updateTicket(
      global.testTicket.id,
      "QuotationRequired",
      false
    );
    expect(quotationRequired).toEqual(true);
  });

  test("View all active tickets for a particular tenant", async () => {
    const activeTickets = await ticketManager.getTicketsByPARCStatusForTenantID(
      "ACTIVE",
      global.testTicket.tenantID
    );
    expect(activeTickets).not.toEqual(false);
  });

  test("View all pending tickets for a particular tenant", async () => {
    const pendingTickets =
      await ticketManager.getTicketsByPARCStatusForTenantID(
        "PENDING",
        global.testTicket.tenantID
      );
    expect(pendingTickets).not.toEqual(false);
  });

  test("View all closed tickets for a particular tenant", async () => {
    const closedTickets = await ticketManager.getTicketsByPARCStatusForTenantID(
      "CLOSED",
      global.testTicket.tenantID
    );
    expect(closedTickets).not.toEqual(false);
  });

  afterAll(async () => {
    // Clean up testing
    try {
      const { data, error } = await supabase
        .from("Service Request")
        .delete()
        .eq("Name", "TESTINGTICKETJEST");
      if (error) {
        throw new Error("Failed to clean up testing data from the database.");
      }
    } catch (err) {
      console.error("Error during cleanup:", err);
    }
  });
});
