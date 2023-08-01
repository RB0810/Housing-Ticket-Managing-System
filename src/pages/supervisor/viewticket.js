import { useState, useEffect } from "react";
import TicketManager from "../../managers/ticketmanager";
import AccountManager from "../../managers/accountmanager";
import { useParams, useNavigate } from "react-router-dom";
import BasicTicketDetails from "../../components/BasicTicketDetails";
import SubmittedByCard from "../../components/SubmittedByCard";
import AssignedToCard from "../../components/AssignedToCard";
import ViewFinalFeedbackDetails from "../../components/ViewFinalFeedbackDetails";
import NotificationManager from "../../managers/notificationmanager";
import UploadQuotation from "../../components/UploadQuotation";
import DisplayQuotation from "../../components/DisplayQuotation";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

import "./../../styles/viewticket.css";
import { Grid, Button, Select, MenuItem, OutlinedInput, TextField} from "@mui/material";

const ViewTicketSupervisor = () => {
  const accountManager = new AccountManager();
  const ticketManager = new TicketManager();
  //const notificationmanager = new NotificationManager();
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

  // For Quotation
  const [quotationPath, setQuotationPath] = useState(null);
  const [file, setFile] = useState(null);
  
  // For Reject Ticket
  const [rejectState, setRejectState] = useState("");
  const [rejectComments, setRejectComments] = useState("");
  const [showOptions, setShowOptions] = useState(true);

  const {SupervisorID} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const userId = Cookies.get('userId');
    const type = Cookies.get('type');

    if (!userId || !type) {
      // If any of the required cookies are missing, redirect to the login page
      console.log('Unauthorized');
      navigate("/unauthorize");
    } else {
      // Check if the user's ID and type match the expected values (e.g., SupervisorID and "Supervisor")
      if (Number(userId) === parseInt(SupervisorID) && type === "Supervisor") {
        // Proceed with rendering the component
        console.log('Authorized');
      } else {
        // If not authorized, display "Unauthorized access" message
        console.log('Unauthorized');
        navigate("/unauthorize");
      }
    }
  }, [navigate, SupervisorID]);

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

      console.log(ServiceRequestID);

      //const sendNotif = notificationmanager.TicketAssignNotif(ServiceRequestID, selectedStaff);

      // Execute all promises concurrently using Promise.all
      await Promise.all([
        assignTicketPromise,
        updateStatusPromise,
        //sendNotif
      ]);

      Swal.fire({
        icon: "success",
        title: "Ticket Assigned"
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
      // Perform any additional actions or display a success message
    } catch (error) {
      // Handle errors appropriately
      console.log(error);
      setAssignStatus("Assigning failed");
    }
  };

  const handleReject = async () => {
    try {
      // Get promises for each update
      const rejectTicketPromise = ticketManager.updateTicket(
        ServiceRequestID,
        "PARCStatus",
        "CLOSED"
      );

      const updateStatusPromise = ticketManager.updateTicket(
        ServiceRequestID,
        "Status",
        "Ticket Rejected"
      );

      const rejectTicketCommentsPromise = ticketManager.updateTicket(
        ServiceRequestID,
        "FeedbackComments",
        rejectComments
      );

      // Execute all promises concurrently using Promise.all
      await Promise.all([
        rejectTicketPromise,
        updateStatusPromise,
        rejectTicketCommentsPromise,
        //sendNotif
      ]);
      Swal.fire({
        icon: "success",
        title: "Ticket rejected"
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
      // Perform any additional actions or display a success message
    } catch (error) {
      // Handle errors appropriately
      console.log(error);
      setAssignStatus("Assigning failed");
    }
  };

  const renderContent = () => {
    // Quotation Feedback
    if (rejectState === "reject") {
      return (
        <div>
          <form onSubmit={handleReject}>
              <TextField
              className="view-ticket-textfield"
              id="outlined-basic"
              multiline='true'
              label ="Reason for Reject"
              variant="filled"
              value={rejectComments}
              onChange={(e) => setRejectComments(e.target.value)}/>
            <Button
            variant="contained"
            onClick={handleReject}>
              Submit
            </Button>
            <Button
            variant="contained"
            onClick={handleCancel}>
              Cancel
            </Button>
          </form>
        </div>
      );
    }
  };

  const handleRejectClick = () => {
    setShowOptions(false);
    setRejectState("reject");
  };

  const handleCancel = () => {
    setShowOptions(true);
    setRejectState("");
  };

  if (status === "Awaiting Review") {
    return (
      <div >
      <Grid container spacing={1} columns={10}>
        <Grid item xs ={4}>
          <Grid item xs={12}>
            <BasicTicketDetails ticket={serviceTicket} />
          </Grid>
          <Grid item xs={12}>
            <SubmittedByCard tenant={tenant} />
          </Grid>
          <Grid item xs={12}>
            <div>
              {showOptions && (
                <div>
                  <Grid item xs={12}>
                    <h2 className="assignstaff-header">Assign Staff:</h2>
                  </Grid>
                  <Grid item xs={12}>
                    <Select
                    id="buildingID"
                    className="assignstaff-textfield"
                    value={selectedStaff}
                    variant='outlined'
                    onChange={(e) => setSelectedStaff(e.target.value)}
                    input={<OutlinedInput value='--Select Staff--'/>}>
                      {staffMembers.map((staff) => (
                        <MenuItem
                        key={staff.StaffID}
                        value={staff.StaffID}>
                        {staff.StaffName}
                        </MenuItem>
                      ))}
                    </Select>
                    {assignStatus && <p>{assignStatus}</p>}
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                    variant="contained"
                    onClick={handleAssign}>
                      Assign
                    </Button>
                    <Button
                    variant="contained"
                    onClick={handleRejectClick}>
                      Reject
                    </Button>
                  </Grid>
                </div>
              )}
              <div>{renderContent()}</div>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
    );
  }

  if (status === "Ticket Rejected") {
    return (
      <div >
        <Grid container spacing={1} columns={10}>
          <Grid item xs ={4}>
            <Grid item xs={12}>
              <BasicTicketDetails ticket={serviceTicket} />
            </Grid>
            <Grid item xs={12}>
              <SubmittedByCard tenant={tenant} />
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }

  if (status === "Ticket Assigned") {
    return (
      <div >
        <Grid container spacing={1} columns={10}>
          <Grid item xs={4}>
            <Grid item xs={12}>
              <BasicTicketDetails ticket={serviceTicket} />
            </Grid>
            <Grid item xs={12}>
              <SubmittedByCard tenant={tenant} />
            </Grid>
            <Grid item xs={12}>
              <AssignedToCard staff={staff} />
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }

  if (status === "Quotation Uploaded" || status === "Quotation Accepted" || status === "Quotation Rejected") {
    return (
      <div>
        <Grid container spacing={1} columns={10}>
          <Grid item xs ={4}>
            <Grid item xs={12}>
              <BasicTicketDetails ticket={serviceTicket} />
            </Grid>
            <Grid item xs={12}>
              <SubmittedByCard tenant={tenant} /> 
            </Grid>
            <Grid item xs={12}>
              <AssignedToCard staff={staff} />
            </Grid>
          </Grid>
          <Grid item xs ={6}>
            <DisplayQuotation ServiceRequestID={serviceTicket.ServiceRequestID} />
          </Grid>
        </Grid>
      </div>
    );
  }

  if (status === "Works Started" || status === "Works Ended" || status === "Works Rejected") {
    return (
      <div>
        <Grid container spacing={1} columns={10}>
          <Grid item xs ={4}>
            <Grid item xs={12}>
              <BasicTicketDetails ticket={serviceTicket} />
            </Grid>
            <Grid item xs={12}>
              <SubmittedByCard tenant={tenant} /> 
            </Grid>
            <Grid item xs={12}>
              <AssignedToCard staff={staff} />
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }

  if (status === "Feedback Submitted") {
    return (
      <div>
        <Grid container spacing={1} columns={10}>
          <Grid item xs ={4}>
            <Grid item xs={12}>
              <BasicTicketDetails ticket={serviceTicket} />
            </Grid>
            <Grid item xs={12}>
              <SubmittedByCard tenant={tenant} /> 
            </Grid>
            <Grid item xs={12}>
              <AssignedToCard staff={staff} />
            </Grid>
            <Grid item xs={12}>
            <ViewFinalFeedbackDetails
              rating={serviceTicket.FeedbackRating}
              comments={serviceTicket.FeedbackComments}
            />
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
};

export default ViewTicketSupervisor;
