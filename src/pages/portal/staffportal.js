import supabase from "../../config/supabaseClient";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TicketManager from "../../managers/ticketmanager";

// components
import TicketCard from "../../components/TicketCard";

export default function StaffPortal() {
  const ticketManager = new TicketManager();
  const [serviceTickets, setServiceTickets] = useState([]);
  const [fetchError, setFetchError] = useState([]);
  let { StaffID, PARCStatus } = useParams();

  useEffect(() => {
    const getTickets = async () => {
      let data = await ticketManager.getTicketsByPARCStatusForStaffID(
        PARCStatus.toUpperCase(),
        parseInt(StaffID)
      );

      if (data != false) {
        console.log(data);
        setServiceTickets(data);
        setFetchError(null);
      } else if (data.length == 0) {
        console.log(data);
        setFetchError("Empty!");
        setServiceTickets();
      } else {
        setFetchError("Error!");
        setServiceTickets();
      }
    };
    getTickets();
  }, []);

  return (
    <div className="page landlordportal">
      {fetchError && <p>{fetchError}</p>}
      {serviceTickets && (
        <div className="service-tickets">
          <div className="service-ticket-row">
            {serviceTickets.map((ticket) => (
              <TicketCard
                key={ticket.ServiceRequestID}
                ticket={ticket}
                user={StaffID}
                userRole={"staff"}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
