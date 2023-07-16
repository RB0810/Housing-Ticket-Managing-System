import { useState, useEffect } from "react";
import TicketManager from "../../managers/ticketmanager";
import AccountManager from "../../managers/accountmanager";
import BasicTicketDetails from "../../components/BasicTicketDetails";
import AssignedToCard from "../../components/AssignedToCard";
import FeedbackCard from "../../components/FeedbackCard";
import ViewFinalFeedbackDetails from "../../components/ViewFinalFeedbackDetails";
import { useParams } from "react-router-dom";

const ViewTicketTenant = () => {
  const ticketManager = new TicketManager();
  const accountManager = new AccountManager();
  let { ServiceRequestID } = useParams();
  const [serviceTicket, setServiceTicket] = useState([]);
  const [staff, setStaff] = useState([]);
  const [fetchError, setFetchError] = useState([]);
  const [status, setStatus] = useState("");
  const [feedbackType, setFeedbackType] = useState(null);
  const [showFeedbackButtons, setShowFeedbackButtons] = useState(true);
  const [rejectComments, setRejectComments] = useState("");

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
    if (feedbackType === "feedback") {
      return (
        <div>
          <FeedbackCard ticket={serviceTicket} />
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

  const handleFeedbackClick = (type) => {
    setShowFeedbackButtons(false);
    setFeedbackType(type);
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

  if (status === "Quotation Upload") {
    return (
      <div>
        <BasicTicketDetails ticket={serviceTicket} />
        <AssignedToCard staff={staff} />
        Quotation Component here
      </div>
    );
  }

  if (status === "Quotation Accepted") {
    return (
      <div>
        <BasicTicketDetails ticket={serviceTicket} />
        <AssignedToCard ticket={serviceTicket} />
        <p>Quotation Needed: {serviceTicket.QuotationRequired}</p>
        UPLOADED QUOTATION HERE
      </div>
    );
  }

  if (status === "Works Started") {
    return (
      <div>
        <BasicTicketDetails ticket={serviceTicket} />
        <AssignedToCard staff={staff} />
        <p>Quotation Needed: {serviceTicket.QuotationRequired}</p>
        QUOTATION OBJECT HERE
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
      </div>
    );
  }

  if (status === "Works Rejected") {
    return (
      <div>
        <BasicTicketDetails ticket={serviceTicket} />

        <h1>Reason for Reject : {serviceTicket.FeedbackComments}</h1>
        <AssignedToCard staff={staff} />
      </div>
    );
  }

  if (status === "Feedback Submitted") {
    return (
      <div>
        <BasicTicketDetails ticket={serviceTicket} />
        _______________________________________
        <AssignedToCard staff={staff} />
        _______________________________________
        <ViewFinalFeedbackDetails
          rating={serviceTicket.FeedbackRating}
          comments={serviceTicket.FeedbackComments}
        />
      </div>
    );
  }
};

export default ViewTicketTenant;
