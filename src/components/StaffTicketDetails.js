import React from "react";
import SubmittedByCard from "./SubmittedByCard";
import BasicTicketDetails from "./BasicTicketDetails";
import QuotationSection from "./QuotationSectionCard";
import EndWorksButton from "./EndWorksButton";
import ViewRejectDetails from "./ViewRejectDetails";
import ViewFinalFeedbackDetails from "./ViewFinalFeedbackDetails";

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

  if (portal === "staff" && status === "Works Rejected") {
    return (
      <div>
        <BasicTicketDetails ticket={ticket} />
        ___________________________________________
        <SubmittedByCard tenant={tenant} />
        ___________________________________________
        <h1>DISPLAY QUOTATION DOC HERE FOR DOWNLOAD</h1>
        ____________________________________________
        <ViewRejectDetails />
      </div>
    );
  }

  if (portal === "staff" && status === "Feedback Submitted") {
    return (
      <div>
        <BasicTicketDetails ticket={ticket} />
        ___________________________________________
        <SubmittedByCard tenant={tenant} />
        ___________________________________________
        <h1>DISPLAY QUOTATION DOC HERE FOR DOWNLOAD</h1>
        ____________________________________________
        <ViewFinalFeedbackDetails
          rating={ticket.FeedbackRating}
          comments={ticket.FeedbackComments}
        />
      </div>
    );
  }

  
};

export default StaffTicketDetails;
