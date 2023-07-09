import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mnfsjgaziftztwiarlys.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1uZnNqZ2F6aWZ0enR3aWFybHlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY4MjkwODgsImV4cCI6MjAwMjQwNTA4OH0.Mrvmdish7OlO5-m1WIZTNwVFUnEcF7aoHE53ZVwiOY8";

const supabase = createClient(supabaseUrl, supabaseKey);

class TicketManager {
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
   * @returns True if successful, False if unsuccessful
   */

  async updateTicket(ticketId, column_name, value) {
    const { data, error } = await supabase
      .from("Service Request")
      .update({ column_name: value })
      .eq("ServiceRequestID", ticketId)
      .select();

    if (error) {
      console.error("Error updating ticket:", error);
      return true;
    } else {
      console.log("Ticket updated successfully:", data);
      return false;
    }
  }

  /**
   * Updates Ticket entry in Supabase based on Ticket object's ID attribute
   * @param {int} - Ticket ID to get
   *
   * @returns JSON
   */

  async getTicket(ticketId) {
    const { data, error } = await supabase
      .from("Service Request")
      .select()
      .eq("ServiceRequestID", ticketId);

    if (error) {
      console.error("Error fetching ticket:", error);
    } else {
      console.log("Ticket fetched successfully:", data);
    }

    return data;
  }

  /**
   * Updates Ticket entry in Supabase based on Ticket object's ID attribute
   * @param {int} - Ticket ID to get
   *
   * @returns True if successful, False if unsuccessful
   */

  async deleteTicket(ticketId) {
    const { data, error } = await supabase
      .from("Service Request")
      .delete()
      .eq("ServiceRequestID", ticketId);

    if (error) {
      console.error("Error deleting ticket:", error);
      return false;
    } else {
      console.log("Ticket deleted successfully:", data);
      return true;
    }
  }

  /**
   * Updates Ticket entry in Supabase based on Ticket object's ID attribute
   *
   * @returns List od dictionaries if successful, else returns null
   */

  async getAllTickets() {
    let { data, error } = await supabase.from("Service Request").select("*");

    if (error) {
      console.error("Error getting all tickets:", error);
    } else {
      console.log("Tickets fetched successfully:", data);
    }

    return data;
  }

  /**
   * @param {int} - Tenant ID to get tickets of
   *
   * @returns List od dictionaries if successful, else returns null
   */

  async getTicketsByTenant(tenantId) {
    let { data, error } = await supabase
      .from("Service Request")
      .select("*")
      .eq("TenantID", tenantId);

    if (error) {
      console.error("Error getting all tickets by TenantID:", error);
    } else {
      console.log(
        `"Tickets of Tenant ID :${tenantId} fetched successfully:"`,
        data
      );
    }

    return data;
  }

  /**
   * @param {int} - Staff ID to get tickets of
   *
   * @returns List od dictionaries if successful, else returns null
   */
  async getTicketsByStaff(staffId) {
    let { data, error } = await supabase
      .from("Service Request")
      .select("*")
      .eq("StaffID", tenantId);

    if (error) {
      console.error("Error getting all tickets by StaffID:", error);
    } else {
      console.log(
        `"Tickets of Staff ID :${staffId} fetched successfully:"`,
        data
      );
    }

    return data;
  }

  /**
   * @param {int} - Supervisor ID to get tickets of
   *
   * @returns List od dictionaries if successful, else returns null
   */

  async getTicketsBySupervisor(supervisorId) {
    let { data, error } = await supabase
      .from("Service Request")
      .select("*")
      .eq("SupervisorID", tenantId);

    if (error) {
      console.error("Error getting all tickets by SupervisorID:", error);
    } else {
      console.log(
        `"Tickets of Supervisor ID :${supervisorId} fetched successfully:"`,
        data
      );
    }

    return data;
  }

  /**
   * @param {string} - Status to get tickets of
   *
   * @returns List od dictionaries if successful, else returns null
   */

  async getTicketsByStatus(status) {
    let { data, error } = await supabase
      .from("Service Request")
      .select("*")
      .eq("Status", status);

    if (error) {
      console.error("Error getting all tickets by status:", error);
    } else {
      console.log(`"Tickets of Status :${status} fetched successfully:"`, data);
    }

    return data;
  }

  /**
   * @param {string} - PARCStatus to get tickets of
   *
   * @returns List od dictionaries if successful, else returns null
   */

  async getTicketsByPARCStatus(PARCStatus) {
    let { data, error } = await supabase
      .from("Service Request")
      .select("*")
      .eq("PARCStatus", PARCStatus);

    if (error) {
      console.error("Error getting all tickets by PARCStatus:", error);
    } else {
      console.log(
        `"Tickets of PARCStatus :${PARCStatus} fetched successfully:"`,
        data
      );
    }

    return data;
  }

  /**
   * @param {string} - Category to get tickets of
   *
   * @returns List od dictionaries if successful, else returns null
   */

  async getTicketsByCategory(category) {
    let { data, error } = await supabase
      .from("Service Request")
      .select("*")
      .eq("Category", category);

    if (error) {
      console.error("Error getting all tickets by category:", error);
    } else {
      console.log(
        `"Tickets of Category :${category} fetched successfully:"`,
        data
      );
    }

    return data;
  }
}

export default new TicketManager();
