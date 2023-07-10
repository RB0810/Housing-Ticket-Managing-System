import { Link } from "react-router-dom";

const TicketCard = ({ ticket }) => {
  const handleViewTicket = () => {
    console.log(ticket.ServiceRequestID);
  };

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
        <button className="btn" onClick={handleViewTicket}>
          View Ticket
        </button>
      </Link>
    </div>
  );
};

export default TicketCard;
