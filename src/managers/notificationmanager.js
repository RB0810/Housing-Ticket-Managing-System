import supabase from "../config/supabaseClient";
import Notification from "./Notification";

class NotificationManager {
  constructor() {
    this.supabase = supabase;
    this.notification = new Notification();
  }

  startListening(tableName, email, emailParameters) {
    // Set up the database listener for INSERT, UPDATE, and DELETE events
    this.supabase
      .from(tableName)
      .on('INSERT', payload => {
        const newRecord = payload.new;
        const emailContent = this.generateEmailContent('New Record Added', newRecord, emailParameters);
        this.notification.sendMail(emailContent);
      })
      .on('UPDATE', payload => {
        const updatedRecord = payload.new;
        const emailContent = this.generateEmailContent('Record Updated', updatedRecord, emailParameters);
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
    const to = emailParameters.to || record.email;
    const subject = emailParameters.subject || `${action}: ${record.id}`;
    const text = emailParameters.text || `Record ID ${record.id} has been ${action.toLowerCase()}.`;

    return {
      to,
      subject,
      text
    };
  }

  async initializeListeners() {
    // Notify tenant when quotation is added
    const { data: tenants, error: tenantError } = await this.supabase
      .from('Tenants')
      .select('email');

    if (tenantError) {
      console.log('Error fetching tenant emails:', tenantError);
    } else {
      tenants.forEach(({ email }) => {
        this.startListening('Tickets', email, {
          to: email,
          subject: 'Quotation Added',
          validate: (record) => record.quotation_added === true
        });
      });
    }

    // Notify supervisor when ticket has been deleted
    const { data: supervisors, error: supervisorError } = await this.supabase
      .from('Supervisors')
      .select('email');

    if (supervisorError) {
      console.log('Error fetching supervisor emails:', supervisorError);
    } else {
      supervisors.forEach(({ email }) => {
        this.startListening('Tickets', email, {
          to: email,
          subject: 'Ticket Deleted',
          validate: (record) => record.is_deleted === true
        });
      });
    }

    // Notify tenant that ticket has been rejected
    tenants.forEach(({ email }) => {
      this.startListening('Tickets', email, {
        to: email,
        subject: 'Ticket Rejected',
        validate: (record) => record.status === 'rejected'
      });
    });

    // Notify tenant that status of ticket has been updated
    tenants.forEach(({ email }) => {
      this.startListening('Tickets', email, {
        to: email,
        subject: 'Ticket Status Update',
        validate: (record) => record.status !== 'pending'
      });
    });

    // Notify supervisor that new ticket has been created
    supervisors.forEach(({ email }) => {
      this.startListening('Tickets', email, {
        to: email,
        subject: 'New Ticket Created',
        validate: (record) => record.status === 'pending'
      });
    });

    // Notify staff that ticket has been assigned
    const { data: staff, error: staffError } = await this.supabase
      .from('Staff')
      .select('email');

    if (staffError) {
      console.log('Error fetching staff emails:', staffError);
    } else {
      staff.forEach(({ email }) => {
        this.startListening('Tickets', email, {
          to: email,
          subject: 'Ticket Assigned',
          validate: (record) => record.assigned_to === email
        });
      });
    }

    // Notify supervisor that quotation has been approved
    supervisors.forEach(({ email }) => {
      this.startListening('Tickets', email, {
        to: email,
        subject: 'Quotation Approved',
        validate: (record) => record.quotation_approved === true
      });
    });

    // Notify supervisor that tenant has submitted a feedback survey
    supervisors.forEach(({ email }) => {
      this.startListening('FeedbackSurveys', email, {
        to: email,
        subject: 'Feedback Survey Submitted',
        validate: (record) => record.submitted_by === 'tenant@example.com'
      });
    });
  }
}

module.exports = NotificationManager;
