import React from "react";
import SubmittedByCard from "./SubmittedByCard";
import BasicTicketDetails from "./BasicTicketDetails";
import QuotationSection from "./QuotationSectionCard";

const StaffTicketDetails = ({ ticket, tenant, portal, status }) => {
  // Ticket Details is Changed Based on Portal and Status

  if (portal === "staff" && status === "Ticket Assigned") {
    return (
      <div>
        <BasicTicketDetails ticket={ticket} />
        ___________________________________________
        <SubmittedByCard tenant={tenant} />
        ___________________________________________
        <QuotationSection ticket={ticket} />
      </div>
    );
  }
};

export default StaffTicketDetails;
