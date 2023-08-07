import emailjs from "emailjs-com";
import supabase from "../config/supabaseClient";

const toEmail = "tohhylucas@gmail.com";
const PublicKey = "_MZEl_HwYyb8X78QO";
const ServiceID = "service_7n9ni8h";
const Template = "template_1ywp398";

class NotificationManager{
  async handleSendEmail(emailParams){
    emailjs.init(PublicKey);

    try {
      const response = await emailjs.send(
        ServiceID,
        Template,
        emailParams
      );
      console.log("Email sent successfully!", response);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  async sendMailtoSupervisorFromTenantID(tenantID, body){
    emailjs.init(PublicKey);
    let { data: supervisorID } = await supabase
      .from("TenantUsers")
      .select("UnderSupervisor")
      .eq("TenantID", tenantID);

    supervisorID = supervisorID[0].UnderSupervisor;

    let{data: supervisor} = await supabase
        .from("SupervisorUsers")
        .select("*")
        .eq("SupervisorID", supervisorID)

    const emailParams = {
        to_email: toEmail, //supervisor[0].SupervisorEmail,
        message: body,
      };
    console.log("I am here");
    console.log(emailParams);
    try {
      const response = await emailjs.send(
        ServiceID,
        Template,
        emailParams
      );
      console.log("Email sent successfully!", response);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  async QuotationAcceptNotif(ticketID){
    emailjs.init(PublicKey);
    let { data: ticketDetails } = await supabase
      .from("Service Request")
      .select("*")
      .eq("ServiceRequestID", parseInt(ticketID));

    const body = `Tenant has accepted quotation for ticket ${ticketDetails[0].ServiceRequestID}, ${ticketDetails[0].Name}.
    You can now start works.`;

    const staffID = ticketDetails[0].StaffID;

    let { data: staffDetails } = await supabase
      .from("StaffUsers")
      .select("*")
      .eq("StaffID", staffID);

    const emailParams = {
        to_email: toEmail, //staffDetails[0].StaffEmail,
        message: body,
      };
    console.log("I am here");
    console.log(emailParams);
    try {
      const response = await emailjs.send(
        ServiceID,
        Template,
        emailParams
      );
      console.log("Email sent successfully!", response);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }

  async QuotationRejectNotif(ticketID, rejectComments){
    emailjs.init(PublicKey);
    let { data: ticketDetails } = await supabase
      .from("Service Request")
      .select("*")
      .eq("ServiceRequestID", parseInt(ticketID));

    const body = `Tenant has rejected quotation for ticket ${ticketDetails[0].ServiceRequestID}, ${ticketDetails[0].Name}.
    Reason: ${rejectComments}.
    Please re-upload new quotation or contact tenant.`;

    const staffID = ticketDetails[0].StaffID;

    let { data: staffDetails } = await supabase
      .from("StaffUsers")
      .select("*")
      .eq("StaffID", staffID);

    const emailParams = {
        to_email: toEmail, //staffDetails[0].StaffEmail,
        message: body,
      };
    console.log("I am here");
    console.log(emailParams);
    try {
      const response = await emailjs.send(
        ServiceID,
        Template,
        emailParams
      );
      console.log("Email sent successfully!", response);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }

  async WorksRejectNotif(ticketID, rejectComments){
    emailjs.init(PublicKey);
    let { data: ticketDetails } = await supabase
      .from("Service Request")
      .select("*")
      .eq("ServiceRequestID", parseInt(ticketID));

    const body = `Tenant has rejected works for ticket ${ticketDetails[0].ServiceRequestID}, ${ticketDetails[0].Name}.
    Reason: ${rejectComments}.
    Please re-start works or contact tenant.`;

    const staffID = ticketDetails[0].StaffID;

    let { data: staffDetails } = await supabase
      .from("StaffUsers")
      .select("*")
      .eq("StaffID", staffID);

    const emailParams = {
        to_email: toEmail, //staffDetails[0].StaffEmail,
        message: body,
      };
    console.log("I am here");
    console.log(emailParams);
    try {
      const response = await emailjs.send(
        ServiceID,
        Template,
        emailParams
      );
      console.log("Email sent successfully!", response);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }

  async FeedbackSubmittedNotif(ticketID, rating, successComments){
    emailjs.init(PublicKey);
    let { data: ticketDetails } = await supabase
      .from("Service Request")
      .select("*")
      .eq("ServiceRequestID", parseInt(ticketID));

    const body = `Tenant has submitted feedback for ticket ${ticketDetails[0].ServiceRequestID}, ${ticketDetails[0].Name}.
    Rating: ${rating}
    Comments: ${successComments}
    Ticket has been successfully CLOSED.`;

    const staffID = ticketDetails[0].StaffID;

    let { data: staffDetails } = await supabase
      .from("StaffUsers")
      .select("*")
      .eq("StaffID", staffID);

    const supervisorID = ticketDetails[0].SupervisorID;

    let { data: supervisorDetails } = await supabase
      .from("SupervisorUsers")
      .select("*")
      .eq("SupervisorID", supervisorID);

    const emailParams = {
        to_email: toEmail, //[staffDetails[0].StaffEmail, supervisorDetails[0].SupervisorEmail],
        message: body,
      };
    console.log("I am here");
    console.log(emailParams);
    try {
      const response = await emailjs.send(
        ServiceID,
        Template,
        emailParams
      );
      console.log("Email sent successfully!", response);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }

  async TicketAssignNotif(ticketID, staffID){
    emailjs.init(PublicKey);
    let { data: ticketDetails } = await supabase
      .from("Service Request")
      .select("*")
      .eq("ServiceRequestID", parseInt(ticketID));

    const body = `A new ticket has been assigned to you
    Ticket ID: ${ticketDetails[0].ServiceRequestID}
    Request: ${ticketDetails[0].Name}
    Category: ${ticketDetails[0].Category}
    ${ticketDetails[0].Description}`;

    let { data: staffDetails } = await supabase
      .from("StaffUsers")
      .select("*")
      .eq("StaffID", staffID);

    const emailParams = {
        to_email: toEmail, //staffDetails[0].StaffEmail,
        message: body,
      };
    console.log("I am here");
    console.log(emailParams);
    try {
      const response = await emailjs.send(
        ServiceID,
        Template,
        emailParams
      );
      console.log("Email sent successfully!", response);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }

  async QuotationUploadNotif(ticketID){
    emailjs.init(PublicKey);
    let { data: ticketDetails } = await supabase
      .from("Service Request")
      .select("*")
      .eq("ServiceRequestID", parseInt(ticketID));

    const body = `Quotation has been uploaded by Staff for ${ticketDetails[0].ServiceRequestID}, ${ticketDetails[0].Name}.
    Your ticket is now ACTIVE.
    Please accept or reject the quotation after careful study.`;

    const tenantID = ticketDetails[0].TenantID;

    let { data: tenantDetails } = await supabase
      .from("TenantUsers")
      .select("*")
      .eq("TenantID", tenantID);

    const emailParams = {
        to_email: toEmail, //tenantDetails[0].TenantEmail,
        message: body,
      };
    console.log("I am here");
    console.log(emailParams);
    try {
      const response = await emailjs.send(
        ServiceID,
        Template,
        emailParams
      );
      console.log("Email sent successfully!", response);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }

  async WorksStartedNotif(ticketID){
    emailjs.init(PublicKey);
    let { data: ticketDetails } = await supabase
      .from("Service Request")
      .select("*")
      .eq("ServiceRequestID", parseInt(ticketID));

    const body = `Works have been started for ${ticketDetails[0].ServiceRequestID}, ${ticketDetails[0].Name}.
    Your ticket is now ACTIVE.`;

    const tenantID = ticketDetails[0].TenantID;

    let { data: tenantDetails } = await supabase
      .from("TenantUsers")
      .select("*")
      .eq("TenantID", tenantID);

    const emailParams = {
        to_email: toEmail, //tenantDetails[0].TenantEmail,
        message: body,
      };
    console.log("I am here");
    console.log(emailParams);
    try {
      const response = await emailjs.send(
        ServiceID,
        Template,
        emailParams
      );
      console.log("Email sent successfully!", response);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }

  async WorksEndedNotif(ticketID){
    emailjs.init(PublicKey);
    let { data: ticketDetails } = await supabase
      .from("Service Request")
      .select("*")
      .eq("ServiceRequestID", parseInt(ticketID));

    const body = `Works have ended for ${ticketDetails[0].ServiceRequestID}, ${ticketDetails[0].Name}.
    Please submit feedback if you are happy with the work done
    You can reject the works if you are not satisfied.`;

    const tenantID = ticketDetails[0].TenantID;

    let { data: tenantDetails } = await supabase
      .from("TenantUsers")
      .select("*")
      .eq("TenantID", tenantID);

    const emailParams = {
        to_email: toEmail, //tenantDetails[0].TenantEmail,
        message: body,
      };
    console.log("I am here");
    console.log(emailParams);
    try {
      const response = await emailjs.send(
        ServiceID,
        Template,
        emailParams
      );
      console.log("Email sent successfully!", response);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }

  async TicketRejectedNotif(ticketID, rejectComments){
    emailjs.init(PublicKey);
    let { data: ticketDetails } = await supabase
      .from("Service Request")
      .select("*")
      .eq("ServiceRequestID", parseInt(ticketID));

    const body = `Ticket ${ticketDetails[0].ServiceRequestID}, ${ticketDetails[0].Name} has been rejected by Supervisor.
    Reason: ${rejectComments}.`;

    const tenantID = ticketDetails[0].TenantID;

    let { data: tenantDetails } = await supabase
      .from("TenantUsers")
      .select("*")
      .eq("TenantID", tenantID);

    const emailParams = {
        to_email: toEmail, //tenantDetails[0].TenantEmail,
        message: body,
      };
    console.log(emailParams);
    try {
      const response = await emailjs.send(
        ServiceID,
        Template,
        emailParams
      );
      console.log("Email sent successfully!", response);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }

  async sendOTP(TypeUpper, UserID, body){
    const { data, error } = await supabase
      .from(`${TypeUpper}Users`)
      .select(`${TypeUpper}Email`)
      .eq(`${TypeUpper}ID`, UserID);

    if (error) {
      throw error;
    }

    const user = data[0];
    const emailID = user[`${TypeUpper}Email`];
    console.log(emailID);

    const emailParams = {
      to_email: toEmail, //emailID,
      message: body,
    };

    emailjs.init(PublicKey);

    try {
      const response = await emailjs.send(
        ServiceID,
        Template,
        emailParams
      );
      console.log("Email sent successfully!", response);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }



  
};

export default NotificationManager;

