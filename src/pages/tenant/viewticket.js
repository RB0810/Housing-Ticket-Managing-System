import { useState, useEffect } from "react";
import TicketManager from "../../managers/ticketmanager";
import AccountManager from "../../managers/accountmanager";
import BasicTicketDetails from "../../components/BasicTicketDetails";
import AssignedToCard from "../../components/AssignedToCard";
import ViewFinalFeedbackDetails from "../../components/ViewFinalFeedbackDetails";
import { useParams, useNavigate } from "react-router-dom";
// import DownloadQuotation from "../../components/DownloadQuotation";
import { Rating, TextField, Grid, Button } from "@mui/material";
import supabase from "../../config/supabaseClient";
import { Typography } from "@mui/material";
import DisplayQuotation from "../../components/DisplayQuotation";
import NotificationManager from "../../managers/notificationmanager";

// Import styles
import "./../../styles/viewticket.css";

const ViewTicketTenant = () => {
  const ticketManager = new TicketManager();
  const accountManager = new AccountManager();
  //const notificationmanager = new NotificationManager();
  let { ServiceRequestID } = useParams();
  let navigate = useNavigate();
  const [serviceTicket, setServiceTicket] = useState([]);
  const [staff, setStaff] = useState([]);
  const [fetchError, setFetchError] = useState([]);

  const [quotationRequired, setQuotationRequired] = useState(false);
  const [quotationState, setQuotationState] = useState(null);
  const [showQuotationButtons, setShowQuotationButtons] = useState(true);

  // Quotation Items
  const [quotationPath, setQuotationPath] = useState(null);
  const [file, setFile] = useState(null);

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
        setQuotationPath(ticketData[0].QuotationAttachmentPath);
        if (quotationPath !== null) {
          if (quotationPath.endsWith(".pdf")) {
            const { data: fileData, error: fileError } = await supabase.storage
              .from("quotation")
              .download(quotationPath);

            if (fileError || !fileData) {
              console.error("Error downloading file:", fileError);
            } else {
              const url = URL.createObjectURL(fileData);
              setFile(url);
            }
          }
        }
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

  const handleDeleteTicket = async () => {
    try {
      const deleteTicketPromise = ticketManager.deleteTicket(
        parseInt(serviceTicket.ServiceRequestID)
      );

      // Execute all promises concurrently using Promise.all
      await Promise.all([deleteTicketPromise]);
      window.alert("Quotation deleted!");
      navigate(`/tenantportal/landingpage/${serviceTicket.TenantID}`);
      // Probably need to redirect to main page here
    } catch (error) {
      window.alert("Error deleting quotation: " + error);
    }
  };

  const handleFileDownload = async () => {
    try {
      const { data, error } = await supabase.storage
        .from("quotation")
        .download(quotationPath);
      const blob = new Blob([data], { type: "application/octet-stream" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      const fileName = quotationPath.split("/").pop();
      link.download = fileName;
      link.click();
      URL.revokeObjectURL(url);

      if (error) {
        window.alert("Error downloading file!");
        return;
      }
    } catch (error) {
      window.alert("Error downloading file!");
    }
  };

  const handleCancel = () => {
    setShowFeedbackButtons(true);
    setFeedbackType(null);
    setShowQuotationButtons(true);
    setQuotationState(null);
  };

  const renderContent = () => {
    // Quotation Feedback
    if (quotationState === "reject") {
      return (
        <div class="comments-section">
          <form onSubmit={handleRejectQuotation}>

            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                className="view-ticket-textfield"
                id="outlined-basic"
                multiline='true'
                label='Reason for Reject'
                variant="filled"
                onChange={(e) => setRejectComments(e.target.value)}
                value={rejectComments}/>
              </Grid>
              <Grid item xs={12}>
                <Button
                variant="contained"
                type="submit"
                className="view-ticket-button">
                  Submit
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                variant="contained"
                className="view-ticket-button"
                onClick={handleCancel}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>   
        </div>
      );
    }

    // Ticket Feedback
    if (feedbackType === "feedback") {
      return (
        <div class="comments-section">
          <form onSubmit={handleSuccessFeedback}>
            <label>
              <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
              />
            </label>

            <label>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                  className="view-ticket-textfield"
                  id="outlined-basic"
                  multiline='true'
                  label='Comment'
                  variant="filled"
                  onChange={(e) => setSuccessComments(e.target.value)}
                  value={successComments}/>
                </Grid>
                <Grid item xs={12}>
                  <Button
                  variant="contained"
                  type="submit"
                  className="view-ticket-button">
                    Submit Feedback
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                  variant="contained"
                  className="view-ticket-button"
                  onClick={handleCancel}>
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </label>
          </form>
        </div>
      );
    } else if (feedbackType === "reject") {
      return (
        <div class="comments-section">
          <form onSubmit={handleRejectFeedback}>
            <label>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                  className="view-ticket-textfield"
                  id="outlined-basic"
                  multiline='true'
                  label='Reason'
                  variant="filled"
                  onChange={(e) => setRejectComments(e.target.value)}
                  value={rejectComments}/>
                </Grid>
                <Grid item xs={12}>
                  <Button
                  variant="contained"
                  type="submit"
                  className="view-ticket-button">
                    Submit Feedback
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                  variant="contained"
                  className="view-ticket-button"
                  onClick={handleCancel}>
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </label>
          </form>
        </div>
      );
    }
  };

  const handleAcceptQuotation = async () => {
    try {
      // Update in Database and get promises for each update
      const updateQuotationAcceptedByTenantPromise = ticketManager.updateTicket(
        parseInt(serviceTicket.ServiceRequestID),
        "QuotationAcceptedByTenant",
        true
      );

      const updateStatusPromise = ticketManager.updateTicket(
        parseInt(serviceTicket.ServiceRequestID),
        "Status",
        "Quotation Accepted"
      );

      //const sendNotif = notificationmanager.QuotationAcceptNotif(serviceTicket.ServiceRequestID);

      // Execute all promises concurrently using Promise.all
      await Promise.all([
        updateQuotationAcceptedByTenantPromise,
        updateStatusPromise,
        //sendNotif,
      ]);

      window.alert("Quotation accepted!");
      window.location.reload();
    } catch (error) {
      window.alert("Error accepting quotation: " + error);
    }
  };

  const handleRejectQuotation = async () => {
    try {
      // Update in Database and get promises for each update
      const updateStatusPromise = ticketManager.updateTicket(
        parseInt(serviceTicket.ServiceRequestID),
        "Status",
        "Quotation Rejected"
      );

      const updateQuotationAcceptedPromise = ticketManager.updateTicket(
        parseInt(serviceTicket.ServiceRequestID),
        "QuotationAcceptedByTenant",
        false
      );

      const updateFeedbackCommentsPromise =
        ticketManager.updateFeedbackComments(
          parseInt(serviceTicket.ServiceRequestID),
          rejectComments
        );

      //const sendNotif = notificationmanager.QuotationRejectNotif(serviceTicket.ServiceRequestID, rejectComments);

      // Execute all promises concurrently using Promise.all
      await Promise.all([
        updateStatusPromise,
        updateQuotationAcceptedPromise,
        updateFeedbackCommentsPromise,
        //sendNotif,
      ]);

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
      // Update in Database and get promises for each update
      const updateFeedbackRatingPromise = ticketManager.updateTicket(
        parseInt(serviceTicket.ServiceRequestID),
        "FeedbackRating",
        rating
      );

      const updateFeedbackCommentsPromise = ticketManager.updateTicket(
        parseInt(serviceTicket.ServiceRequestID),
        "FeedbackComments",
        successComments
      );

      const updatePARCStatusPromise = ticketManager.updateTicket(
        ServiceRequestID,
        "PARCStatus",
        "CLOSED"
      );

      const updateStatusPromise = ticketManager.updateTicket(
        ServiceRequestID,
        "Status",
        "Feedback Submitted"
      );

      // const sendNotif = notificationmanager.FeedbackSubmittedNotif(
      //  serviceTicket.ServiceRequestID, rating, successComments
      //  );

      // Execute all promises concurrently using Promise.all
      await Promise.all([
        updateFeedbackRatingPromise,
        updateFeedbackCommentsPromise,
        updatePARCStatusPromise,
        updateStatusPromise,
        //sendNotif,
      ]);

      window.alert("Feedback submitted!");
      window.location.reload();
    } catch (error) {
      window.alert("Error submitting feedback: " + error);
    }
  };

  const handleRejectFeedback = async (e) => {
    e.preventDefault();

    try {
      // Update in Database and get promises for each update
      const updateFeedbackCommentsPromise = ticketManager.updateTicket(
        parseInt(serviceTicket.ServiceRequestID),
        "FeedbackComments",
        rejectComments
      );

      const rejectWorksPromise = ticketManager.updateTicket(
        parseInt(serviceTicket.ServiceRequestID),
        "Status",
        "Works Rejected"
      );

      //const sendNotif = notificationmanager.WorksRejectNotif(serviceTicket.ServiceRequestID, rejectComments);

      // Execute all promises concurrently using Promise.all
      await Promise.all([
        updateFeedbackCommentsPromise,
        rejectWorksPromise,
        //sendNotif
      ]);

      window.alert("Feedback submitted!");
      window.location.reload();
    } catch (error) {
      window.alert("Error submitting feedback: " + error);
    }
  };

  if (status === "Awaiting Review") {
    return (
      <div class="ticket-grid">
        <div class="ticket-details">
          <BasicTicketDetails ticket={serviceTicket} />
        </div>

        <div class="delete-ticket-button">
          <Button
          onClick={() => handleDeleteTicket()}
          variant="contained"
          className="view-ticket-button">
            Delete Ticket
          </Button>
        </div>
      </div>
    );
  }

  if (status === "Ticket Assigned") {
    return (
      <div class="ticket-grid">
        <div class="ticket-details">
          <BasicTicketDetails ticket={serviceTicket} />
        </div>
        <div class="assigned-to-card">
          <AssignedToCard staff={staff} />
        </div>
      </div>
    );
  }

  if (status === "Quotation Uploaded") {
    return (
      <div class="ticket-grid">
        <div class="ticket-details">
          <BasicTicketDetails ticket={serviceTicket} />
        </div>
        <div class="assigned-to-card">
          <AssignedToCard staff={staff} />
        </div>
        {showQuotationButtons && (
          <div class="button-group">
            <Grid container spacing={1} columnSpacing={0}>
              <Grid item xs={12}>
                <Button
                variant="contained"
                onClick={() => handleAcceptQuotation()}
                className="view-ticket-button">
                  Accept Quotation
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                variant="contained"
                className="view-ticket-button"
                onClick={() => handleQuotationAcceptRejectClick("reject")}>
                  Reject Quotation
                </Button>
              </Grid>
            </Grid>
          </div>
        )}
        {renderContent()}
        {quotationRequired && (
          <div class="quotation">
            <DisplayQuotation
              ServiceRequestID={serviceTicket.ServiceRequestID}
            />
          </div>
        )}
      </div>
    );
  }

  if (status === "Quotation Rejected") {
    return (
      <div class="ticket-grid">
        <div class="ticket-details">
          <BasicTicketDetails ticket={serviceTicket} />
        </div>
        <div class="assigned-to-card">
          <AssignedToCard staff={staff} />
        </div>
        <div class="reject-reason">
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
              className="view-ticket-textfield"
              id="outlined-basic"
              multiline='true'
              label='Reason for Reject Quotation'
              variant="filled"
              value={serviceTicket.FeedbackComments}/>
            </Grid>
          </Grid>
        </div>
        <div class="quotation">
          <DisplayQuotation ServiceRequestID={serviceTicket.ServiceRequestID} />
        </div>
      </div>
    );
  }

  if (status === "Quotation Accepted") {
    return (
      <div class="ticket-grid">
        <div class="ticket-details">
          <BasicTicketDetails ticket={serviceTicket} />
        </div>
        <div class="assigned-to-card">
          <AssignedToCard staff={staff} />
        </div>
        <div class="quotation">
          <DisplayQuotation ServiceRequestID={serviceTicket.ServiceRequestID} />
        </div>
      </div>
    );
  }

  if (status === "Works Started") {
    return (
      <div class="ticket-grid">
        <div class="ticket-details">
          <BasicTicketDetails ticket={serviceTicket} />
        </div>
        <div class="assigned-to-card">
          <AssignedToCard staff={staff} />
        </div>
        {quotationRequired && (
          <div class="quotation">
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
      <div class="ticket-grid">
        <div class="ticket-details">
          <BasicTicketDetails ticket={serviceTicket} />
        </div>
        <div class="assigned-to-card">
          <AssignedToCard staff={staff} />
        </div>
        {showFeedbackButtons && (
          <div class="button-group">
            <Grid container spacing={1} columnSpacing={0}>
              <Grid item xs={12}>
                <Button
                variant="contained"
                onClick={() => handleFeedbackClick("feedback")}
                className="view-ticket-button">
                  Give Feedback
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                variant="contained"
                className="view-ticket-button"
                onClick={() => handleFeedbackClick("reject")}>
                  Not Satisfied
                </Button>
              </Grid>
            </Grid>
          </div>
        )}
        {renderContent()}

        {quotationRequired && (
          <div class="quotation">
            <DisplayQuotation
              ServiceRequestID={serviceTicket.ServiceRequestID}
            />
          </div>
        )}
      </div>
    );
  }

  if (status === "Works Rejected") {
    return (
      <div class="ticket-grid">
        <div class="ticket-details">
          <BasicTicketDetails ticket={serviceTicket} />
        </div>
        <div class="assigned-to-card">
          <AssignedToCard staff={staff} />
        </div>

        {quotationRequired && (
          <div class="quotation">
            <DisplayQuotation
              ServiceRequestID={serviceTicket.ServiceRequestID}
            />
          </div>
        )}

        <div class="reject-reason">
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
              className="view-ticket-textfield"
              multiline='true'
              id="outlined-basic"
              label='Reason for Reject'
              variant="filled"
              value={serviceTicket.FeedbackComments}/>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }

  if (status === "Feedback Submitted") {
    return (
      <div class="ticket-grid">
        <div class="ticket-details">
          <BasicTicketDetails ticket={serviceTicket} />
        </div>
        <div class="final-staff-tenant-details">
          <AssignedToCard staff={staff} />
        </div>
        <div class="final-feedback-details">
          <ViewFinalFeedbackDetails
            rating={serviceTicket.FeedbackRating}
            comments={serviceTicket.FeedbackComments}
          />
        </div>

        {quotationRequired && (
          <div class="quotation">
            {/* <DownloadQuotation
              bucketName="quotation"
              ServiceRequestID={serviceTicket.ServiceRequestID}
            /> */}
            <DisplayQuotation
              ServiceRequestID={serviceTicket.ServiceRequestID}
            />
          </div>
        )}
      </div>
    );
  }
};

export default ViewTicketTenant;
