import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import TicketManager from "../../managers/ticketmanager";
import "../../styles/ticketportal.css";

const TenantPortal = () => {
  const ticketManager = new TicketManager();
  const { PARCStatus, TenantID } = useParams();
  const [serviceTickets, setServiceTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [requestFilter, setRequestFilter] = useState("");
  const [assignedToFilter, setAssignedToFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [dateSortOrder, setDateSortOrder] = useState("");
  const [isCategoryFilterOpen, setIsCategoryFilterOpen] = useState(false);
  const [isStatusFilterOpen, setIsStatusFilterOpen] = useState(false);
  const [isRequestFilterOpen, setIsRequestFilterOpen] = useState(false);
  const [isAssignedToFilterOpen, setIsAssignedToFilterOpen] = useState(false);
  const [isDateFilterOpen, setIsDateFilterOpen] = useState(false);

  useEffect(() => {
    getTickets();
  }, [PARCStatus, TenantID]);

  const getTickets = async () => {
    try {
      let data = await ticketManager.getTicketsByPARCStatusForTenantID(
        PARCStatus.toUpperCase(),
        parseInt(TenantID)
      );

      console.log(data);
      setServiceTickets(data);
      setFetchError(null);
    } catch (error) {
      console.error("Error fetching tickets:", error);
      setFetchError("Error!");
      setServiceTickets([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getViewTicketsRoute = () => {
    return "/tenantportal/ticket";
  };

  const isDateInRange = (submittedDate) => {
    if (dateFilter === "") {
      return true;
    }

    const currentDate = new Date(submittedDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (dateFilter === "newest") {
      return currentDate >= today;
    } else if (dateFilter === "oldest") {
      return currentDate < today;
    }

    return true;
  };

  const filteredTickets = serviceTickets.filter((ticket) => {
    if (categoryFilter && ticket.Category !== categoryFilter) {
      return false;
    }
    if (statusFilter && ticket.Status !== statusFilter) {
      return false;
    }
    if (requestFilter && !ticket.Name.toLowerCase().includes(requestFilter.toLowerCase())) {
      return false;
    }
    if (assignedToFilter && ticket.staffDetails && !ticket.staffDetails.StaffName.toLowerCase().includes(assignedToFilter.toLowerCase())) {
      return false;
    }
    return true;
  }).sort((a, b) => {
    if (dateFilter === "newest") {
      return new Date(b.SubmittedDateTime) - new Date(a.SubmittedDateTime);
    } else if (dateFilter === "oldest") {
      return new Date(a.SubmittedDateTime) - new Date(b.SubmittedDateTime);
    }
    return 0;
  });
  

  const removeFilters = () => {
    setCategoryFilter("");
    setIsCategoryFilterOpen(false);
    setStatusFilter("");
    setIsStatusFilterOpen(false);
    setRequestFilter("");
    setIsRequestFilterOpen(false);
    setAssignedToFilter("");
    setIsAssignedToFilterOpen(false);
    setDateFilter("");
    setIsDateFilterOpen(false);
    setDateSortOrder("");
    setIsLoading(true);
    setFetchError(null);

    getTickets();
  };

  const sortTicketsByDate = (order) => {
    setDateSortOrder(order);

    const sortedTickets = [...filteredTickets];
    sortedTickets.sort((a, b) => {
      const dateA = new Date(a.SubmittedDateTime);
      const dateB = new Date(b.SubmittedDateTime);

      if (order === "newest") {
        return dateB - dateA;
      } else if (order === "oldest") {
        return dateA - dateB;
      }

      return 0;
    });

    setServiceTickets(sortedTickets);
  };

  return (
    <div className="page tenantportal">
      <table className="ticket-portal-table">
        <thead>
          <tr className="table-row">
            <th className="header-cell text-center">S No.</th>
            <th className="header-cell text-center">
              <div className="filter-header">
                <span>Request</span>
                <button
                  className={`filter-arrow ${isRequestFilterOpen ? "up" : ""}`}
                  onClick={() => setIsRequestFilterOpen(!isRequestFilterOpen)}
                ></button>
                {isRequestFilterOpen && (
                  <div className="filter-dropdown">
                    <input
                      type="text"
                      value={requestFilter}
                      onChange={(e) => setRequestFilter(e.target.value)}
                      placeholder="Filter by request..."
                    />
                  </div>
                )}
              </div>
            </th>
            <th className="header-cell text-center">
              <div className="filter-header">
                <span>Category</span>
                <button
                  className={`filter-arrow ${isCategoryFilterOpen ? "up" : ""}`}
                  onClick={() => setIsCategoryFilterOpen(!isCategoryFilterOpen)}
                ></button>
                {isCategoryFilterOpen && (
                  <div className="filter-dropdown">
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                      <option value="">All</option>
                      <option value="Plumbing">Plumbing</option>
                      <option value="Toilet">Toilet</option>
                      <option value="Pest">Pest</option>
                      <option value="Electric">Electric</option>
                      <option value="Aircon">Aircon</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                )}
              </div>
            </th>
            <th className="header-cell text-center">Unit</th>
            <th className="header-cell text-center">
              <div className="filter-header">
                <span>Status</span>
                <button
                  className={`filter-arrow ${isStatusFilterOpen ? "up" : ""}`}
                  onClick={() => setIsStatusFilterOpen(!isStatusFilterOpen)}
                ></button>
                {isStatusFilterOpen && (
                  <div className="filter-dropdown">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="">All</option>
                      <option value="Awaiting Review">Awaiting Review</option>
                      <option value="Ticket Assigned">Ticket Assigned</option>
                      <option value="Quotation Uploaded">Quotation Uploaded</option>
                      <option value="Quotation Accepted">Quotation Accepted</option>
                      <option value="Quotation Rejected">Quotation Rejected</option>
                      <option value="Works Started">Works Started</option>
                      <option value="Works Ended">Works Ended</option>
                      <option value="Works Rejected">Works Rejected</option>
                      <option value="Feedback Submitted">Feedback Submitted</option>
                    </select>
                  </div>
                )}
              </div>
            </th>
            <th className="header-cell text-center">
              <div className="filter-header">
                <span>Submitted Date</span>
                <button
                  className={`filter-arrow ${isDateFilterOpen ? "up" : ""}`}
                  onClick={() => setIsDateFilterOpen(!isDateFilterOpen)}
                ></button>
                {isDateFilterOpen && (
                  <div className="filter-dropdown">
                    <select
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value)}
                    >
                      <option value="">Sort according to Date Submitted</option>
                      <option value="newest">Newest to Oldest</option>
                      <option value="oldest">Oldest to Newest</option>
                    </select>
                  </div>
                )}
              </div>
            </th>
            <th className="header-cell text-center">
              <div className="filter-header">
                <span>Assigned To</span>
                <button
                  className={`filter-arrow ${isAssignedToFilterOpen ? "up" : ""}`}
                  onClick={() => setIsAssignedToFilterOpen(!isAssignedToFilterOpen)}
                ></button>
                {isAssignedToFilterOpen && (
                  <div className="filter-dropdown">
                    <input
                      type="text"
                      value={assignedToFilter}
                      onChange={(e) => setAssignedToFilter(e.target.value)}
                      placeholder="Filter by assigned..."
                    />
                  </div>
                )}
              </div>
            </th>
            <th className="header-cell text-center"></th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="8" className="text-center">
                Loading...
              </td>
            </tr>
          ) : fetchError ? (
            <tr>
              <td colSpan="8" className="text-center">
                {fetchError}
              </td>
            </tr>
          ) : filteredTickets.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center">
                Empty!
              </td>
            </tr>
          ) : (
            filteredTickets.map((ticket, index) => (
              <tr key={ticket.ServiceRequestID} className="table-row">
                <td className="text-center">{index + 1}</td>
                <td className="text-center">{ticket.Name}</td>
                <td className="text-center">{ticket.Category}</td>
                <td className="text-center">{ticket.Property}</td>
                <td className="text-center">{ticket.Status}</td>
                <td className="text-center">{new Date(ticket.SubmittedDateTime).toLocaleDateString()}</td>
                <td className="text-center">{ticket.staffDetails ? ticket.staffDetails.StaffName : null}</td>
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
      <button onClick={removeFilters}>
        Remove all Filters
      </button>
    </div>
  );
};

export default TenantPortal;
