import React from "react";
import SubmittedByCard from "./SubmittedByCard";
import BasicTicketDetails from "./BasicTicketDetails";
import QuotationSection from "./QuotationSectionCard";
import EndWorksButton from "./EndWorksButton";

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

  if (portal === "staff" && status === "Works Started") {
    return (
      <div>
        <BasicTicketDetails ticket={ticket} />
        ___________________________________________
        <SubmittedByCard tenant={tenant} />
        <h1>DISPLAY QUOTATION DOC HERE FOR DOWNLOAD</h1>
        <EndWorksButton ticket={ticket} />
      </div>
    );
  }
  if (portal === "staff" && status === "Works Ended") {
    return (
      <div>
        <BasicTicketDetails ticket={ticket} />
        ___________________________________________
        <SubmittedByCard tenant={tenant} />
        <h1>DISPLAY QUOTATION DOC HERE FOR DOWNLOAD</h1>
      </div>
    );
  }
};

export default StaffTicketDetails;
