import { useState, useEffect } from "react";
import TicketManager from "../../managers/ticketmanager";
import AccountManager from "../../managers/accountmanager";
import { useParams } from "react-router-dom";
import BasicTicketDetails from "../../components/BasicTicketDetails";
import SubmittedByCard from "../../components/SubmittedByCard";
import AssignedToCard from "../../components/AssignedToCard";
import ViewFinalFeedbackDetails from "../../components/ViewFinalFeedbackDetails";
import UploadQuotation from "../../components/UploadQuotation";
import DisplayQuotation from "../../components/DisplayQuotation";

const ViewTicketSupervisor = () => {
  const accountManager = new AccountManager();
  const ticketManager = new TicketManager();
  let { ServiceRequestID } = useParams();
  const [serviceTicket, setServiceTicket] = useState([]);
  const [tenant, setTenant] = useState([]);
  const [staff, setStaff] = useState([]);
  const [status, setStatus] = useState("");
  const [fetchError, setFetchError] = useState([]);

  // For Ticket Assignment
  const [staffMembers, setStaffMembers] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState("");
  const [assignStatus, setAssignStatus] = useState("");

  useEffect(() => {
    const getStaffAndTenantAndTicket = async () => {
      let ticketData = await ticketManager.getTicket(
        parseInt(ServiceRequestID)
      );

      let tenantData = await accountManager.getSubmittedByTenantDetails(
        ticketData[0].TenantID
      );

      let staffData = await accountManager.getAssignedStaffDetails(
        ticketData[0].StaffID
      );

      let staffMembers = await accountManager.getAllStaffForSupervisorID(
        ticketData[0].SupervisorID
      );

      if (ticketData !== false) {
        setServiceTicket(ticketData[0]);
        setTenant(tenantData);
        setStaff(staffData);
        setStaffMembers(staffMembers);
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

    getStaffAndTenantAndTicket();
  }, []);

  const handleAssign = async () => {
    try {
      // Get promises for each update
      const assignTicketPromise = ticketManager.assignTicket(
        ServiceRequestID,
        selectedStaff
      );

      const updateStatusPromise = ticketManager.updateTicket(
        ServiceRequestID,
        "Status",
        "Ticket Assigned"
      );

      // Execute all promises concurrently using Promise.all
      await Promise.all([assignTicketPromise, updateStatusPromise]);

      window.alert("Ticket Assigned");
      window.location.reload();
      // Perform any additional actions or display a success message
    } catch (error) {
      // Handle errors appropriately
      console.log(error);
      setAssignStatus("Assigning failed");
    }
  };

  if (status === "Awaiting Review") {
    return (
      <div>
        <BasicTicketDetails ticket={serviceTicket} />
        _______________________________________
        <SubmittedByCard tenant={tenant} />
        ____________________________________
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
      </div>
    );
  }

  if (status === "Ticket Assigned") {
    return (
      <div>
        <BasicTicketDetails ticket={serviceTicket} />
        _______________________________________
        <SubmittedByCard tenant={tenant} />
        ____________________________________
        <AssignedToCard staff={staff} />
      </div>
    );
  }

  if (status === "Quotation Uploaded") {
    return (
      <div>
        <BasicTicketDetails ticket={serviceTicket} />
        _______________________________________
        <SubmittedByCard tenant={tenant} />
        ____________________________________
        <AssignedToCard staff={staff} />
        _______________________________________
        <DisplayQuotation ServiceRequestID={serviceTicket.ServiceRequestID} />
      </div>
    );
  }

  if (status === "Quotation Accepted") {
    return (
      <div>
        <BasicTicketDetails ticket={serviceTicket} />
        _______________________________________
        <SubmittedByCard tenant={tenant} />
        ____________________________________
        <AssignedToCard staff={staff} />
        _______________________________________
        <DisplayQuotation ServiceRequestID={serviceTicket.ServiceRequestID} />
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
        <AssignedToCard staff={staff} />
        _______________________________________
        <DisplayQuotation ServiceRequestID={serviceTicket.ServiceRequestID} />
      </div>
    );
  }

  if (status === "Works Started") {
    return (
      <div>
        <BasicTicketDetails ticket={serviceTicket} />
        _______________________________________
        <SubmittedByCard tenant={tenant} />
        ____________________________________
        <AssignedToCard staff={staff} />
      </div>
    );
  }

  if (status === "Works Ended") {
    return (
      <div>
        <BasicTicketDetails ticket={serviceTicket} />
        _______________________________________
        <SubmittedByCard tenant={tenant} />
        ____________________________________
        <AssignedToCard staff={staff} />
      </div>
    );
  }

  if (status === "Works Rejected") {
    return (
      <div>
        <BasicTicketDetails ticket={serviceTicket} />
        _______________________________________
        <SubmittedByCard tenant={tenant} />
        ____________________________________
        <AssignedToCard staff={staff} />
        _______________________________________
      </div>
    );
  }

  if (status === "Works Rejected") {
    return (
      <div>
        <BasicTicketDetails ticket={serviceTicket} />
        _______________________________________
        <SubmittedByCard tenant={tenant} />
        ____________________________________
        <AssignedToCard staff={staff} />
      </div>
    );
  }

  if (status === "Feedback Submitted") {
    return (
      <div>
        <BasicTicketDetails ticket={serviceTicket} />
        _______________________________________
        <SubmittedByCard tenant={tenant} />
        ____________________________________
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

export default ViewTicketSupervisor;
