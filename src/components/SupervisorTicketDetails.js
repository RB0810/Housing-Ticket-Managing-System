import React from "react";
import SubmittedByCard from "./SubmittedByCard";
import AssignedToCard from "./AssignedToCard";
import TicketAssigner from "./TicketAssigner";
import BasicTicketDetails from "./BasicTicketDetails";

const SupervisorTicketDetails = ({ ticket, tenant, staff, portal, status }) => {
  // Ticket Details is Changed Based on Portal and Status

  if (portal === "supervisor" && status === "Awaiting Review") {
    return (
      <div>
        <BasicTicketDetails ticket={ticket} />
        _______________________________________
        <SubmittedByCard tenant={tenant} />
        ____________________________________
        <TicketAssigner ticket={ticket} />
      </div>
    );
  }

  if (portal === "supervisor" && status === "Ticket Assigned") {
    return (
      <div>
        <BasicTicketDetails ticket={ticket} />
        _______________________________________
        <SubmittedByCard tenant={tenant} />
        ____________________________________
        <AssignedToCard staff={staff} />
      </div>
    );
  }
};

export default SupervisorTicketDetails;
