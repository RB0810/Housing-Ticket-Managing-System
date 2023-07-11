import supabase from "../config/supabaseClient";
import Notification from "../Notification";

class NotificationManager {
  constructor() {
    this.supabase = supabase;
    this.notification = new Notification();
  }

  startListening(tableName, emailParameters) {
    // Set up the database listener for INSERT, UPDATE, and DELETE events
    this.tableName
      .from(this.ServiceRequest)
      .on('INSERT', payload => {
        const newRecord = payload.new;
        const emailContent = this.generateEmailContent('New Record Added', newRecord, emailParameters);
        this.notification.sendMail(emailContent);
      })
      .on('UPDATE', payload => {
        const updatedRecord = payload.new;
        const emailContent = this.generateEmailContent('New Record Updated', updatedRecord, emailParameters);
        this.notification.sendMail(emailContent);
      })
      .on('DELETE', payload => {
        const deletedRecord = payload.old;
        const emailContent = this.generateEmailContent('Record Deleted', deletedRecord, emailParameters);
        this.notification.sendMail(emailContent);
      })
      .subscribe();
  }

  generateEmailContent(action, record, emailParameters) {
    // Replace with your own logic to generate the email content based on the action and record
    const to = emailParameters.to || record.email;
    const subject = emailParameters.subject || `${action}: ${record.id}`;
    const text = emailParameters.text || `Record ID ${record.id} has been ${action.toLowerCase()}.`;


    return {
      to,
      subject,
      text
    };
  }

  initializeListeners() {
    // Call startListening with appropriate parameters for each table
    this.startListening('Service Requests', { to: 'email1@example.com', subject: 'Table 1 Update' });
    this.startListening('table2', { text: 'A record has been modified in Table 2' });
    // Add more startListening calls for additional tables as needed with their respective emailParameters
  }
}

module.exports = NotificationManager;
