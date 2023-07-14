import { useState, useEffect } from "react";
import TicketManager from "../../managers/ticketmanager";
import AccountManager from "../../managers/accountmanager";
import SupervisorTicketDetails from "../../components/SupervisorTicketDetails";
import { useParams } from "react-router-dom";
import { Accordion } from "@mui/material";

const ViewTicketSupervisor = () => {
  const accountManager = new AccountManager();
  const ticketManager = new TicketManager();
  let { ServiceRequestID } = useParams();
  const [serviceTicket, setServiceTicket] = useState([]);
  const [tenant, setTenant] = useState([]);
  const [staff, setStaff] = useState([]);
  const [fetchError, setFetchError] = useState([]);

  useEffect(() => {
    const getStaffAndTenantAndTicket = async () => {
      let ticketData = await ticketManager.getTicket(
        parseInt(ServiceRequestID)
      );

      let tenantData = await accountManager.getSubmittedByTenantDetails(
        ticketData[0].TenantID
      );

      let staffData = await accountManager.getAssignedStaffDetails(
        ticketData[0].StaffID
      );

      if (ticketData !== false) {
        setServiceTicket(ticketData[0]);
        setTenant(tenantData);
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

    getStaffAndTenantAndTicket();
  }, []);

  return (
    <div className="page tenantportal">
      <p>Supervisor</p>
      {fetchError && <p>{fetchError}</p>}
      <div className="service-tickets">
        <div className="service-ticket-row">
          {serviceTicket && (
            <SupervisorTicketDetails
              key={serviceTicket.ServiceRequestID}
              ticket={serviceTicket}
              portal="supervisor"
              tenant={tenant}
              staff={staff}
              status={serviceTicket.Status}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewTicketSupervisor;
