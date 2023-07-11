import { useState, useEffect } from "react";
import TicketManager from "../../managers/TicketManager";
import TicketDetails from "../../components/TicketDetails";
import { useParams } from "react-router-dom";

const ViewTicket = () => {
  const ticketManager = new TicketManager();
  let { ServiceRequestID } = useParams();
  const [serviceTicket, setServiceTicket] = useState([]);
  const [fetchError, setFetchError] = useState([]);

  useEffect(() => {
    const getTicket = async () => {
      let new_data = await ticketManager.getTicketsByPARCStatusForTenantID();

      let data = await ticketManager.getTicket(parseInt(ServiceRequestID));
      console.log("Ticket gote!");

      if (data != false) {
        setServiceTicket(data[0]);
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
          {serviceTicket && (
            <TicketDetails
              key={serviceTicket.ServiceRequestID}
              ticket={serviceTicket}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewTicket;
//import React, { useState, useEffect } from 'react';
//import "./../../../src/styles/viewticket.css";
//import BasicTabs from '../../components/TicketTabs';

//class viewticket extends React.Component{

    //constructor(props){
        //super(props);
        //this.state = {
        //}
      //}

    //render(){
        //return(
            //<div>
                //<div className='viewtixh1'>
//                     <h1>View Tickets</h1>
//                 </div>
//                 <div className='Tabs'>
//                   <BasicTabs/>
//                 </div>
//             </div>
//         )
//     }
// }

export default viewticket;
