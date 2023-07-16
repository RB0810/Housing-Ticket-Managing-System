import supabase from "../../config/supabaseClient";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/supervisorportal.css";

// components
import TicketCard from "../../components/TicketCard";

export default function SupervisorPortal() {
  const [serviceTickets, setServiceTickets] = useState([]);
  const [fetchError, setFetchError] = useState([]);
  let { PARCStatus, SupervisorID } = useParams();

  useEffect(() => {
    const getTickets = async () => {
      let { data, error } = await supabase.from("Service Request").select("*");
      if (error) {
        setFetchError(error.message);
        setServiceTickets(null);
        console.log(error);
      }

      if (data) {
        setServiceTickets(data);
        setFetchError(null);
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
              <TicketCard key={ticket.ServiceRequestID} ticket={ticket} userRole={"supervisor"} user={SupervisorID}/>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
