import React from "react";
import SubmittedByCard from "./SubmittedByCard";
import BasicTicketDetails from "./BasicTicketDetails";

const StaffTicketDetails = ({ ticket, tenant, portal, status }) => {
  // Ticket Details is Changed Based on Portal and Status

  if (portal === "staff" && status === "Ticket Assigned") {
    return (
      <div>
        <BasicTicketDetails ticket={ticket} />
        <SubmittedByCard tenant={tenant} />
      </div>
    );
  }
};

export default StaffTicketDetails;
