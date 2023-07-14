import { useState, useEffect } from "react";
import TicketManager from "../../managers/ticketmanager";
import TicketDetails from "../../components/TicketDetails";
import { useParams } from "react-router-dom";

const ViewTicketSupervisor = () => {
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
      <p>Supervisor</p>
      {fetchError && <p>{fetchError}</p>}
      <div className="service-tickets">
        <div className="service-ticket-row">
          {serviceTicket && (
            <TicketDetails
              key={serviceTicket.ServiceRequestID}
              ticket={serviceTicket}
              portal="supervisor"
              status={serviceTicket.Status}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewTicketSupervisor;
//import React, { useState, useEffect } from 'react';
//import "./../../../src/styles/viewticket.css";
//import BasicTabs from '../../components/TicketTabs';
//
//class viewticket extends React.Component{
//
//    constructor(props){
//        super(props);
//        this.state = {
//        }
//      }
//
//    render(){
//        return(
//            <div>
//                <div className='viewtixh1'>
//                     <h1>View Tickets</h1>
//                 </div>
//                 <div className='Tabs'>
//                   <BasicTabs/>
//                 </div>
//             </div>
//         )
//     }
// }
