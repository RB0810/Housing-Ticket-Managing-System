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

  const renderInfoBasedOnRole = () => {
    if (userRole === "tenant") {
      return (
        <div className="ticket-card">
          <p className="ticket-name">{ticket.Name}</p>
          <p className="ticket-SubmittedBy">Tenant ID: {ticket.RequestType}</p>
          <p className="ticket-Unit">{ticket.Property}</p>
          <p className="ticket-Status">{ticket.Status}</p>
          <p className="ticket-AssignedTo">{ticket.StaffID}</p>
          <p className="ticket-SubmittedDateTime">
            {new Date(ticket.SubmittedDateTime).toLocaleDateString}
          </p>
          <Link to={`${getViewTicketsRoute()}/${user}/${ticket.ServiceRequestID}`}>
            <button className="btn" onClick={handleViewTicket}>
              View Ticket
            </button>
          </Link>
        </div>
      );
    } else if (userRole === "supervisor") {
      return (
        <div>
          <p>Supervisor-specific content</p>
        </div>
      );
    } else if (userRole === "staff") {
      return (
        <div>
          <p>Staff-specific content</p>
        </div>
      );
    }
    return null;
  };


  return (
    <div>
      {renderInfoBasedOnRole()}
    </div>
    
  );
};

export default TicketCard;
