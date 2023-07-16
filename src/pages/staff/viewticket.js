import { useState, useEffect } from "react";
import TicketManager from "../../managers/ticketmanager";
import AccountManager from "../../managers/accountmanager";
import BasicTicketDetails from "../../components/BasicTicketDetails";
import SubmittedByCard from "../../components/SubmittedByCard";
import ViewFinalFeedbackDetails from "../../components/ViewFinalFeedbackDetails";
import QuotationUploader from "../../components/QuotationUploader";
import { useParams } from "react-router-dom";

const ViewTicketStaff = () => {
  const ticketManager = new TicketManager();
  const accountManager = new AccountManager();
  let { ServiceRequestID } = useParams();
  const [serviceTicket, setServiceTicket] = useState([]);
  const [tenant, setTenant] = useState([]);
  const [fetchError, setFetchError] = useState([]);
  const [status, setStatus] = useState("");
  const [feedbackComments, setFeedbackComments] = useState("");
  const [file, setFile] = useState(null);
  const [quotationRequired, setQuotationRequired] = useState("");

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
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleContinue = async () => {
    try {
      await ticketManager.updateTicket(
        serviceTicket.ServiceRequestID,
        "QuotationRequired",
        quotationRequired
      );

      if (quotationRequired === "YES") {
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
    } catch (error) {
      window.alert("ERROR IN CONTINUE FOR QUOTATION UPLOAD");
    }
  };

  const handleEndWorks = async () => {
    try {
      await ticketManager.updateTicket(
        serviceTicket.ServiceRequestID,
        "Status",
        "Works Ended"
      );

      // Perform any additional actions or display a success message
      window.alert("Update Successful!");
    } catch (error) {
      // Handle errors appropriately
      window.alert("Update Failed!");
    }
  };

  const handleRestartWorks = async () => {
    try {
      await ticketManager.updateTicket(
        ServiceRequestID,
        "Status",
        "Works Started"
      );

      // Perform any additional actions or display a success message
      window.alert("SUCCESS RESTART WORKS!");
    } catch (error) {
      // Handle errors appropriately
      window.alert("ERROR RESTARTING WORKS!");
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
              <option value="">-- Select Option --</option>
              <option value="YES">YES</option>
              <option value="NO">NO</option>
            </select>
          </label>

          {quotationRequired === "YES" && (
            <div>
              <QuotationUploader onFileChange={handleFileChange} />
            </div>
          )}

          <button onClick={handleContinue}>Continue</button>
        </div>
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

          <button onClick={handleRestartWorks}>Restart Works</button>
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
