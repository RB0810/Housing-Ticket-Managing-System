const TicketDetails = ({ ticket }) => {
  return (
    <div>
      <h2>Ticket Details</h2>
      <p>Name: {ticket.Name}</p>
      <p>Landlord ID: {ticket.LandlordID}</p>
      <p>Tenant ID: {ticket.TenantID}</p>
      <p>Contact: {ticket.Contact}</p>
      <p>Submitted Date Time: {ticket.SubmittedDateTime}</p>
      <p>Request Type: {ticket.RequestType}</p>
      <p>Request Description: {ticket.RequestDescription}</p>
      <p>PARC Status: {ticket.PARCStatus}</p>
      <p>Status: {ticket.Status}</p>
    </div>
  );
};

export default TicketDetails;
