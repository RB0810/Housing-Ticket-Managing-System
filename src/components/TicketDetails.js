import React from "react";
import FeedbackComponent from "./FeedbackComponent";
import AssignedToCard from "./AssignedToCard";
import BasicTicketDetails from "./BasicTicketDetails";

const TicketDetails = ({ ticket, staff, portal, status }) => {
  // Ticket Details is Changed Based on Portal and Status

  if (portal === "tenant" && status === "Awaiting Review") {
    return (
      <div>
        <BasicTicketDetails ticket={ticket} />
      </div>
    );
  }

  if (portal === "tenant" && status === "Ticket Assigned") {
    return (
      <div>
        <BasicTicketDetails ticket={ticket} />

        <h1>ASSIGNED TO</h1>
        <AssignedToCard staff={staff} />
      </div>
    );
  }

  if (portal === "tenant" && status === "Quotation Upload") {
    return (
      <div>
        <BasicTicketDetails ticket={ticket} />
        <AssignedToCard staff={staff} />
        Quotation Component here
      </div>
    );
  }

  if (portal === "tenant" && status === "Quotation Accepted") {
    return (
      <div>
        <h1>THIS IS THE TENANT PORTAL</h1>
        <h2>Ticket Details</h2>
        <p>PARC Status: {ticket.PARCStatus}</p>
        <p>Status: {ticket.Status}</p>
        <p>Name: {ticket.Name}</p>
        <p>Category: {ticket.Category}</p>
        <p>Description : {ticket.Description}</p>
        <p>
          Submitted: {new Date(ticket.SubmittedDateTime).toLocaleDateString()}
        </p>
        <p>Request Type: {ticket.Category}</p>
        <AssignedToCard ticket={ticket} />
        <p>Quotation Needed: {ticket.QuotationRequired}</p>
        UPLOADED QUOTATION HERE
      </div>
    );
  }

  if (portal === "tenant" && status === "Works Started") {
    return (
      <div>
        <BasicTicketDetails ticket={ticket} />
        <AssignedToCard staff={staff} />
        <p>Quotation Needed: {ticket.QuotationRequired}</p>
        QUOTATION OBJECT HERE
      </div>
    );
  }

  if (portal === "tenant" && status === "Works Ended") {
    return (
      <div>
        <BasicTicketDetails ticket={ticket} />
        <AssignedToCard staff={staff} />
        <p>Quotation Needed: {ticket.QuotationRequired}</p>
        UPLOADED QUOTATION HERE
        <FeedbackComponent ticket={ticket} />
      </div>
    );
  }

  if (portal === "tenant" && status === "Works Rejected") {
    return (
      <div>
        <BasicTicketDetails ticket={ticket} />

        <h1>Reason for Reject : {ticket.FeedbackComments}</h1>
        <AssignedToCard staff={staff} />
      </div>
    );
  }

  if (portal === "tenant" && status === "Feedback Submitted") {
    return (
      <div>
        <h1>THIS IS THE TENANT PORTAL</h1>
        <h2>Ticket Details</h2>
        <p>PARC Status: {ticket.PARCStatus}</p>
        <p>Status: {ticket.Status}</p>
        <p>Name: {ticket.Name}</p>
        <p>Category: {ticket.Category}</p>
        <p>Description : {ticket.Description}</p>
        <p>
          Submitted: {new Date(ticket.SubmittedDateTime).toLocaleDateString()}
        </p>
        <p>Request Type: {ticket.Category}</p>
        <AssignedToCard ticket={ticket} />
        <p>Quotation Needed: {ticket.QuotationRequired}</p>
        UPLOADED QUOTATION HERE
      </div>
    );
  }

  if (portal === "staff") {
    return (
      <div>
        <h1>THIS IS THE STAFF PORTAL</h1>
        <h2>Ticket Details</h2>
        <p>PARC Status: {ticket.PARCStatus}</p>
        <p>Name: {ticket.Name}</p>
        <p>SubmittedBy: Tenant ID - {ticket.TenantID}</p>
        <p>
          Submitted: {new Date(ticket.SubmittedDateTime).toLocaleDateString()}
        </p>
        <p>Request Type: {ticket.Category}</p>
        <p>Request Description: {ticket.Description}</p>
        <p>PARC Status: {ticket.PARCStatus}</p>
      </div>
    );
  }

  if (portal === "supervisor") {
    return (
      <div>
        <h1>THIS IS THE SUPERVISOR PORTAL</h1>
        <h2>Ticket Details</h2>
        <p>PARC Status: {ticket.PARCStatus}</p>
        <p>Name: {ticket.Name}</p>
        <p>SubmittedBy: Tenant ID - {ticket.TenantID}</p>
        <p>
          Submitted: {new Date(ticket.SubmittedDateTime).toLocaleDateString()}
        </p>
        <p>Request Type: {ticket.Category}</p>
        <p>Request Description: {ticket.Description}</p>
        <p>PARC Status: {ticket.PARCStatus}</p>
      </div>
    );
  }
};

export default TicketDetails;
