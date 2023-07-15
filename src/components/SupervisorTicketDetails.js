import React from "react";
import SubmittedByCard from "./SubmittedByCard";
import AssignedToCard from "./AssignedToCard";
import TicketAssigner from "./TicketAssigner";
import BasicTicketDetails from "./BasicTicketDetails";
import ViewRejectDetails from "./ViewRejectDetails";
import ViewFinalFeedbackDetails from "./ViewFinalFeedbackDetails";

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

  if (portal === "supervisor" && status === "Works Started") {
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

  if (portal === "supervisor" && status === "Works Ended") {
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

  if (portal === "supervisor" && status === "Works Rejected") {
    return (
      <div>
        <BasicTicketDetails ticket={ticket} />
        _______________________________________
        <SubmittedByCard tenant={tenant} />
        ____________________________________
        <AssignedToCard staff={staff} />
        _______________________________________
      </div>
    );
  }

  if (portal === "supervisor" && status === "Works Rejected") {
    return (
      <div>
        <BasicTicketDetails ticket={ticket} />
        _______________________________________
        <SubmittedByCard tenant={tenant} />
        ____________________________________
        <AssignedToCard staff={staff} />
        _______________________________________
        <ViewRejectDetails ticket={ticket} />
      </div>
    );
  }

  if (portal === "supervisor" && status === "Feedback Submitted") {
    return (
      <div>
        <BasicTicketDetails ticket={ticket} />
        _______________________________________
        <SubmittedByCard tenant={tenant} />
        ____________________________________
        <AssignedToCard staff={staff} />
        _______________________________________
        <ViewFinalFeedbackDetails ticket={ticket} />
      </div>
    );
  }
};

export default SupervisorTicketDetails;
