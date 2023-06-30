import supabase from "../../config/supabaseClient";
import { useEffect, useState } from "react";
import React from 'react';

// components
import TicketCard from "../../components/TicketCard";

export default function LandlordPortal() {
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
            <button className="btn">Add Ticket</button>
            <button className="btn">Remove Ticket</button>
          </div>
        </div>
      )}
    </div>
  );
}
