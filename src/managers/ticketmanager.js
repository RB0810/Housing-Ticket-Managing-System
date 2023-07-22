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

  // FEEDBACK
  /**
   * Updates Ticket entry in Supabase based on Ticket object's ID attribute
   * @TicketID {int} - Ticket ID to update feedback rating of
   * @Value {string} - Value to update
   *
   * @returns True if successful, False if unsuccessful
   */

  async updateFeedbackRating(ticketId, value) {
    const { data, error } = await supabase
      .from("Service Request")
      .update({ FeedbackRating: value })
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
   * @TicketID {int} - Ticket ID to update
   * @Comments {string} - Value to update
   *
   * @returns True if successful, False if unsuccessful
   */
  async updateFeedbackComments(ticketId, comments) {
    const { data, error } = await supabase
      .from("Service Request")
      .update({ FeedbackComments: comments })
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
   *
   * @returns List od dictionaries if successful, else returns false
   */

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

    for (let i = 0; i < data.length; i++) {
      if (data[i].StaffID != null) {
        let staffDetails = await supabase
          .from("StaffUsers")
          .select("*")
          .eq("StaffID", data[i].StaffID);

        data[i].staffDetails = staffDetails.data[0];
      }
    }

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

    for (let i = 0; i < data.length; i++) {
      if (data[i].StaffID != null) {
        let staffDetails = await supabase
          .from("StaffUsers")
          .select("*")
          .eq("StaffID", data[i].StaffID);

        data[i].staffDetails = staffDetails.data[0];
      }

      let tenantDetails = await supabase
        .from("TenantUsers")
        .select("*")
        .eq("TenantID", data[i].TenantID);

      data[i].tenantDetails = tenantDetails.data[0];
    }

    if (error) {
      console.error(
        "Error getting all tickets by PARCStatus and SupervisorID:",
        error
      );
      return false;
    } else {
      console.log(
        `"Tickets of PARCStatus :${PARCStatus} and SupervisorID :${supervisorID} fetched successfully:"`,
        data
      );
      return data;
    }

    return data;
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

    for (let i = 0; i < data.length; i++) {
      let tenantDetails = await supabase
        .from("TenantUsers")
        .select("*")
        .eq("TenantID", data[i].TenantID);

      data[i].tenantDetails = tenantDetails.data[0];
    }

    if (error) {
      console.error(
        "Error getting all tickets by PARCStatus and StaffID:",
        error
      );
      return false;
    } else {
      console.log(
        `"Tickets of PARCStatus :${PARCStatus} and StaffID :${staffID} fetched successfully:"`,
        data
      );
      return data;
    }
  }

  // ASSIGN
  /**
   * @TicketID {int} - Ticket ID
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

  /**
   * @TicketID {int} - Ticket ID
   *
   * @returns True if assigned already, else False, null if error
   */
  async assignTicket(ticketId, staffId) {
    const { data, error } = await supabase
      .from("Service Request")
      .update({ StaffID: staffId })
      .eq("ServiceRequestID", ticketId)
      .select();

    if (error) {
      console.error("Error assigning ticket:", error);
      return false;
    } else {
      console.log("Ticket assigned successfully:", data);
      return true;
    }
  }

  async closeTicket(ticketId) {
    const { data, error } = await supabase
      .from("Service Request")
      .update({ PARCStatus: "CLOSED" })
      .eq("ServiceRequestID", ticketId)
      .select();

    if (error) {
      console.error("Error closing ticket:", error);
      return false;
    } else {
      console.log("Ticket closed successfully:", data);
      return true;
    }
  }

  async rejectTicket(ticketId) {
    const { data, error } = await supabase
      .from("Service Request")
      .update({ Status: "Works Rejected" })
      .eq("ServiceRequestID", ticketId)
      .select();

    if (error) {
      console.error("Error rejecting ticket:", error);
      return false;
    } else {
      console.log("Ticket rejected successfully:", data);
      return true;
    }
  }

  /**
   * @TicketID {int} - Ticket ID
   * @column_name {str} - Column name to update
   * @value {int/str} - Value to update
   *
   * @returns True if assigned already, else False, null if error
   */
  async updateTicket(ticketId, column_name, value) {
    const { data, error } = await supabase
      .from("Service Request")
      .update({ [column_name]: value })
      .eq("ServiceRequestID", parseInt(ticketId))
      .select();

    if (error) {
      console.error("Error updating ticket:", error);
      return false;
    } else {
      console.log("Ticket updated successfully:", data);
      return true;
    }
  }

  async getTicketByColumn(ticketId, column_name) {
    const { data, error } = await supabase
      .from("Service Request")
      .select(column_name)
      .eq("ServiceRequestID", parseInt(ticketId));

    if (error) {
      console.error("Error getting ticket:", error);
      return false;
    } else {
      console.log("Ticket fetched successfully:", data);
    }

    return data[0][column_name];
  }
}
