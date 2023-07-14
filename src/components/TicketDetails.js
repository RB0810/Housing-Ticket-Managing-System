<<<<<<< HEAD
import { useParams } from "react-router-dom";

const TicketDetails = ({ ticket }) => {
  const { ServiceRequestID } = useParams();
  return (
    <div>
      <h2>Ticket Details</h2>
      <p>Name: {ticket.Name}</p>
      <p>Landlord ID: {ticket.LandlordID}</p>
      <p>Tenant ID: {ticket.TenantID}</p>
      <p>Contact: {ticket.Contact}</p>
      <p>Submitted Date Time: {ticket.SubmittedDateTime}</p>
      <p>Request Type: {ticket.RequestType}</p>
      <p>Request Description: {ticket.RequestDescription}</p>
      <p>PARC Status: {ticket.PARCStatus}</p>
      <p>Status: {ticket.Status}</p>
    </div>
  );
};

export default TicketDetails;
=======
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
>>>>>>> a68d74b2e817c7184e70c9d65d952e983e357804
