import supabase from "../config/supabaseClient";

export default class TicketManager {
  /**
   * Creates Ticket object
   * @param {Ticket} - Ticket Object to be instantiated 
   *
   * @returns None - Ticket object is now loaded to Database.
   */

  async addTicket(ticket) {
    const { data, error } = await supabase
      .from("Service Request")
      .insert([
        {
          Name: ticket.Name,
          TenantID: ticket.tenantID,
          SubmittedDateTime: ticket.submittedDateTime,
          Category: ticket.category,
          Description: ticket.description,
          PARCStatus: ticket.PARCstatus,
          SupervisorID: ticket.supervisorID,
          StaffID: ticket.staffID,
          Contact: ticket.contact,
          Status: ticket.status,
          QuotationRequired: ticket.quotationRequired,
          QuotationAmount: ticket.quotationAmount,
          QuotationUploadedBy: ticket.quotationUploadedBy,
          QuotationAcceptedByTenant: ticket.quotationAccepted,
          QuotationAcceptanceDate: ticket.quotationAcceptanceDate,
          QuotationAttachmentPath: ticket.quotationAttachmentPath,
          CompletedBy: ticket.completedBy,
          CompletedDateTime: ticket.completionDateTime,
          FeedbackRating: ticket.feedbackRating,
          FeedbackComments: ticket.feedbackComments,
        },
      ])
      .select();

    if (error) {
      console.error("Error adding ticket:", error);
    } else {
      console.log("Ticket added successfully:", data);
    }
  }

  /**
   * Updates Ticket entry in Supabase based on Ticket object's ID attribute
   * @param {int} - Ticket ID to update
   * @param {string} - Column name to update
   * @param {string} - Value to update
   *
   * @returns None
   */

  async updateTicket(ticketId, column_name, value) {
    const { data, error } = await supabase
      .from("Service Request")
      .update({ column_name: value })
      .eq("ServiceRequestID", ticketId)
      .select();

    if (error) {
      console.error("Error updating ticket:", error);
    } else {
      console.log("Ticket updated successfully:", data);
    }
  }

  async getTicket(ticketId) {
    const { data, error } = await supabase
      .from("Service Request")
      .select()
      .eq("id", ticketId);

    if (error) {
      console.error("Error fetching ticket:", error);
    } else {
      console.log("Ticket fetched successfully:", data);
    }
  }

  async deleteTicket(ticketId) {
    const { data, error } = await this.supabase
      .from("Service Request")
      .delete()
      .eq("id", ticketId);

    if (error) {
      console.error("Error deleting ticket:", error);
    } else {
      console.log("Ticket deleted successfully:", data);
    }
  }

  async getAllTickets() {}

  async getTicketsByTenant(tenantId) {}

  async getTicketsByStaff(staffId) {}

  async getTicketsBySupervisor(supervisorId) {}

  async getTicketsByStatus(status) {}

  async getTicketsByPARCStatus(PARCStatus) {}
}

// Component Testing Code and Use Cases
if (require.main === module) {
  // This code will only run if the file is the main module
  TicketManager.addTicket;
}
