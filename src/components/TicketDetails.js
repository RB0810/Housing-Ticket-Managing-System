import React from "react";
import FeedbackComponent from "./FeedbackComponent";

const TicketDetails = ({ ticket }) => {
  return (
    <div>
      <h2>Ticket Details</h2>
      <p>Name: {ticket.Name}</p>
      <p>SubmittedBy: Tenant ID - {ticket.TenantID}</p>
      <p>
        Submitted: {new Date(ticket.SubmittedDateTime).toLocaleDateString()}
      </p>
      <p>Request Type: {ticket.Category}</p>
      <p>Request Description: {ticket.Description}</p>
      <p>PARC Status: {ticket.PARCStatus}</p>
      <p>Status: {ticket.Status}</p>

      
    </div>
  );
};

export default TicketDetails;
