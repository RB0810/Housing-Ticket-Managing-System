import { useState, useEffect } from "react";
import TicketManager from "../managers/ticketmanager";
import AccountManager from "../managers/accountmanager";

export default function TicketAssigner({ ticket }) {
  const ticketManager = new TicketManager();
  const accountManager = new AccountManager();
  const [staffMembers, setStaffMembers] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState("");
  const [assignStatus, setAssignStatus] = useState("");

  useEffect(() => {
    // Fetch the staff members for the supervisor from your TicketManager
    const fetchStaffMembers = async () => {
      try {
        console.log(ticket.SupervisorID);
        const staff = await accountManager.getAllStaffForSupervisorID(
          ticket.SupervisorID
        );
        setStaffMembers(staff);
      } catch (error) {
        // Handle errors appropriately
      }
    };

    fetchStaffMembers();
  }, [ticket.SupervisorID]);

  const handleAssign = async () => {
    try {
      await ticketManager.assignTicket(ticket.ServiceRequestID, selectedStaff);
      await ticketManager.updateTicket(
        ticket.ServiceRequestID,
        "Status",
        "Ticket Assigned"
      );
      setAssignStatus("Assigning succeeded");

      // Perform any additional actions or display a success message
    } catch (error) {
      // Handle errors appropriately
      console.log(error);
      setAssignStatus("Assigning failed");
    }
  };

  return (
    <div>
      <label>
        Assign Staff:
        <select
          value={selectedStaff}
          onChange={(e) => setSelectedStaff(e.target.value)}
        >
          <option value="">-- Select Staff --</option>
          {staffMembers.map((staff) => (
            <option key={staff.StaffID} value={staff.StaffID}>
              {staff.StaffName}
            </option>
          ))}
        </select>
      </label>

      {assignStatus && <p>{assignStatus}</p>}

      <button onClick={handleAssign}>Assign</button>
    </div>
  );
}
