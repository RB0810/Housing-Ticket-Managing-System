import emailjs from "emailjs-com";
import supabase from "../config/supabaseClient";


class NotificationManager{
  async handleSendEmail(emailParams){
    emailjs.init("w8QvO03M79syyzy63");

    try {
      const response = await emailjs.send(
        "service_nklr1zv",
        "template_776mx6q",
        emailParams
      );
      console.log("Email sent successfully!", response);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  async sendMailtoSupervisorFromTenantID(tenantID, body){
    emailjs.init("w8QvO03M79syyzy63");
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
        to_email: supervisor[0].SupervisorEmail,
        message: body,
      };
    console.log("I am here");
    console.log(emailParams);
    try {
      const response = await emailjs.send(
        "service_nklr1zv",
        "template_776mx6q",
        emailParams
      );
      console.log("Email sent successfully!", response);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };
};

export default NotificationManager;

