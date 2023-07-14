import { useState, useEffect } from "react";
import TicketManager from "../../managers/ticketmanager";
import AccountManager from "../../managers/accountmanager";
import TicketDetails from "../../components/TicketDetails";
import { useParams } from "react-router-dom";

const ViewTicketTenant = () => {
  const ticketManager = new TicketManager();
  const accountManager = new AccountManager();
  let { ServiceRequestID } = useParams();
  const [serviceTicket, setServiceTicket] = useState([]);
  const [staff, setStaff] = useState([]);
  const [fetchError, setFetchError] = useState([]);

  useEffect(() => {
    const getStaffAndTicket = async () => {
      let ticketData = await ticketManager.getTicket(
        parseInt(ServiceRequestID)
      );

      let staffData = await accountManager.getAssignedStaffDetails(
        ticketData[0].StaffID
      );

      if (ticketData !== false) {
        setServiceTicket(ticketData[0]);
        setStaff(staffData);
        setFetchError(null);
      } else if (ticketData.length === 0) {
        setFetchError("This ticket is EMPTY!");
        setServiceTicket();
      } else {
        setFetchError("Error finding this ticket :(");
        setServiceTicket();
      }
    };

    getStaffAndTicket();
  }, []);

  return (
    <div className="page tenantportal">
      <p>Tenant</p>
      {fetchError && <p>{fetchError}</p>}
      <div className="service-tickets">
        <div className="service-ticket-row">
          {serviceTicket && (
            <TicketDetails
              key={serviceTicket.ServiceRequestID}
              ticket={serviceTicket}
              staff={staff}
              portal="tenant"
              status={serviceTicket.Status}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewTicketTenant;
