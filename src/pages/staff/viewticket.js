import { useState, useEffect } from "react";
import TicketManager from "../../managers/ticketmanager";
import AccountManager from "../../managers/accountmanager";
import BasicTicketDetails from "../../components/BasicTicketDetails";
import SubmittedByCard from "../../components/SubmittedByCard";
import ViewFinalFeedbackDetails from "../../components/ViewFinalFeedbackDetails";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import UploadQuotation from "../../components/UploadQuotation";
import DisplayQuotation from "../../components/DisplayQuotation";
import supabase from "../../config/supabaseClient";
import Swal from "sweetalert2";
import NotificationManager from "../../managers/notificationmanager";
import { Grid,Button,TextField,MenuItem, Select, OutlinedInput } from "@mui/material";

// // Styles
import "./../../styles/viewticket.css";

// Quotation-related imports
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const ViewTicketStaff = () => {
  const ticketManager = new TicketManager();
  const accountManager = new AccountManager();
  //const notificationmanager = new NotificationManager();
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

  const navigate = useNavigate();
  const {StaffID} = useParams();

  useEffect(() => {
    const userId = Cookies.get('userId');
    const type = Cookies.get('type');

    if (!userId || !type) {
      // If any of the required cookies are missing, redirect to the login page
      console.log('Unauthorized');
      navigate("/unauthorize");
    } else {
      // Check if the user's ID and type match the expected values (e.g., StaffID and "Staff")
      if (Number(userId) === parseInt(StaffID) && type === "Staff") {
        // Proceed with rendering the component
        console.log('Authorized');
      } else {
        // If not authorized, display "Unauthorized access" message
        console.log('Unauthorized');
        navigate("/unauthorize");
      }
    }
  }, [navigate, StaffID]);

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
        Swal.fire({
          icon: "error",
          title: "Ticket is empty",
          showConfirmButton: true,
          confirmButtonColor: "#707c4f"
        });
        setServiceTicket();
      } else {
        setFetchError("Error finding this ticket :(");
        setServiceTicket();
      }
    };

    getTenantAndTicket();
  }, []);

  const changeQuotationRequired = (value) => {
    setQuotationRequired(value);
  };

  const handleQuotationRequiredChange = (e) => {
    changeQuotationRequired(e.target.value);
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

      // const sendNotif = notificationmanager.QuotationUploadNotif(
      //   serviceTicket.ServiceRequestID
      // );

      //Execute all promises concurrently using Promise.all
      await Promise.all([
        updateQuotationRequiredPromise,
        updateStatusPromise,
        updatePARCStatusPromise,
        //sendNotif,
      ]);

      Swal.fire({
        icon: "success",
        title: "Update Quotation successful",
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
        title: "Error in continue for quotation upload",
        showConfirmButton: true,
        confirmButtonColor: "#707c4f"
      });
    }
  };

  const handleReuploadQuotation = async () => {
    try {
      await ticketManager.updateTicket(
        serviceTicket.ServiceRequestID,
        "Status",
        "Quotation Uploaded"
      );
      // try {
      //   await notificationmanager.QuotationUploadNotif(
      //     serviceTicket.ServiceRequestID
      //   );
      // } catch (error) {
      //   console.log(error);
      // }
      Swal.fire({
        icon: "success",
        title: "Update Quotation successful",
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
        title: "Quotation reupload error",
        showConfirmButton: true,
        confirmButtonColor: "#707c4f"
      });
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

      // try {
      //   await notificationmanager.WorksStartedNotif(
      //     serviceTicket.ServiceRequestID
      //   );
      // } catch (error) {
      //   console.log(error);
      // }

      // Perform any additional actions or display a success message
      Swal.fire({
        icon: "success",
        title: "Works started",
        showConfirmButton: true,
        confirmButtonColor: "#707c4f"
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    } catch (error) {
      // Handle errors appropriately
      Swal.fire({
        icon: "error",
        title: "Update failed",
        showConfirmButton: true,
        confirmButtonColor: "#707c4f"
      });
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

      // try {
      //   await notificationmanager.WorksEndedNotif(
      //     serviceTicket.ServiceRequestID
      //   );
      // } catch (error) {
      //   console.log(error);
      // }

      // Perform any additional actions or display a success message
      Swal.fire({
        icon: "success",
        title: "Update successful",
        showConfirmButton: true,
        confirmButtonColor: "#707c4f"
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    } catch (error) {
      // Handle errors appropriately
      Swal.fire({
        icon: "error",
        title: "Update failed",
        showConfirmButton: true,
        confirmButtonColor: "#707c4f"
      });
    }
  };

  const handleFileChange = async (event) => {
    changeQuotationRequired("true");
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
          showConfirmButton: true,
          confirmButtonColor: "#707c4f"
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
          title: "Error uploading Quotation",
          showConfirmButton: true,
          confirmButtonColor: "#707c4f"
        });
        return { error: updateError };
      }

      console.log("File path updated successfully:", updateData);
      Swal.fire({
        // Display success alert
        icon: "success",
        title: "Quotation Uploaded",
        showConfirmButton: true,
        confirmButtonColor: "#707c4f"
      });
      return { data: updateData };
    } catch (error) {
      console.error("Error uploading file:", error);
      Swal.fire({
        // Display error alert
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        showConfirmButton: true,
        confirmButtonColor: "#707c4f"
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

  const renderContent = () => {
    // Quotation Feedback
    if (quotationRequired === "true" || quotationRequired === null) {
      return (
        <div>
          {/* Attention!! */}
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
    if (quotationRequired === false) {
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
                <Button
                className="view-ticket-button"
                id="staff-portal-start-works-button"
                variant="contained"
                onClick={handleStartWorks}>
                  Start Works
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </div>
      );
    } else {
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
                <h2 className="quotationrequired-header">Quotation Required</h2>
              </Grid>
              <Grid item xs={12}>
                {/* <Select
                className="assignstaff-textfield"
                value={quotationRequired}
                variant='outlined'
                onChange={handleQuotationRequiredChange}
                input={<OutlinedInput value={quotationRequired}/>}>
                  <MenuItem value={true}>YES</MenuItem>
                  <MenuItem value={false}>NO</MenuItem>
                </Select> */}
                <select
                id="staff-portal-quotation-required-select"
                className="viewticket-select"
                value={quotationRequired}
                onChange={handleQuotationRequiredChange}>
                <option value={true} id='yes'> Yes</option>
                <option value={false} id='no'>No</option>
                </select>
                
              </Grid>
              <Grid item xs={12}>
              {renderContent()}
                <Button
                className="view-ticket-button"
                id="staff-portal-submit-quotation-button"
                variant="contained"
                onClick={handleContinue}>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </div>
      );
    }
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
              <SubmittedByCard tenant={tenant} />
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
      <div className="ticket-grid">
        <Grid container spacing={1} columns={10}>
          <Grid item xs={4}>
            <Grid item xs={12}>
              <BasicTicketDetails ticket={serviceTicket} />
            </Grid>
            <Grid item xs={12}>
              <SubmittedByCard tenant={tenant} />
            </Grid>
            <Grid item xs={12}>
              <Button
              className="view-ticket-button"
              id="staff-portal-start-works-button"
              variant="contained"
              onClick={handleStartWorks}>
                Start Works
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <DisplayQuotation ServiceRequestID={serviceTicket.ServiceRequestID} />
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
            <Grid item xs={12}>
              <SubmittedByCard tenant={tenant} />
            </Grid>
            <Grid item xs={12}>
              <input type="file" id="staff-portal-upload-file-input" onChange={handleFileChange} />
            </Grid>
            <Grid item xs={12}>
              <Button 
              className="view-ticket-button"
              id="staff-portal-reupload-quotation-button"
              variant="contained" 
              onClick={handleReuploadQuotation}>
                Reupload Quotation
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TextField
              className="view-ticket-textfield"
              id="outlined-basic"
              multiline='true'
              label ="Reason for Rejection"
              variant="filled"
              value={feedbackComments}
              InputProps={{readOnly: true,}}/>
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
              <SubmittedByCard tenant={tenant} />
            </Grid>
            <Grid item xs ={12}>
              <Button 
              className="view-ticket-button"
              id="staff-portal-end-works-button"
              onClick={handleEndWorks} 
              variant="contained">
                End Works
              </Button>
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
              <SubmittedByCard tenant={tenant} />
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
            <Grid item xs={12}>
              <SubmittedByCard tenant={tenant} />
            </Grid>
            <Grid item xs={12}>
              <TextField
              className="view-ticket-textfield"
              id="outlined-basic"
              multiline='true'
              label ="Reason for Rejection"
              variant="filled"
              value={feedbackComments}
              InputProps={{readOnly: true,}}/>
            </Grid>
            <Grid item xs ={12}>
              <Button
              className="view-ticket-button" 
              id="staff-portal-restart-works-button"
              onClick={handleStartWorks} 
              variant="contained">
                Restart Works
              </Button>
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
      <div class="ticket-grid">
        <Grid container spacing={1} columns={10}>
          <Grid item xs ={4}>
            <Grid item xs={12}>
              <BasicTicketDetails ticket={serviceTicket} />
            </Grid>
            <Grid item xs={12}>
              <SubmittedByCard tenant={tenant} /> 
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

export default ViewTicketStaff;
