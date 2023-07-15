import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TicketManager from "../managers/ticketmanager";

export default function ViewRejectDetails() {
  const ticketManager = new TicketManager();
  const { StaffID, ServiceRequestID } = useParams();
  const [rejectionReason, setRejectionReason] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");

  useEffect(() => {
    const fetchRejectionReason = async () => {
      try {
        const reason = await ticketManager.getTicketByColumn(
          ServiceRequestID,
          "FeedbackComments"
        );
        setRejectionReason(reason);
      } catch (error) {
        // Handle errors appropriately
      }
    };

    fetchRejectionReason();
  }, [ServiceRequestID]);

  const handleRestartWorks = async () => {
    try {
      await ticketManager.updateTicket(
        ServiceRequestID,
        "Status",
        "Works Started"
      );

      // Perform any additional actions or display a success message
      setUpdateStatus("Update successful");
    } catch (error) {
      // Handle errors appropriately
      setUpdateStatus("Update failed");
    }
  };

  return (
    <div>
      <h2>Rejection Details</h2>
      <p>Reason for rejection: {rejectionReason}</p>

      <button onClick={handleRestartWorks}>Restart Works</button>

      {updateStatus && <p>{updateStatus}</p>}
    </div>
  );
}
