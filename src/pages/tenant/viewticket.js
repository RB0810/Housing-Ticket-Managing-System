import { useState, useEffect } from "react";
import TicketManager from "../../managers/ticketmanager";
import AccountManager from "../../managers/accountmanager";
import BasicTicketDetails from "../../components/BasicTicketDetails";
import AssignedToCard from "../../components/AssignedToCard";
import ViewFinalFeedbackDetails from "../../components/ViewFinalFeedbackDetails";
import { useParams } from "react-router-dom";
import DownloadQuotation from "../../components/DownloadQuotation";
import DisplayQuotation from "../../components/DisplayQuotation";
import { Rating } from "@mui/material";
import { Typography } from "@mui/material";

const ViewTicketTenant = () => {
  const ticketManager = new TicketManager();
  const accountManager = new AccountManager();
  let { ServiceRequestID } = useParams();
  const [serviceTicket, setServiceTicket] = useState([]);
  const [staff, setStaff] = useState([]);
  const [fetchError, setFetchError] = useState([]);

  const [quotationRequired, setQuotationRequired] = useState(false);
  const [quotationState, setQuotationState] = useState(null);
  const [showQuotationButtons, setShowQuotationButtons] = useState(true);

  const [status, setStatus] = useState("");
  const [feedbackType, setFeedbackType] = useState(null);
  const [showFeedbackButtons, setShowFeedbackButtons] = useState(true);
  const [rejectComments, setRejectComments] = useState("");

  const [successComments, setSuccessComments] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const getStaffAndTicket = async () => {
      let ticketData = await ticketManager.getTicket(
        parseInt(ServiceRequestID)
      );

      let staffData = await accountManager.getAssignedStaffDetails(
        ticketData[0].StaffID
      );

      if (ticketData !== false) {
        setServiceTicket(ticketData[0]);
        setStaff(staffData);
        setStatus(ticketData[0].Status);
        setQuotationRequired(ticketData[0].QuotationRequired);
        setFetchError(null);
      } else if (ticketData.length === 0) {
        setFetchError("This ticket is EMPTY!");
        setServiceTicket();
      } else {
        setFetchError("Error finding this ticket :(");
        setServiceTicket();
      }
    };

    getStaffAndTicket();
  }, []);

  const renderContent = () => {
    // Quotation Feedback
    if (quotationState === "reject") {
      return (
        <div>
          <form onSubmit={handleRejectQuotation}>
            <label>
              Reason for Reject :
              <textarea
                value={rejectComments}
                onChange={(e) => setRejectComments(e.target.value)}
              ></textarea>
            </label>

            <button type="submit">Submit Feedback</button>
          </form>
        </div>
      );
    }

    // Ticket Feedback
    if (feedbackType === "feedback") {
      return (
        <div>
          <form onSubmit={handleSuccessFeedback}>
            <label>
              <Typography component="legend">Rating</Typography>
              <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
              />
            </label>

            <label>
              Comments:
              <textarea
                value={successComments}
                onChange={(e) => setSuccessComments(e.target.value)}
              ></textarea>
            </label>

            <button type="submit">Submit Feedback</button>
          </form>
        </div>
      );
    } else if (feedbackType === "reject") {
      return (
        <div>
          <form onSubmit={handleRejectFeedback}>
            <label>
              Reason for Reject :
              <textarea
                value={rejectComments}
                onChange={(e) => setRejectComments(e.target.value)}
              ></textarea>
            </label>

            <button type="submit">Submit Feedback</button>
          </form>
        </div>
      );
    }
  };

  const handleAcceptQuotation = async () => {
    try {
      // Update in Database
      await ticketManager.updateTicket(
        parseInt(serviceTicket.ServiceRequestID),
        "QuotationAcceptedByTenant",
        true
      );

      // Change Status
      await ticketManager.updateTicket(
        parseInt(serviceTicket.ServiceRequestID),
        "Status",
        "Quotation Accepted"
      );

      window.alert("Quotation accepted!");
      window.location.reload();
    } catch (error) {
      window.alert("Error accepting quotation: " + error);
    }
  };

  const handleRejectQuotation = async () => {
    try {
      // Update in Database

      // Change QuotationAcceptedByTenant
      await ticketManager.updateTicket(
        parseInt(serviceTicket.ServiceRequestID),
        "QuotationAcceptedByTenant",
        false
      );

      // Add Reason for Rejecting Quotation (reuses FeedbackComments)
      await ticketManager.updateTicket(
        parseInt(serviceTicket.ServiceRequestID),
        "FeedbackComments",
        rejectComments
      );

      // Change Status
      await ticketManager.updateTicket(
        parseInt(serviceTicket.ServiceRequestID),
        "Status",
        "Quotation Rejected"
      );

      window.alert("Quotation rejected!");
      window.location.reload();
    } catch (error) {
      window.alert("Error rejecting quotation: " + error);
    }
  };

  const handleFeedbackClick = (type) => {
    setShowFeedbackButtons(false);
    setFeedbackType(type);
  };

  const handleQuotationAcceptRejectClick = (type) => {
    setShowQuotationButtons(false);
    setQuotationState(type);
  };

  const handleSuccessFeedback = async (e) => {
    e.preventDefault();

    try {
      // Update in Database
      await ticketManager.updateFeedbackRating(
        parseInt(serviceTicket.ServiceRequestID),
        rating
      );
      await ticketManager.updateFeedbackComments(
        parseInt(serviceTicket.ServiceRequestID),
        successComments
      );

      // Close ticket
      await ticketManager.updateTicket(
        ServiceRequestID,
        "PARCStatus",
        "CLOSED"
      );
      await ticketManager.updateTicket(
        ServiceRequestID,
        "Status",
        "Feedback Submitted"
      );

      window.alert("Feedback submitted!");
      window.location.reload();
    } catch (error) {
      window.alert("Error submitting feedback: " + error);
    }
  };

  const handleRejectFeedback = async (e) => {
    e.preventDefault();

    try {
      // Update in Database
      await ticketManager.updateFeedbackComments(
        parseInt(serviceTicket.ServiceRequestID),
        rejectComments
      );

      // Close ticket
      await ticketManager.rejectTicket(
        parseInt(serviceTicket.ServiceRequestID)
      );

      window.alert("Feedback submitted!");
    } catch (error) {
      window.alert("Error submitting feedback: " + error);
    }
  };

  if (status === "Awaiting Review") {
    return (
      <div>
        <BasicTicketDetails ticket={serviceTicket} />
      </div>
    );
  }

  if (status === "Ticket Assigned") {
    return (
      <div>
        <BasicTicketDetails ticket={serviceTicket} />

        <h1>ASSIGNED TO</h1>
        <AssignedToCard staff={staff} />
      </div>
    );
  }

  if (status === "Quotation Uploaded") {
    return (
      <div>
        <BasicTicketDetails ticket={serviceTicket} />
        <AssignedToCard staff={staff} />
        ____________________________________
        {showQuotationButtons && (
          <div>
            <button onClick={() => handleAcceptQuotation()}>
              Accept Quotation
            </button>
            <button onClick={() => handleQuotationAcceptRejectClick("reject")}>
              Reject Quotation
            </button>
          </div>
        )}
        {renderContent()}
        ____________________________________
        <DisplayQuotation ServiceRequestID={serviceTicket.ServiceRequestID} />
      </div>
    );
  }

  if (status === "Quotation Rejected") {
    return (
      <div>
        <BasicTicketDetails ticket={serviceTicket} />
        <AssignedToCard staff={staff} />
        <DisplayQuotation ServiceRequestID={serviceTicket.ServiceRequestID} />
      </div>
    );
  }

  if (status === "Quotation Accepted") {
    return (
      <div>
        <BasicTicketDetails ticket={serviceTicket} />
        <AssignedToCard ticket={serviceTicket} />
        <p>Quotation Needed: {serviceTicket.QuotationRequired}</p>
        <DownloadQuotation
          bucketName="quotation"
          ServiceRequestID={serviceTicket.ServiceRequestID}
        />
        <DisplayQuotation ServiceRequestID={serviceTicket.ServiceRequestID} />
      </div>
    );
  }

  if (status === "Quotation Rejected") {
    return (
      <div>
        <BasicTicketDetails ticket={serviceTicket} />
        <AssignedToCard staff={staff} />
        <p>Quotation Needed: {serviceTicket.QuotationRequired}</p>
        <div>
          <DownloadQuotation
            bucketName="quotation"
            ServiceRequestID={serviceTicket.ServiceRequestID}
          />
          <DisplayQuotation ServiceRequestID={serviceTicket.ServiceRequestID} />
        </div>
      </div>
    );
  }

  if (status === "Works Started") {
    return (
      <div>
        <BasicTicketDetails ticket={serviceTicket} />
        <AssignedToCard staff={staff} />
        {quotationRequired && (
          <div>
            <DownloadQuotation
              bucketName="quotation"
              ServiceRequestID={serviceTicket.ServiceRequestID}
            />
            <DisplayQuotation
              ServiceRequestID={serviceTicket.ServiceRequestID}
            />
          </div>
        )}
      </div>
    );
  }

  if (status === "Works Ended") {
    return (
      <div>
        <BasicTicketDetails ticket={serviceTicket} />
        _______________________________________
        <AssignedToCard staff={staff} />
        _______________________________________
        {showFeedbackButtons && (
          <div>
            <button onClick={() => handleFeedbackClick("feedback")}>
              Give Feedback
            </button>
            <button onClick={() => handleFeedbackClick("reject")}>
              Not Satisfied
            </button>
          </div>
        )}
        {renderContent()}
        _______________________________________
        ____________________________________
        {quotationRequired && (
          <div>
            <DownloadQuotation
              bucketName="quotation"
              ServiceRequestID={serviceTicket.ServiceRequestID}
            />
            <DisplayQuotation
              ServiceRequestID={serviceTicket.ServiceRequestID}
            />
          </div>
        )}
        _______________________________________
      </div>
    );
  }

  if (status === "Works Rejected") {
    return (
      <div>
        <BasicTicketDetails ticket={serviceTicket} />
        <h1>Reason for Reject : {serviceTicket.FeedbackComments}</h1>
        <AssignedToCard staff={staff} />
        _______________________________________
        {quotationRequired && (
          <div>
            <DownloadQuotation
              bucketName="quotation"
              ServiceRequestID={serviceTicket.ServiceRequestID}
            />
            <DisplayQuotation
              ServiceRequestID={serviceTicket.ServiceRequestID}
            />
          </div>
        )}
      </div>
    );
  }

  if (status === "Feedback Submitted") {
    return (
      <div>
        <BasicTicketDetails ticket={serviceTicket} />
        _______________________________________
        <AssignedToCard staff={staff} />
        ____________________________________
        <ViewFinalFeedbackDetails
          rating={serviceTicket.FeedbackRating}
          comments={serviceTicket.FeedbackComments}
        />
        _______________________________________
        {quotationRequired && (
          <div>
            <DownloadQuotation
              bucketName="quotation"
              ServiceRequestID={serviceTicket.ServiceRequestID}
            />
            <DisplayQuotation
              ServiceRequestID={serviceTicket.ServiceRequestID}
            />
          </div>
        )}
        _______________________________________
      </div>
    );
  }
};

export default ViewTicketTenant;
