import React from "react";

const BasicTicketDetails = (ticket) => {
  return (
    <div>
      <h2>Basic Ticket Details</h2>
      <p>PARC Status: {ticket.ticket.PARCStatus}</p>
      <p>Status: {ticket.ticket.Status}</p>
      <p>Name: {ticket.ticket.Name}</p>
      <p>Category: {ticket.ticket.Category}</p>
      <p>Description : {ticket.ticket.Description}</p>
      <p>
        Submitted:{" "}
        {new Date(ticket.ticket.SubmittedDateTime).toLocaleDateString()}
      </p>
    </div>
  );
};

export default BasicTicketDetails;
