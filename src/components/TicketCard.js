<<<<<<< HEAD
import { Link } from "react-router-dom";

const TicketCard = ({ ticket }) => {
  return (
    <div className="ticket-card">
      <p>{ticket.Name}</p>
      <p>{ticket.LandlordID}</p>
      <p>{ticket.TenantID}</p>
      <p>{ticket.Contact}</p>
      <p>{ticket.SubmittedDateTime}</p>
      <p>{ticket.RequestType}</p>
      <p>{ticket.RequestDescription}</p>
      <p>{ticket.PARCStatus}</p>
      <p>{ticket.Status}</p>
      <Link to={`/ticket/${ticket.ServiceRequestID}`}>
        <button className="btn">View Ticket</button>
      </Link>
    </div>
  );
};

export default TicketCard;
=======
import { Link } from "react-router-dom";
import "../styles/TicketCard.css";

const TicketCard = ({ ticket, userRole, user }) => {
  const handleViewTicket = () => {
    console.log(ticket.ServiceRequestID);
  };

  const getViewTicketsRoute = () => {
    if (userRole === "tenant") {
      return "/tenantportal/ticket";
    } else if (userRole === "supervisor") {
      return "/supervisorportal/ticket";
    } else if (userRole === "staff") {
      return "/staffportal/ticket";
    }
    // Default route if user role is not recognized
    return "/ticket";
  };
  return (
    <div className="ticket-card">
      <p className="ticket-name">{ticket.Name}</p>
      <p className="ticket-SubmittedBy">Tenant ID: {ticket.TenantID}</p>
      <p className="ticket-AssignedTo">{ticket.StaffID}</p>
      <p className="ticket-SubmittedDateTime">
        {new Date(ticket.SubmittedDateTime).toLocaleDateString}
      </p>
      <p className="ticket-RequestType">{ticket.RequestType}</p>
      <p className="ticket-PARCStatus">{ticket.PARCStatus}</p>
      <p className="ticket-Status">{ticket.Status}</p>
      <Link to={`${getViewTicketsRoute()}/${user}/${ticket.ServiceRequestID}`}>
        <button className="btn" onClick={handleViewTicket}>
          View Ticket
        </button>
      </Link>
    </div>
  );
};

export default TicketCard;
>>>>>>> a68d74b2e817c7184e70c9d65d952e983e357804
