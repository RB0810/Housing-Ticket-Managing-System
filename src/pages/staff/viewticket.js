import { useState, useEffect } from "react";
import TicketManager from "../../managers/ticketmanager";
import AccountManager from "../../managers/accountmanager";
import StaffTicketDetails from "../../components/StaffTicketDetails";
import { useParams } from "react-router-dom";

const ViewTicketStaff = () => {
  const ticketManager = new TicketManager();
  const accountManager = new AccountManager();
  let { ServiceRequestID } = useParams();
  const [serviceTicket, setServiceTicket] = useState([]);
  const [tenant, setTenant] = useState([]);
  const [fetchError, setFetchError] = useState([]);

  useEffect(() => {
    const getTenantAndTicket = async () => {
      let ticketData = await ticketManager.getTicket(
        parseInt(ServiceRequestID)
      );

      let tenantData = await accountManager.getSubmittedByTenantDetails(
        ticketData[0].TenantID
      );

      if (ticketData !== false) {
        setServiceTicket(ticketData[0]);
        setTenant(tenantData);
        setFetchError(null);
      } else if (ticketData.length === 0) {
        setFetchError("This ticket is EMPTY!");
        setServiceTicket();
      } else {
        setFetchError("Error finding this ticket :(");
        setServiceTicket();
      }
    };

    getTenantAndTicket();
  }, []);

  return (
    <div className="page tenantportal">
      <p>Staff</p>
      {fetchError && <p>{fetchError}</p>}
      <div className="service-tickets">
        <div className="service-ticket-row">
          {serviceTicket && (
            <StaffTicketDetails
              key={serviceTicket.ServiceRequestID}
              ticket={serviceTicket}
              portal="staff"
              status={serviceTicket.Status}
              tenant={tenant}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewTicketStaff;
