import { Link } from "react-router-dom";
import "../styles/TicketCard.css";

const TicketCard = ({ ticket }) => {
  const handleViewTicket = () => {
    console.log(ticket.ServiceRequestID);
  };

  return (
    <div className="ticket-card">
      <p className="ticket-name">{ticket.Name}</p>
      <p className="ticket-LandlordID">{ticket.LandlordID}</p>
      <p className="ticket-TenantID">{ticket.TenantID}</p>
      <p className="ticket-Contact">{ticket.Contact}</p>
      <p className="ticket-SubmittedDateTime">{ticket.SubmittedDateTime}</p>
      <p className="ticket-RequestType">{ticket.RequestType}</p>
      <p className="ticket-RequestDescription">{ticket.RequestDescription}</p>
      <p className="ticket-PARCStatus">{ticket.PARCStatus}</p>
      <p className="ticket-Status">{ticket.Status}</p>
      <Link to={`/ticket/${ticket.ServiceRequestID}`}>
        <button className="btn" onClick={handleViewTicket}>
          View Ticket
        </button>
      </Link>
    </div>
  );
};

export default TicketCard;
