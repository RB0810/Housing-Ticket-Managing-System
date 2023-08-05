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
import { SHA256 } from "crypto-js";
import { Typography } from "@mui/material";
import DisplayQuotation from "../../components/DisplayQuotation";
import NotificationManager from "../../managers/notificationmanager";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

// Import styles
import "./../../styles/viewticket.css";

const ViewTicketTenant = () => {
  const ticketManager = new TicketManager();
  const accountManager = new AccountManager();
  const notificationmanager = new NotificationManager();
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

  const {TenantID} = useParams();

  useEffect(() => {
    const userId = Cookies.get('userId');
    const type = Cookies.get('type');

    if (!userId || !type) {
      // If any of the required cookies are missing, redirect to the login page
      console.log('Unauthorized');
      navigate("/unauthorize");
    } else {
      const userIdAsString = String(TenantID);
      // Use SHA-256 to hash the userId
      const hashedUserId = SHA256(userIdAsString).toString();
      // Check if the user's ID and type match the expected values (e.g., TenantID and "tenant")
      if (userId === hashedUserId && type === "Tenant") {
        // Proceed with rendering the component
        console.log('Authorized');
      } else {
        // If not authorized, display "Unauthorized access" message
        console.log('Unauthorized');
        navigate("/unauthorize");
      }
    }
  }, [navigate, TenantID]);

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
      Swal.fire({
        icon: "success",
        title: "Ticket deleted",
        showConfirmButton: true,
        confirmButtonColor: "#707c4f"
      });
      navigate(`/tenantportal/landingpage/${serviceTicket.TenantID}`);
      // Probably need to redirect to main page here
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error in deleting Quotation",
        showConfirmButton: true,
        confirmButtonColor: "#707c4f",
        text: error.message
      });
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
        Swal.fire({
          icon: "error",
          title: "Error downloading file",
          showConfirmButton: true,
          confirmButtonColor: "#707c4f"
        });
        return;
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error downloading file",
        showConfirmButton: true,
        confirmButtonColor: "#707c4f"
      });
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
                id="view-ticket-reject-reason-textfield"
                multiline='true'
                label='Reason for Reject'
                variant="filled"
                onChange={(e) => setRejectComments(e.target.value)}
                value={rejectComments}/>
              </Grid>
              <Grid item xs={12}>
                <Button
                id="view-ticket-reject-reason-submit-button"
                variant="contained"
                type="submit"
                className="view-ticket-button">
                  Submit
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                id="view-ticket-reject-reason-cancel-button"
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
                id="view-ticket-feedback-rating"
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
                  id="view-ticket-feedback-textfield"
                  multiline='true'
                  label='Comment'
                  variant="filled"
                  onChange={(e) => setSuccessComments(e.target.value)}
                  value={successComments}/>
                </Grid>
                <Grid item xs={12}>
                  <Button
                  id="view-ticket-submit-feedback-button"
                  variant="contained"
                  type="submit"
                  className="view-ticket-button">
                    Submit Feedback
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                  id="view-ticket-cancel-feedback-button"
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
                  id="view-ticket-reject-reason-textfield"
                  multiline='true'
                  label='Reason'
                  variant="filled"
                  onChange={(e) => setRejectComments(e.target.value)}
                  value={rejectComments}/>
                </Grid>
                <Grid item xs={12}>
                  <Button
                  id="view-ticket-submit-reject-reason-button"
                  variant="contained"
                  type="submit"
                  className="view-ticket-button">
                    Submit Feedback
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                  id="view-ticket-cancel-reject-reason-textfield"
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

      let currentDate = new Date();
      let timezoneOffset = currentDate.getTimezoneOffset() * 60000;
      let localTime = new Date(currentDate - timezoneOffset);
      let submittedDateTime = localTime
        .toISOString()
        .replace("T", " ")
        .slice(0, -5);

      const updateQuotationAcceptDate = ticketManager.updateTicket(
        parseInt(serviceTicket.ServiceRequestID),
        "QuotationAcceptanceDate",
        submittedDateTime
      );

      const sendNotif = notificationmanager.QuotationAcceptNotif(serviceTicket.ServiceRequestID);

      // Execute all promises concurrently using Promise.all
      await Promise.all([
        updateQuotationAcceptedByTenantPromise,
        updateStatusPromise,
        updateQuotationAcceptDate,
        sendNotif,
      ]);

      Swal.fire({
        icon: "success",
        title: "Quotation accepted",
        showConfirmButton: true,
        confirmButtonColor: "#707c4f"
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error accepting Quotation",
        showConfirmButton: true,
        confirmButtonColor: "#707c4f",
        text: error.message
      });
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

      const sendNotif = notificationmanager.QuotationRejectNotif(serviceTicket.ServiceRequestID, rejectComments);

      // Execute all promises concurrently using Promise.all
      await Promise.all([
        updateStatusPromise,
        updateQuotationAcceptedPromise,
        updateFeedbackCommentsPromise,
        sendNotif,
      ]);

      Swal.fire({
        icon: "success",
        title: "Quotation rejected",
        showConfirmButton: true,
        confirmButtonColor: "#707c4f"
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Reject Quotation error",
        showConfirmButton: true,
        confirmButtonColor: "#707c4f",
        text: error.message
      });
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

      const sendNotif = notificationmanager.FeedbackSubmittedNotif(
       serviceTicket.ServiceRequestID, rating, successComments
       );

      // Execute all promises concurrently using Promise.all
      await Promise.all([
        updateFeedbackRatingPromise,
        updateFeedbackCommentsPromise,
        updatePARCStatusPromise,
        updateStatusPromise,
        sendNotif,
      ]);

      Swal.fire({
        icon: "success",
        title: "Feedback submitted",
        showConfirmButton: true,
        confirmButtonColor: "#707c4f"
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error in submitting feedback",
        showConfirmButton: true,
        confirmButtonColor: "#707c4f",
        text: error.message
      });
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

      const sendNotif = notificationmanager.WorksRejectNotif(serviceTicket.ServiceRequestID, rejectComments);

      // Execute all promises concurrently using Promise.all
      await Promise.all([
        updateFeedbackCommentsPromise,
        rejectWorksPromise,
        sendNotif
      ]);

      Swal.fire({
        icon: "success",
        title: "Feedback submitted",
        showConfirmButton: true,
        confirmButtonColor: "#707c4f"
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "success",
        title: "Error in submitting feedback",
        showConfirmButton: true,
        confirmButtonColor: "#707c4f",
        text: error.message
      });
    }
  };

  if (status === "Awaiting Review") {
    return (
      <div>
        <Grid container spacing={1} columns={10}>
          <Grid item xs={4}>
            <Grid item xs={12}>
              <BasicTicketDetails ticket={serviceTicket} />
            </Grid>
            <Grid item xs={12}>
              <Button
              id="view-ticket-delete-ticket-button"
              onClick={() => handleDeleteTicket()}
              variant="contained"
              className="view-ticket-button">
                Delete Ticket
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }

  if (status === "Ticket Rejected") {
    return (
      <div>
        <Grid container spacing={1} columns={10}>
          <Grid item xs={4}>
            <Grid item xs={12}>
              <BasicTicketDetails ticket={serviceTicket} />
            </Grid>
            <Grid item xs={12}>
              <div className="view-ticvket-special-div">
                <TextField
                className="view-ticket-textfield"
                multiline='true'
                id="view-ticket-reject-reason-textfield"
                label='Reason for Reject'
                variant="filled"
                value={serviceTicket.FeedbackComments}/>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }

  if (status === "Ticket Assigned") {
    return (
      <div>
        <Grid container spacing={1} columns={10}>
          <Grid item xs={4}>
            <Grid item xs={12}>
              <BasicTicketDetails ticket={serviceTicket} />
            </Grid>
            <Grid item xs={12}>
              <AssignedToCard staff={staff} />
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }

  if (status === "Quotation Uploaded") {
    return (
      <div>
        <Grid container spacing={1} columns={10}>
          <Grid item xs={4}>
            <Grid item xs={12}>
              <BasicTicketDetails ticket={serviceTicket} />
            </Grid>
            <Grid item xs={12}>
              <AssignedToCard staff={staff} />
            </Grid>
            <Grid item xs={12}>
              {showQuotationButtons && (
                <div class="button-group">
                  <Grid container spacing={1} >
                    <Grid item xs={12}>
                      <Button
                      id="view-ticket-accept-quotation-button"
                      variant="contained"
                      onClick={() => handleAcceptQuotation()}
                      className="view-ticket-button">
                        Accept Quotation
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                      id="view-ticket-accept-quotation-button"
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
            </Grid>
          </Grid>
          <Grid item xs={6}>
            {quotationRequired && (
                <div class="quotation">
                  <DisplayQuotation
                    ServiceRequestID={serviceTicket.ServiceRequestID}
                  />
                </div>
              )}
          </Grid>
        </Grid>
      </div>
    );
  }

  if (status === "Quotation Rejected") {
    return (
      <div class="ticket-grid">
        <Grid container spacing={1} columns={10}>
          <Grid item xs={4}>
            <Grid item xs={12}>
              <BasicTicketDetails ticket={serviceTicket} />
            </Grid>
            <p></p>
            <Grid item xs={12}>
              <TextField
              className="view-ticket-textfield"
              id="outlined-basic"
              multiline='true'
              label ="Reason for Rejection"
              variant="filled"
              value={serviceTicket.FeedbackComments}
              InputProps={{readOnly: true,}}/>
            </Grid>
            <Grid item xs={12}>
              <AssignedToCard staff={staff} />
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <DisplayQuotation ServiceRequestID={serviceTicket.ServiceRequestID} />
          </Grid>
        </Grid>
      </div>
    );
  }

  if (status === "Quotation Accepted") {
    return (
      <div>
        <Grid container spacing={1} columns={10}>
          <Grid item xs={4}>
            <Grid item xs={12}>
              <BasicTicketDetails ticket={serviceTicket} />
            </Grid>
            <Grid item xs={12}>
              <AssignedToCard staff={staff} />
            </Grid>
          </Grid>
          <Grid item xs={6}>
          <DisplayQuotation ServiceRequestID={serviceTicket.ServiceRequestID} />
          </Grid>
        </Grid>
      </div>
    );
  }

  if (status === "Works Started") {
    return (
      <div>
        <Grid container spacing={1} columns={10}>
          <Grid item xs={4}>
            <Grid item xs={12}>
              <BasicTicketDetails ticket={serviceTicket} />
            </Grid>
            <Grid item xs={12}>
              <AssignedToCard staff={staff} />
            </Grid>
          </Grid>
          <Grid item xs={6}>
            {quotationRequired && (
              <div class="quotation">
                <DisplayQuotation
                  ServiceRequestID={serviceTicket.ServiceRequestID}
                />
              </div>
            )}
          </Grid>
        </Grid>
      </div>
    );
  }

  if (status === "Works Ended") {
    return (
      <div>
        <Grid container spacing={1} columns={10}>
          <Grid item xs={4}>
            <Grid item xs={12}>
              <BasicTicketDetails ticket={serviceTicket} />
            </Grid>
            <Grid item xs={12}>
              <AssignedToCard staff={staff} />
            </Grid>
            <Grid item xs={12}>
              {showFeedbackButtons && (
                <div class="button-group">
                  <Grid container spacing={1} columnSpacing={0}>
                    <Grid item xs={12}>
                      <Button
                      id="view-ticket-feedback-button"
                      variant="contained"
                      onClick={() => handleFeedbackClick("feedback")}
                      className="view-ticket-button">
                        Give Feedback
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                      id="view-ticket-reject-button"
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
            </Grid>
          </Grid>
          <Grid item xs={6}>
            {quotationRequired && (
              <div class="quotation">
                <DisplayQuotation
                  ServiceRequestID={serviceTicket.ServiceRequestID}
                />
              </div>
            )}
          </Grid>
        </Grid>
      </div>
    );
  }

  if (status === "Works Rejected") {
    return (
      <div>
        <Grid container spacing={1} columns={10}>
          <Grid item xs={4}>
            <Grid item xs={12}>
              <BasicTicketDetails ticket={serviceTicket} />
            </Grid>
            <p></p>
            <Grid item xs={12}>
              <TextField
              className="view-ticket-textfield"
              id="outlined-basic"
              multiline='true'
              label ="Reason for Rejection"
              variant="filled"
              value={serviceTicket.FeedbackComments}
              InputProps={{readOnly: true,}}/>
            </Grid>
            <Grid item xs={12}>
              <AssignedToCard staff={staff} />
            </Grid>
          </Grid>
          <Grid item xs={6}>
            {quotationRequired && (
              <div class="quotation">
                <DisplayQuotation
                  ServiceRequestID={serviceTicket.ServiceRequestID}
                />
              </div>
            )}
          </Grid>
        </Grid>
      </div>
    );
  }

  if (status === "Feedback Submitted") {
    return (
      <div>
        <Grid container spacing={1} columns={10}>
          <Grid item xs={4}>
            <Grid item xs={12}>
              <BasicTicketDetails ticket={serviceTicket} />
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
          <Grid item xs={6}>
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
          </Grid>
        </Grid>

        
      </div>
    );
  }
};

export default ViewTicketTenant;
