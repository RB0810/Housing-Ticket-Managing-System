/**
 * Ticket Object
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
  contructor(ticket) {
    this.id = ticket.ServiceRequestID;
    this.name = ticket.Name;
    this.tenantID = ticket.TenantID;
    this.submittedDateTime = ticket.SubmittedDateTime;
    this.category = ticket.Category;
    this.description = ticket.Description;
    this.PARCstatus = ticket.PARCstatus;
    this.supervisorID = ticket.SupervisorID;
    this.staffID = ticket.StaffID;
    this.contact = ticket.Contact;
    this.status = ticket.Status;
    this.quotationRequired = ticket.QuotationRequired;
    this.quotationAmount = ticket.QuotationAmount;
    this.quotationUploadedBy = ticket.QotationUploadedBy;
    this.quotationAccepted = ticket.QuotationAccepted;
    this.quotationAcceptanceDate = ticket.QuotationAcceptanceDate;
    this.quotationAttachmentPath = ticket.QuotationAttachmentPath;
    this.completionDateTime = ticket.CompletionDateTime;
    this.feedbackRating = ticket.FeedbackRating;
    this.feedbackComments = ticket.FeedbackComments;
  }

  constructor(
    name,
    tenantID,
    submitteddatetime,
    category,
    description,
    property,
    PARCstatus = "PENDING",
    status = "Awaiting Review"
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
    this.status = status;
    this.property = property;

    // Other attributes to be filled in later
    this.staffID = null;
    this.contact = null;
    this.quotationRequired = null;
    this.quotationAmount = null;
    this.quotationAccepted = null;
    this.quotationAcceptanceDate = null;
    this.quotationAttachmentPath = null;
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
      completionDateTime: this.completionDateTime,
      feedbackRating: this.feedbackRating,
      feedbackComments: this.feedbackComments,
    };
  }
}
