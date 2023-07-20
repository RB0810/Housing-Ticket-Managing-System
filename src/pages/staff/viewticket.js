import { useState, useEffect } from "react";
import TicketManager from "../../managers/ticketmanager";
import AccountManager from "../../managers/accountmanager";
import BasicTicketDetails from "../../components/BasicTicketDetails";
import SubmittedByCard from "../../components/SubmittedByCard";
import ViewFinalFeedbackDetails from "../../components/ViewFinalFeedbackDetails";
import { useParams } from "react-router-dom";
import UploadQuotation from "../../components/UploadQuotation";
import DisplayQuotation from "../../components/DisplayQuotation";

const ViewTicketStaff = () => {
  const ticketManager = new TicketManager();
  const accountManager = new AccountManager();
  let { ServiceRequestID } = useParams();
  const [serviceTicket, setServiceTicket] = useState([]);
  const [tenant, setTenant] = useState([]);
  const [fetchError, setFetchError] = useState([]);

  const [status, setStatus] = useState("");
  const [feedbackComments, setFeedbackComments] = useState("");

  const [quotationRequired, setQuotationRequired] = useState("true");

  useEffect(() => {
    const getTenantAndTicket = async () => {
      let ticketData = await ticketManager.getTicket(
        parseInt(ServiceRequestID)
      );

      let tenantData = await accountManager.getSubmittedByTenantDetails(
        ticketData[0].TenantID
      );

      if (ticketData !== false) {
        setServiceTicket(ticketData[0]);
        setTenant(tenantData);
        setStatus(ticketData[0].Status);
        setFeedbackComments(ticketData[0].FeedbackComments);
        setFetchError(null);
      } else if (ticketData.length === 0) {
        setFetchError("This ticket is EMPTY!");
        setServiceTicket();
      } else {
        setFetchError("Error finding this ticket :(");
        setServiceTicket();
      }
    };

    getTenantAndTicket();
  }, []);

  const handleQuotationRequiredChange = (e) => {
    setQuotationRequired(e.target.value);
    console.log(quotationRequired);
  };

  const handleContinue = async () => {
    try {
      await ticketManager.updateTicket(
        serviceTicket.ServiceRequestID,
        "QuotationRequired",
        quotationRequired
      );

      if (quotationRequired === "true") {
        await ticketManager.updateTicket(
          serviceTicket.ServiceRequestID,
          "Status",
          "Quotation Uploaded"
        );
      } else {
        await ticketManager.updateTicket(
          serviceTicket.ServiceRequestID,
          "Status",
          "Works Started"
        );
      }
      await ticketManager.updateTicket(
        serviceTicket.ServiceRequestID,
        "PARCStatus",
        "ACTIVE"
      );
      window.alert("QUOTATION UPDATE SUCCESSFUL!");
      window.location.reload();
    } catch (error) {
      window.alert("ERROR IN CONTINUE FOR QUOTATION UPLOAD");
    }
  };

  const handleReuploadQuotation = async () => {
    try {
      await ticketManager.updateTicket(
        serviceTicket.ServiceRequestID,
        "Status",
        "Quotation Uploaded"
      );
      window.alert("QUOTATION UPDATE SUCCESSFUL!");
      window.location.reload();
    } catch (error) {
      window.alert("ERROR IN REUPLOAD FOR QUOTATION UPLOAD");
    }
  };

  const handleStartWorks = async () => {
    try {
      // Change status
      await ticketManager.updateTicket(
        serviceTicket.ServiceRequestID,
        "Status",
        "Works Started"
      );

      // Perform any additional actions or display a success message
      window.alert("Works Started!");
      window.location.reload();
    } catch (error) {
      // Handle errors appropriately
      window.alert("Update Failed!");
    }
  };

  const handleEndWorks = async () => {
    try {
      // Change status
      await ticketManager.updateTicket(
        serviceTicket.ServiceRequestID,
        "Status",
        "Works Ended"
      );

      // Perform any additional actions or display a success message
      window.alert("Update Successful!");
      window.location.reload();
    } catch (error) {
      // Handle errors appropriately
      window.alert("Update Failed!");
    }
  };

  const renderContent = () => {
    // Quotation Feedback
    if (quotationRequired === "true") {
      return (
        <div>
          <UploadQuotation
            bucketName="quotation"
            ServiceRequestID={serviceTicket.ServiceRequestID}
          />
        </div>
      );
    } else if (quotationRequired === "false") {
      return null;
    }
  };

  if (status === "Awaiting Review") {
    return (
      <div>
        <BasicTicketDetails ticket={serviceTicket} />
        _______________________________________
        <SubmittedByCard tenant={tenant} />
      </div>
    );
  }

  if (status === "Ticket Assigned") {
    return (
      <div>
        <BasicTicketDetails ticket={serviceTicket} />
        _______________________________________
        <SubmittedByCard tenant={tenant} />
        _______________________________________
        <div>
          <label>
            Quotation Required:
            <select
              value={quotationRequired}
              onChange={handleQuotationRequiredChange}
            >
              <option value={true}>YES</option>
              <option value={false}>NO</option>
            </select>
          </label>
          {renderContent()}
          <div>
            <button onClick={handleContinue}>Submit</button>
          </div>
        </div>
      </div>
    );
  }

  if (status === "Quotation Uploaded") {
    return (
      <div>
        <BasicTicketDetails ticket={serviceTicket} />
        _______________________________________
        <SubmittedByCard tenant={tenant} />
        _______________________________________
        <DisplayQuotation ServiceRequestID={serviceTicket.ServiceRequestID} />
        _______________________________________
      </div>
    );
  }

  if (status === "Quotation Accepted") {
    return (
      <div>
        <BasicTicketDetails ticket={serviceTicket} />
        _______________________________________
        <SubmittedByCard tenant={tenant} />
        _______________________________________
        <div>
          <button onClick={handleStartWorks}>Start Works</button>
        </div>
        _______________________________________
        <DisplayQuotation ServiceRequestID={serviceTicket.ServiceRequestID} />
        _______________________________________
      </div>
    );
  }

  if (status === "Quotation Rejected") {
    return (
      <div>
        <BasicTicketDetails ticket={serviceTicket} />
        _______________________________________
        <SubmittedByCard tenant={tenant} />
        ____________________________________
        <UploadQuotation
          bucketName="quotation"
          ServiceRequestID={serviceTicket.ServiceRequestID}
        />
        <div>
          <button onClick={handleReuploadQuotation}>Reupload Quotation</button>
        </div>
        _______________________________________
        <div>
          <h2>Rejection Details</h2>
          <p>Reason for rejection: {feedbackComments}</p>
        </div>
        <DisplayQuotation ServiceRequestID={serviceTicket.ServiceRequestID} />
        _______________________________________
      </div>
    );
  }

  if (status === "Works Started") {
    return (
      <div>
        <BasicTicketDetails ticket={serviceTicket} />
        _______________________________________
        <SubmittedByCard tenant={tenant} />
        _______________________________________
        <div>
          <button onClick={handleEndWorks}>End Works</button>
        </div>
        ____________________________________
        <DisplayQuotation ServiceRequestID={serviceTicket.ServiceRequestID} />
      </div>
    );
  }

  if (status === "Works Ended") {
    return (
      <div>
        <BasicTicketDetails ticket={serviceTicket} />
        _______________________________________
        <SubmittedByCard tenant={tenant} />
      </div>
    );
  }

  if (status === "Works Rejected") {
    return (
      <div>
        <BasicTicketDetails ticket={serviceTicket} />
        _______________________________________
        <SubmittedByCard tenant={tenant} />
        _______________________________________
        <div>
          <h2>Rejection Details</h2>
          <p>Reason for rejection: {feedbackComments}</p>

          <button onClick={handleStartWorks}>Restart Works</button>
        </div>
      </div>
    );
  }

  if (status === "Feedback Submitted") {
    return (
      <div>
        <BasicTicketDetails ticket={serviceTicket} />
        _______________________________________
        <SubmittedByCard tenant={tenant} />
        _______________________________________
        <ViewFinalFeedbackDetails
          rating={serviceTicket.FeedbackRating}
          comments={serviceTicket.FeedbackComments}
        />
      </div>
    );
  }
};

export default ViewTicketStaff;
