import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import TicketManager from "../managers/ticketmanager";

const RejectCard = (ticket) => {
  let ticketManager = new TicketManager();
  let navigate = useNavigate();
  const { TenantID, ServiceRequestID } = useParams();
  const [comments, setComments] = useState("");

  const handleRejectFeedback = async (e) => {
    e.preventDefault();

    try {
      // Update in Database
      await ticketManager.updateFeedbackComments(
        parseInt(ticket.ticket.ServiceRequestID),
        comments
      );

      // Close ticket
      await ticketManager.rejectTicket(parseInt(ServiceRequestID));

      console.log("Feedback submitted!");
      navigate(`/tenantportal/tickets/${TenantID}/pending`);
    } catch (error) {
      window.alert("Error submitting feedback: " + error);
    }
  };

  return (
    <div>
      <form onSubmit={handleRejectFeedback}>
        <label>
          Reason for Reject :
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          ></textarea>
        </label>

        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
};

export default RejectCard;
