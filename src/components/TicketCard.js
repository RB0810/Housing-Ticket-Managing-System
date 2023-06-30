import React from 'react';
const TicketCard = ({ ticket }) => {
  return (
    <div className="ticket-card">
      <p>{ticket.Name}</p>
      <p>{ticket.LandlordID}</p>
      <p>{ticket.TenantID}</p>
      <p>{ticket.Contact}</p>
      <p>{ticket.SubmittedDateTime}</p>
      <p>{ticket.RequestType}</p>
      <p>{ticket.RequestDescription}</p>
      <p>{ticket.Status}</p>
    </div>
  );
};

export default TicketCard;
