import { useState } from "react";
import TicketManager from "../managers/ticketmanager"; // Import your TicketManager function

export default function EndWorksButton({ ticket }) {
  let ticketManager = new TicketManager(); // Create an instance of your TicketManager function
  const [updateStatus, setUpdateStatus] = useState("");

  const handleEndWorks = async () => {
    try {
      await ticketManager.updateTicket(
        ticket.ServiceRequestID,
        "Status",
        "Works Ended"
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
      <button onClick={handleEndWorks}>End Works</button>

      {updateStatus && <p>{updateStatus}</p>}
    </div>
  );
}
