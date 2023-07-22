import TicketManager from "./ticketmanager";
import Ticket from "../objects/ticket";
import supabase from "../config/supabaseClient";

describe("TicketManager all test cases", () => {
  const ticketManager = new TicketManager();
  let currentDate = new Date();
  let timezoneOffset = currentDate.getTimezoneOffset() * 60000;
  let localTime = new Date(currentDate - timezoneOffset);
  let submittedDateTime = localTime
    .toISOString()
    .replace("T", " ")
    .slice(0, -5);

  const ticket = new Ticket(
    "TESTINGTICKETJEST",
    1,
    submittedDateTime,
    "TESTINGCATEGORYJEST",
    "TESTINGDESCRIPTIONJEST",
    "TESTINGLOCATIONJEST"
  );

  test("Creating new service ticket returns true", async () => {
    const created = await ticketManager.addTicket(ticket);
    console.log(ticket.id);
    expect(created).toEqual(true);
  });

  test("Getting Ticket does not return False", async () => {
    const retrieved = await ticketManager.getTicket(ticket.id);
    expect(retrieved).not.toEqual(false);
  });

  test("Change ticket status returns true if changed", async () => {
    const updated = await ticketManager.updateTicket(
      ticket.id,
      "Status",
      "TESTINGSTATUSJEST"
    );
    expect(updated).toEqual(true);
  });

  test("Change ticket PARC status returns true if changed", async () => {
    const updated = await ticketManager.updateTicket(
      ticket.id,
      "PARCStatus",
      "TESTINGPARCSTATUSJEST"
    );
    expect(updated).toEqual(true);
  });

  test("Assign Ticket to Staff", async () => {
    const assigned = await ticketManager.assignTicket(
      ticket.id,
      "TESTINGSTAFFJEST"
    );
    expect(assigned).toEqual(true);
  });

  test("Submits feedback rating for ticket", async () => {
    const feedbackRating = await ticketManager.updateTicket(
      ticket.id,
      "FeedbackRating",
      "TESTINGFEEDBACKRATINGJEST"
    );
    expect(feedbackRating).toEqual(true);
  });

  test("Submits feedback comments for ticket", async () => {
    const feedbackComments = await ticketManager.updateTicket(
      ticket.id,
      "FeedbackComments",
      "TESTINGFEEDBACKCOMMENTSJEST"
    );
    expect(feedbackComments).toEqual(true);
  });

  test("Sends no quotation required to database", async () => {
    const quotationRequired = await ticketManager.updateTicket(
      ticket.id,
      "QuotationRequired",
      false
    );
    expect(quotationRequired).toEqual(true);
  });

  test("View all active tickets for a particular tenant", async () => {
    const activeTickets = await ticketManager.getTicketsByPARCStatusForTenantID(
      "ACTIVE",
      ticket.tenantID
    );
    expect(activeTickets).not.toEqual(false);
  });

  test("View all pending tickets for a particular tenant", async () => {
    const pendingTickets =
      await ticketManager.getTicketsByPARCStatusForTenantID(
        "PENDING",
        ticket.tenantID
      );
    expect(pendingTickets).not.toEqual(false);
  });

  test("View all closed tickets for a particular tenant", async () => {
    const closedTickets = await ticketManager.getTicketsByPARCStatusForTenantID(
      "CLOSED",
      ticket.tenantID
    );
    expect(closedTickets).not.toEqual(false);
  });

  afterAll = async () => {
    // Delete the mock ticket object
    const { data, error } = await supabase
      .from("ServiceRequest")
      .delete()
      .match({ Name: "TESTINGTICKETJEST" });
  };
});
