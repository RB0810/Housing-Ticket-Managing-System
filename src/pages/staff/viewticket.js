import { useState, useEffect } from "react";
import TicketManager from "../../managers/ticketmanager";
import AccountManager from "../../managers/accountmanager";
import BasicTicketDetails from "../../components/BasicTicketDetails";
import SubmittedByCard from "../../components/SubmittedByCard";
import ViewFinalFeedbackDetails from "../../components/ViewFinalFeedbackDetails";
import { useParams } from "react-router-dom";
import UploadQuotation from "../../components/UploadQuotation";
import DisplayQuotation from "../../components/DisplayQuotation";
import supabase from "../../config/supabaseClient";
import Swal from "sweetalert2";

// Quotation-related imports
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const ViewTicketStaff = () => {
  const ticketManager = new TicketManager();
  const accountManager = new AccountManager();
  let { ServiceRequestID } = useParams();
  const [serviceTicket, setServiceTicket] = useState([]);
  const [tenant, setTenant] = useState([]);
  const [fetchError, setFetchError] = useState([]);

  const [status, setStatus] = useState("");
  const [feedbackComments, setFeedbackComments] = useState("");

  const [quotationRequired, setQuotationRequired] = useState("true");

  // Quotation Items
  const [quotationPath, setQuotationPath] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const getTenantAndTicket = async () => {
      let ticketData = await ticketManager.getTicket(
        parseInt(ServiceRequestID)
      );

      let tenantData = await accountManager.getSubmittedByTenantDetails(
        ticketData[0].TenantID
      );

      if (ticketData !== false) {
        setServiceTicket(ticketData[0]);
        setTenant(tenantData);
        setStatus(ticketData[0].Status);
        setFeedbackComments(ticketData[0].FeedbackComments);
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
        window.alert("Ticket empty!");
        setServiceTicket();
      } else {
        setFetchError("Error finding this ticket :(");
        setServiceTicket();
      }
    };

    getTenantAndTicket();
  }, []);

  const handleQuotationRequiredChange = (e) => {
    setQuotationRequired(e.target.value);
    console.log(quotationRequired);
  };

  const handleContinue = async () => {
    try {
      // Get promises for each update
      const updateQuotationRequiredPromise = ticketManager.updateTicket(
        serviceTicket.ServiceRequestID,
        "QuotationRequired",
        quotationRequired
      );

      const updateStatusPromise =
        quotationRequired === "true"
          ? ticketManager.updateTicket(
              serviceTicket.ServiceRequestID,
              "Status",
              "Quotation Uploaded"
            )
          : ticketManager.updateTicket(
              serviceTicket.ServiceRequestID,
              "Status",
              "Ticket Assigned"
            );

      const updatePARCStatusPromise = ticketManager.updateTicket(
        serviceTicket.ServiceRequestID,
        "PARCStatus",
        "ACTIVE"
      );

      // Execute all promises concurrently using Promise.all
      await Promise.all([
        updateQuotationRequiredPromise,
        updateStatusPromise,
        updatePARCStatusPromise,
      ]);

      window.alert("QUOTATION UPDATE SUCCESSFUL!");
      window.location.reload();
    } catch (error) {
      window.alert("ERROR IN CONTINUE FOR QUOTATION UPLOAD");
    }
  };

  const handleReuploadQuotation = async () => {
    try {
      await ticketManager.updateTicket(
        serviceTicket.ServiceRequestID,
        "Status",
        "Quotation Uploaded"
      );
      window.alert("QUOTATION UPDATE SUCCESSFUL!");
      window.location.reload();
    } catch (error) {
      window.alert("ERROR IN REUPLOAD FOR QUOTATION UPLOAD");
    }
  };

  const handleStartWorks = async () => {
    try {
      // Change status
      await ticketManager.updateTicket(
        serviceTicket.ServiceRequestID,
        "Status",
        "Works Started"
      );

      // Perform any additional actions or display a success message
      window.alert("Works Started!");
      window.location.reload();
    } catch (error) {
      // Handle errors appropriately
      window.alert("Update Failed!");
    }
  };

  const handleEndWorks = async () => {
    try {
      // Change status
      await ticketManager.updateTicket(
        serviceTicket.ServiceRequestID,
        "Status",
        "Works Ended"
      );

      // Perform any additional actions or display a success message
      window.alert("Update Successful!");
      window.location.reload();
    } catch (error) {
      // Handle errors appropriately
      window.alert("Update Failed!");
    }
  };

  const handleFileChange = async (event) => {
    await uploadFileToBucket(event.target.files[0]);
  };

  const uploadFileToBucket = async (file) => {
    if (!file) {
      console.log("No file selected.");
      return;
    }

    const fileName = file.name;
    const fileExt = fileName.split(".").pop();
    const filePath = `${serviceTicket.ServiceRequestID}.${fileExt}`;

    try {
      // Wait for the file upload to complete
      const { data, error } = await supabase.storage
        .from("quotation")
        .upload(filePath, file, { cacheControl: "3600", upsert: true });

      if (error) {
        console.error("Error uploading file:", error);
        Swal.fire({
          // Display error alert
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        return { error };
      }

      console.log(`File path is: ${filePath}`);
      console.log("File uploaded successfully:", data);

      // Wait for the database update to complete
      const { data: updateData, error: updateError } = await supabase
        .from("Service Request")
        .update({ QuotationAttachmentPath: filePath })
        .match({ ServiceRequestID: serviceTicket.ServiceRequestID });

      if (updateError) {
        console.error("Error updating file path:", updateError);
        Swal.fire({
          // Display error alert
          icon: "error",
          title: "Oops...",
          text: "Failed to update the file path in the database!",
        });
        return { error: updateError };
      }

      console.log("File path updated successfully:", updateData);
      Swal.fire({
        // Display success alert
        icon: "success",
        title: "Uploaded",
        text: "Your file has been uploaded and the file path is updated.",
      });
      return { data: updateData };
    } catch (error) {
      console.error("Error uploading file:", error);
      Swal.fire({
        // Display error alert
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
      return { error };
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

  const renderContent = () => {
    // Quotation Feedback
    if (quotationRequired === "true" || quotationRequired === null) {
      return (
        <div>
          <input type="file" onChange={handleFileChange} />
        </div>
      );
    } else if (quotationRequired === "false") {
      return null;
    }
  };

  if (status === "Awaiting Review") {
    return (
      <div>
        <BasicTicketDetails ticket={serviceTicket} />
        _______________________________________
        <SubmittedByCard tenant={tenant} />
      </div>
    );
  }

  if (status === "Ticket Assigned") {
    if (quotationRequired === false) {
      return (
        <div>
          <BasicTicketDetails ticket={serviceTicket} />
          _______________________________________
          <SubmittedByCard tenant={tenant} />
          _______________________________________
          <div>
            <button onClick={handleStartWorks}>Start Works</button>
          </div>
          _______________________________________
        </div>
      );
    } else {
      return (
        <div>
          <BasicTicketDetails ticket={serviceTicket} />
          _______________________________________
          <SubmittedByCard tenant={tenant} />
          _______________________________________
          <div>
            <label>
              Quotation Required:
              <select
                value={quotationRequired}
                onChange={handleQuotationRequiredChange}
              >
                <option value={true}>YES</option>
                <option value={false}>NO</option>
              </select>
            </label>
            {renderContent()}
            <div>
              <button onClick={handleContinue}>Submit</button>
            </div>
          </div>
        </div>
      );
    }
  }

  if (status === "Quotation Uploaded") {
    return (
      <div>
        <BasicTicketDetails ticket={serviceTicket} />
        _______________________________________
        <SubmittedByCard tenant={tenant} />
        _______________________________________
        <div>
          <button onClick={handleFileDownload}>Download File</button>
        </div>
        <DisplayQuotation quotationPath={quotationPath} file={file} />
        _______________________________________
      </div>
    );
  }

  if (status === "Quotation Accepted") {
    return (
      <div>
        <BasicTicketDetails ticket={serviceTicket} />
        _______________________________________
        <SubmittedByCard tenant={tenant} />
        _______________________________________
        <div>
          <button onClick={handleStartWorks}>Start Works</button>
        </div>
        _______________________________________
        <div>
          <button onClick={handleFileDownload}>Download File</button>
        </div>
        <DisplayQuotation quotationPath={quotationPath} file={file} />
        _______________________________________
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
        <UploadQuotation
          bucketName="quotation"
          ServiceRequestID={serviceTicket.ServiceRequestID}
        />
        <div>
          <button onClick={handleReuploadQuotation}>Reupload Quotation</button>
        </div>
        _______________________________________
        <div>
          <h2>Rejection Details</h2>
          <p>Reason for rejection: {feedbackComments}</p>
        </div>
        <div>
          <button onClick={handleFileDownload}>Download File</button>
        </div>
        <DisplayQuotation quotationPath={quotationPath} file={file} />
        _______________________________________
      </div>
    );
  }

  if (status === "Works Started") {
    return (
      <div>
        <BasicTicketDetails ticket={serviceTicket} />
        _______________________________________
        <SubmittedByCard tenant={tenant} />
        _______________________________________
        <div>
          <button onClick={handleEndWorks}>End Works</button>
        </div>
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

  if (status === "Works Ended") {
    return (
      <div>
        <BasicTicketDetails ticket={serviceTicket} />
        _______________________________________
        <SubmittedByCard tenant={tenant} />
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

  if (status === "Works Rejected") {
    return (
      <div>
        <BasicTicketDetails ticket={serviceTicket} />
        _______________________________________
        <SubmittedByCard tenant={tenant} />
        _______________________________________
        <div>
          <h2>Rejection Details</h2>
          <p>Reason for rejection: {feedbackComments}</p>

          <button onClick={handleStartWorks}>Restart Works</button>
        </div>
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
        <SubmittedByCard tenant={tenant} />
        _______________________________________
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

export default ViewTicketStaff;
