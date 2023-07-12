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
    // Fetch staff user emails from the 'StaffUsers' table
    const { data: staff, error } = await this.supabase
      .from('StaffUsers')
      .select('StaffEmail');

    if (error) {
      console.log('Error fetching user emails:', error);
      return;
    }

    staff.forEach(({ email }) => {
      const tables = [
        { tableName: 'Service Requests', emailParameters: { to: email, subject: 'Ticket Update' } },
        // Add more tables and their corresponding email parameters as needed
      ];

      tables.forEach(({ tableName, emailParameters }) => {
        this.startListening(tableName, email, emailParameters);
      });
    });

    //fetch supervisor user emails from the 'SupervisorUsers' table
    const { data: supervisor, error: supervisorError } = await this.supabase
    .from('SupervisorUsers')
    .select('SupervisorEmail');
    if (supervisorError) {
      console.log('Error fetching user emails:', supervisorError);
      return;
    }

    supervisor.forEach(({ email }) => {
      const tables = [
        { tableName: 'Service Requests', emailParameters: { to: email, subject: 'Ticket Update' } },
        // Add more tables and their corresponding email parameters as needed
      ];

      tables.forEach(({ tableName, emailParameters }) => {
        this.startListening(tableName, email, emailParameters);
      });
    });

    //fetch tenant user emails from the TenantUsers table
    const { data: tenant, error: tenantError } = await this.supabase
    .from('TenantUsers')
    .select('TenantEmail');
    if (tenantError) {
      console.log('Error fetching user emails:', tenantError);
      return;
      }

    tenant.forEach(({ email }) => {
      const tables = [
        { tableName: 'Service Requests', emailParameters: { to: email, subject: 'Ticket Update' } },
        // Add more tables and their corresponding email parameters as needed
      ];

      tables.forEach(({ tableName, emailParameters }) => {
        this.startListening(tableName, email, emailParameters);
      });
    });
    
    //fetch admin user emails from the AdminUsers table
    const { data: admin, error: adminError } = await this.supabase
    .from('AdminUsers')
    .select('AdminEmail');
    if (adminError) {
      console.log('Error fetching user emails:', adminError);
      return;
      }

    admin.forEach(({ email }) => {
      const tables = [
        { tableName: 'Service Requests', emailParameters: { to: email, subject: 'Ticket Update' } },
        // Add more tables and their corresponding email parameters as needed
      ];

      tables.forEach(({ tableName, emailParameters }) => {
        this.startListening(tableName, email, emailParameters);
      });
    });

  }
  
}

module.exports = NotificationManager;
