/**
 * Creates Ticket object
 * @param {string} name - Name of the ticket (short summary).
 * @param {number} tenantID - Tenant ID that submitted ticket.
 * @param {number} submittedDateTime - Date and Time of Ticket submission
 * @param {number} category - Category of ticket - Plumbing, Electronics, Pests etc
 * @param {number} description - A description of the ticket
 * @param {number} PARCStatus - Pending/Active/Closed Status
 *
 * @returns {Ticket} - Ticket object that can be sent to or received from Supabase.
 */

export default class Ticket {
  constructor(
    name,
    tenantID,
    submitteddatetime,
    category,
    description,
    PARCstatus = "PENDING"
  ) {
    // ID will be from Supabase to be filled in when fetched
    this.id = null;

    // Attributes to be filled in by user
    this.name = name;
    this.tenantID = tenantID;
    this.submittedDateTime = submitteddatetime;
    this.category = category;
    this.description = description;
    this.PARCstatus = PARCstatus;
    this.supervisorID = null;

    // Other attributes to be filled in later
    this.staffID = null;
    this.contact = null;
    this.status = null;
    this.quotationRequired = null;
    this.quotationAmount = null;
    this.quotationUploadedBy = null;
    this.quotationAccepted = null;
    this.quotationAcceptanceDate = null;
    this.quotationAttachmentPath = null;
    this.completedBy = null;
    this.completionDateTime = null;
    this.feedbackRating = null;
    this.feedbackComments = null;
  }

  getTicketInfo() {
    return {
      id: this.id,
      name: this.name,
      tenantID: this.tenantID,
      submittedDateTime: this.submittedDateTime,
      category: this.category,
      description: this.description,
      PARCstatus: this.PARCstatus,
      supervisorID: this.supervisorID,
      staffID: this.staffID,
      contact: this.contact,
      status: this.status,
      quotationRequired: this.quotationRequired,
      quotationAmount: this.quotationAmount,
      quotationUploadedBy: this.quotationUploadedBy,
      quotationAccepted: this.quotationAccepted,
      quotationAcceptanceDate: this.quotationAcceptanceDate,
      quotationAttachmentPath: this.quotationAttachmentPath,
      completedBy: this.completedBy,
      completionDateTime: this.completionDateTime,
      feedbackRating: this.feedbackRating,
      feedbackComments: this.feedbackComments,
    };
  }
}

