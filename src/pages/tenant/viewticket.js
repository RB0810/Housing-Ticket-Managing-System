import { useState, useParams, useEffect } from "react";
import TicketManager from "../../managers/TicketManager";
import TicketDetails from "../../components/TicketDetails";

const ViewTicket = () => {
  const ticketManager = new TicketManager();
  let { ServiceRequestID } = useParams();
  const [serviceTicket, setServiceTicket] = useState([]);
  const [fetchError, setFetchError] = useState([]);

  useEffect(() => {
    const getTicket = async () => {
      let data = await ticketManager.getTicket(ServiceRequestID);

      if (data != false) {
        console.log(data);
        setServiceTicket(data);
        setFetchError(null);
      } else if (data.length == 0) {
        console.log(data);
        setFetchError("This ticket is EMPTY!");
        setServiceTicket();
      } else {
        setFetchError("Error finding this ticket :(");
        setServiceTicket();
      }
    };

    getTicket();
  }, []);

  return (
    <div className="page tenantportal">
      <div className="tenant-portal-header">
        <p>Ticket ID</p>
        <p>Request</p>
        <p>Date</p>
        <p>Property</p>
        <p>Status</p>
      </div>
      {fetchError && <p>{fetchError}</p>}
      <div className="service-tickets">
        <div className="service-ticket-row">
          <TicketDetails
            key={serviceTicket.ServiceRequestID}
            ticket={serviceTicket}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewTicket;
