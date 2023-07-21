import { useState, useEffect } from "react";
import TicketManager from "../../managers/ticketmanager";
import AccountManager from "../../managers/accountmanager";
import BasicTicketDetails from "../../components/BasicTicketDetails";
import AssignedToCard from "../../components/AssignedToCard";
import ViewFinalFeedbackDetails from "../../components/ViewFinalFeedbackDetails";
import { useParams } from "react-router-dom";
import DisplayQuotation from "../../components/DisplayQuotation";
import { Rating } from "@mui/material";
import supabase from "../../config/supabaseClient";
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

            <button type="submit">Submit</button>
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

      // Execute all promises concurrently using Promise.all
      await Promise.all([
        updateQuotationAcceptedByTenantPromise,
        updateStatusPromise,
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

      // Execute all promises concurrently using Promise.all
      await Promise.all([
        updateStatusPromise,
        updateQuotationAcceptedPromise,
        updateFeedbackCommentsPromise,
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
      const updateFeedbackRatingPromise = ticketManager.updateFeedbackRating(
        parseInt(serviceTicket.ServiceRequestID),
        rating
      );

      const updateFeedbackCommentsPromise =
        ticketManager.updateFeedbackComments(
          parseInt(serviceTicket.ServiceRequestID),
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

      // Execute all promises concurrently using Promise.all
      await Promise.all([
        updateFeedbackRatingPromise,
        updateFeedbackCommentsPromise,
        updatePARCStatusPromise,
        updateStatusPromise,
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
      const updateFeedbackCommentsPromise =
        ticketManager.updateFeedbackComments(
          parseInt(serviceTicket.ServiceRequestID),
          rejectComments
        );

      const rejectTicketPromise = ticketManager.rejectTicket(
        parseInt(serviceTicket.ServiceRequestID)
      );

      // Execute all promises concurrently using Promise.all
      await Promise.all([updateFeedbackCommentsPromise, rejectTicketPromise]);

      window.alert("Feedback submitted!");
      window.location.reload();
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
        {quotationRequired && (
          <div>
            <div>
              <button onClick={handleFileDownload}>Download Quotation</button>
            </div>
            <DisplayQuotation quotationPath={quotationPath} file={file} />
          </div>
        )}
      </div>
    );
  }

  if (status === "Quotation Rejected") {
    return (
      <div>
        <BasicTicketDetails ticket={serviceTicket} />
        <AssignedToCard staff={staff} />
        <h1>Reason for Reject Quotation : {serviceTicket.FeedbackComments}</h1>
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
        {quotationRequired && (
          <div>
            <div>
              <button onClick={handleFileDownload}>Download Quotation</button>
            </div>
            <DisplayQuotation quotationPath={quotationPath} file={file} />
          </div>
        )}
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
            <div>
              <button onClick={handleFileDownload}>Download Quotation</button>
            </div>
            <DisplayQuotation quotationPath={quotationPath} file={file} />
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
            <div>
              <button onClick={handleFileDownload}>Download Quotation</button>
            </div>
            <DisplayQuotation quotationPath={quotationPath} file={file} />
          </div>
        )}
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
            <div>
              <button onClick={handleFileDownload}>Download Quotation</button>
            </div>
            <DisplayQuotation quotationPath={quotationPath} file={file} />
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
            <div>
              <button onClick={handleFileDownload}>Download Quotation</button>
            </div>
            <DisplayQuotation quotationPath={quotationPath} file={file} />
          </div>
        )}
      </div>
    );
  }
};

export default ViewTicketTenant;
