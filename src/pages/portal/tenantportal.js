import { useEffect, useState } from "react";
import { Routes, Route, useParams, Link } from "react-router-dom";
import TicketManager from "../../managers/ticketmanager";
import "../../styles/ticketportal.css";

export default function TenantPortal() {
  const ticketManager = new TicketManager();
  let { PARCStatus, TenantID } = useParams();
  const [serviceTickets, setServiceTickets] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const getTickets = async () => {
      let data = await ticketManager.getTicketsByPARCStatusForTenantID(
        PARCStatus.toUpperCase(),
        parseInt(TenantID)
      );

      if (data !== false) {
        console.log(data);
        setServiceTickets(data);
        setFetchError(null);
      } else {
        setFetchError("Error!");
        setServiceTickets([]);
      }
    };
    getTickets();
  }, []);

  const getViewTicketsRoute = () => {
    return "/tenantportal/ticket";
  };

  return (
    <div className="page tenantportal">
      <table className="ticket-portal-table">
        <thead>
          <tr className="table-row">
            <th className="header-cell text-center">S No.</th>
            <th className="header-cell text-center">Request</th>
            <th className="header-cell text-center">Category</th>
            <th className="header-cell text-center">Unit</th>
            <th className="header-cell text-center">Status</th>
            <th className="header-cell text-center">Submitted Date</th>
            <th className="header-cell text-center">Assigned To</th>
            <th className="header-cell text-center"></th>
          </tr>
        </thead>
        <tbody>
          {fetchError ? (
            <tr>
              <td colSpan="8" className="text-center">{fetchError}</td>
            </tr>
          ) : serviceTickets.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center">Empty!</td>
            </tr>
          ) : (
            serviceTickets.map((ticket, index) => (
              <tr key={ticket.ServiceRequestID} className="table-row">
                <td className="text-center">{index + 1}</td>
                <td className="text-center">{ticket.Name}</td>
                <td className="text-center">{ticket.Category}</td>
                <td className="text-center">{ticket.Property}</td>
                <td className="text-center">{ticket.Status}</td>
                <td className="text-center">{new Date(ticket.SubmittedDateTime).toLocaleDateString()}</td>
                <td className="text-center">{ticket.StaffID}</td>
                <td className="text-center">
                  <Link to={`${getViewTicketsRoute()}/${TenantID}/${ticket.ServiceRequestID}`}>
                    <button className="btn">
                      View Ticket
                    </button>
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
