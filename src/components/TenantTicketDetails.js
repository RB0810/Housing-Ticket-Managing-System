import React from "react";
import FeedbackComponent from "./FeedbackComponent";
import AssignedToCard from "./AssignedToCard";
import BasicTicketDetails from "./BasicTicketDetails";

const TenantTicketDetails = ({ ticket, staff, portal, status }) => {
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
        <BasicTicketDetails ticket={ticket} />
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
};

export default TenantTicketDetails;
