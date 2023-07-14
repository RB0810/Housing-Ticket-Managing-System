<<<<<<< HEAD
import supabase from "../../config/supabaseClient";
import { useEffect, useState } from "react";

// components
import TicketCard from "../../components/TicketCard";

export default function SupervisorPortal() {
  const [serviceTickets, setServiceTickets] = useState([]);
  const [fetchError, setFetchError] = useState([]);

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
              <TicketCard key={ticket.ServiceRequestID} ticket={ticket} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
=======
import supabase from "../../config/supabaseClient";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
>>>>>>> a68d74b2e817c7184e70c9d65d952e983e357804
