<<<<<<< HEAD
import supabase from "../config/supabaseClient";
import { useEffect, useState } from "react";

class TicketManager {
  constructor() {
    this.supabase = supabase;
  }

  async addTicket(ticket) {
    const { data, error } = await this.supabase
      .from("Service Request")
      .insert(ticket);

    if (error) {
      console.error("Error adding ticket:", error);
    } else {
      console.log("Ticket added successfully:", data);
    }
  }

  async updateTicket(ticket) {}

  async deleteTicket(ticketId) {
    const { data, error } = await this.supabase
      .from("tickets")
      .delete()
      .eq("id", ticketId);

    if (error) {
      console.error("Error deleting ticket:", error);
    } else {
      console.log("Ticket deleted successfully:", data);
    }
  }
}
=======
import supabase from "../config/supabaseClient";

export default class TicketManager {
  /**
   * Creates Ticket object
   * @Ticket {Ticket} - Ticket Object to be instantiated
   *
   * @returns True - Ticket object is now loaded to Database, else False.
   */

  async addTicket(ticket) {
    // Find Supervisor ID for that TenantID in the ticket
    let { data: supervisorID, error } = await supabase
      .from("TenantUsers")
      .select("UnderSupervisor")
      .eq("TenantID", ticket.tenantID);

    supervisorID = supervisorID[0].UnderSupervisor;

    if (error) {
      console.error(
        `"Error getting SupervisorID from TenantID ${ticket.tenantID}"`,
        error
      );
      return false;
    } else {
      console.log(
        `"Found SupervisorID ${supervisorID} from TenantID ${ticket.tenantID}"`
      );
      ticket.supervisorID = supervisorID;
    }

    // console.log(data1);
    const { data2: serviceTicket, error2 } = await supabase
      .from("Service Request")
      .insert([
        {
          Name: ticket.name,
          TenantID: ticket.tenantID,
          SubmittedDateTime: ticket.submittedDateTime,
          Category: ticket.category,
          Description: ticket.description,
          PARCStatus: ticket.PARCstatus,
          SupervisorID: ticket.supervisorID,
          StaffID: ticket.staffID,
          Status: ticket.status,
          Property: ticket.property,
          QuotationRequired: ticket.quotationRequired,
          QuotationAmount: ticket.quotationAmount,
          QuotationAcceptedByTenant: ticket.quotationAccepted,
          QuotationAcceptanceDate: ticket.quotationAcceptanceDate,
          QuotationAttachmentPath: ticket.quotationAttachmentPath,
          CompletedDateTime: ticket.completionDateTime,
          FeedbackRating: ticket.feedbackRating,
          FeedbackComments: ticket.feedbackComments,
        },
      ])
      .select();

    if (error2) {
      console.error("Error adding ticket:", error2);
      return false;
    } else {
      console.log("Ticket added successfully:", serviceTicket);
      return true;
    }
  }

  /**
   * Updates Ticket entry in Supabase based on Ticket object's ID attribute
   * @TicketID {int} - Ticket ID to update
   * @ColumnName {string} - Column name to update
   * @Value {string} - Value to update
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
      return false;
    } else {
      console.log("Ticket updated successfully:", data);
      return true;
    }
  }

  /**
   * Updates Ticket entry in Supabase based on Ticket object's ID attribute
   * @TicketID {int} - Ticket ID to get
   *
   * @returns JSON of ticket, else return false if error
   */

  async getTicket(ticketId) {
    const { data, error } = await supabase
      .from("Service Request")
      .select()
      .eq("ServiceRequestID", ticketId);

    if (error) {
      console.error("Error fetching ticket:", error);
      return false;
    } else {
      console.log("Ticket fetched successfully:", data);
    }

    return data;
  }

  /**
   * Updates Ticket entry in Supabase based on Ticket object's ID attribute
   * @TicketID {int} - Ticket ID to get
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
   * @returns List od dictionaries if successful, else returns false
   */

  async getAllTickets() {
    let { data, error } = await supabase.from("Service Request").select("*");

    if (error) {
      console.error("Error getting all tickets:", error);
      return false;
    } else {
      console.log("Tickets fetched successfully:", data);
    }

    return data;
  }

  /**
   * @param {int} - Tenant ID to get tickets of
   *
   * @returns List of dictionaries if successful, else returns false
   */

  async getTicketsByTenant(tenantId) {
    let { data, error } = await supabase
      .from("Service Request")
      .select("*")
      .eq("TenantID", tenantId);

    if (error) {
      console.error("Error getting all tickets by TenantID:", error);
      return false;
    } else {
      console.log(
        `"Tickets of Tenant ID :${tenantId} fetched successfully:"`,
        data
      );
    }

    return data;
  }

  /**
   * @StaffID {int} - Staff ID to get tickets of
   *
   * @returns List of dictionaries if successful, else returns false
   */
  async getTicketsByStaff(staffId) {
    let { data, error } = await supabase
      .from("Service Request")
      .select("*")
      .eq("StaffID", staffId);

    if (error) {
      console.error("Error getting all tickets by StaffID:", error);
      return false;
    } else {
      console.log(
        `"Tickets of Staff ID :${staffId} fetched successfully:"`,
        data
      );
    }

    return data;
  }

  /**
   * @SupervisorID {int} - Supervisor ID to get tickets of
   *
   * @returns List od dictionaries if successful, else returns false
   */

  async getTicketsBySupervisor(supervisorId) {
    let { data, error } = await supabase
      .from("Service Request")
      .select("*")
      .eq("SupervisorID", supervisorId);

    if (error) {
      console.error("Error getting all tickets by SupervisorID:", error);
      return false;
    } else {
      console.log(
        `"Tickets of Supervisor ID :${supervisorId} fetched successfully:"`,
        data
      );
    }

    return data;
  }

  /**
   * @Status {string} - Status to get tickets of
   *
   * @returns List od dictionaries if successful, else returns false
   */

  async getTicketsByStatus(status) {
    let { data, error } = await supabase
      .from("Service Request")
      .select("*")
      .eq("Status", status);

    if (error) {
      console.error("Error getting all tickets by status:", error);
      return false;
    } else {
      console.log(`"Tickets of Status :${status} fetched successfully:"`, data);
    }

    return data;
  }

  /**
   * @PARCStatus {string} - PARCStatus to get tickets of
   *
   * @returns List of dictionaries if successful, else returns false
   */

  async getTicketsByPARCStatus(PARCStatus) {
    let { data, error } = await supabase
      .from("Service Request")
      .select("*")
      .eq("PARCStatus", PARCStatus);

    if (error) {
      console.error("Error getting all tickets by PARCStatus:", error);
      return false;
    } else {
      console.log(
        `"Tickets of PARCStatus :${PARCStatus} fetched successfully:"`,
        data
      );
    }

    return data;
  }

  /**
   * @Category {string} - Category to get tickets of
   *
   * @returns List od dictionaries if successful, else returns false
   */

  async getTicketsByCategory(category) {
    let { data, error } = await supabase
      .from("Service Request")
      .select("*")
      .eq("Category", category);

    if (error) {
      console.error("Error getting all tickets by category:", error);
      return false;
    } else {
      console.log(
        `"Tickets of Category :${category} fetched successfully:"`,
        data
      );
    }

    return data;
  }

  /**
   * @PARCStatus {string} - PARCStatus to get tickets of
   * @TenantID {string} - TenantID to get tickets of
   *
   * @returns List of dictionaries if successful, else returns false
   */

  async getTicketsByPARCStatusForTenantID(PARCStatus, tenantID) {
    let { data, error } = await supabase
      .from("Service Request")
      .select("*")
      .eq("PARCStatus", PARCStatus)
      .eq("TenantID", tenantID);

    if (error) {
      console.error(
        "Error getting all tickets by PARCStatus and TenantID:",
        error
      );
      return false;
    } else {
      console.log(
        `"Tickets of PARCStatus :${PARCStatus} and TenantID :${tenantID} fetched successfully:"`,
        data
      );
    }

    return data;
  }

  /**
   * @PARCStatus {string} - PARCStatus to get tickets of
   * @SupervisorID {string} - SupervisorID to get tickets of
   *
   * @returns List of dictionaries if successful, else returns false
   */

  async getTicketsByPARCStatusForSupervisorID(PARCStatus, supervisorID) {
    let { data, error } = await supabase
      .from("Service Request")
      .select("*")
      .eq("PARCStatus", PARCStatus)
      .eq("SupervisorID", supervisorID);

    if (error) {
      console.error(
        "Error getting all tickets by PARCStatus and SupervisorID:",
        error
      );
      return false;
    } else {
      console.log(
        `"Tickets of PARCStatus :${PARCStatus} and TenantID :${supervisorID} fetched successfully:"`,
        data
      );
    }
  }

  /**
   * @PARCStatus {string} - PARCStatus to get tickets of
   * @SupervisorID {string} - StaffID to get tickets of
   *
   * @returns List of dictionaries if successful, else returns false
   */

  async getTicketsByPARCStatusForStaffID(PARCStatus, staffID) {
    let { data, error } = await supabase
      .from("Service Request")
      .select("*")
      .eq("PARCStatus", PARCStatus)
      .eq("StaffID", staffID);

    if (error) {
      console.error(
        "Error getting all tickets by PARCStatus and StaffID:",
        error
      );
      return false;
    } else {
      console.log(
        `"Tickets of PARCStatus :${PARCStatus} and TenantID :${staffID} fetched successfully:"`,
        data
      );
    }
  }

  // ASSIGN
  /**
   * @TicketID {int} - PARCStatus to get tickets of
   *
   * @returns True if assigned already, else False, null if error
   */
  async isTicketAssigned(ticketId) {
    let { data, error } = await supabase
      .from("Service Request")
      .select("StaffID")
      .eq("ServiceRequestID", ticketId);

    if (error) {
      console.error("Error getting StaffID of ticket:", error);
      return null;
    } else {
      console.log(
        `"StaffID of ticket :${ticketId} fetched successfully:"`,
        data
      );
    }

    return data[0].StaffID == null;
  }
}
>>>>>>> a68d74b2e817c7184e70c9d65d952e983e357804
