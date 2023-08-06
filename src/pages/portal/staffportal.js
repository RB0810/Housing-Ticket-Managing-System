import { useEffect, useState } from "react";
import { Routes, Route, useParams, Link, useNavigate } from "react-router-dom";
import TicketManager from "../../managers/ticketmanager";
import "../../styles/ticketportal.css";
import Cookies from "js-cookie";
import { SHA256 } from "crypto-js";

// material ui
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import SortIcon from '@mui/icons-material/Sort';
import SearchIcon from '@mui/icons-material/Search';

export default function StaffPortal() {
  const ticketManager = new TicketManager();
  let { PARCStatus, StaffID } = useParams();
  const [serviceTickets, setServiceTickets] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [requestFilter, setRequestFilter] = useState("");
  const [submittedByFilter, setSubmittedByFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [unitFilter, setUnitFilter] = useState("");
  const [dateSortOrder, setDateSortOrder] = useState("");
  const [isCategoryFilterOpen, setIsCategoryFilterOpen] = useState(false);
  const [isStatusFilterOpen, setIsStatusFilterOpen] = useState(false);
  const [isRequestFilterOpen, setIsRequestFilterOpen] = useState(false);
  const [isUnitFilterOpen, setIsUnitFilterOpen] = useState(false);
  const [isSubmittedByFilterOpen, setIsSubmittedByFilterOpen] = useState(false);
  const [isDateFilterOpen, setIsDateFilterOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = Cookies.get('userId');
    const type = Cookies.get('type');

    if (!userId || !type) {
      // If any of the required cookies are missing, redirect to the login page
      console.log('Unauthorized');
      navigate("/unauthorize");
    } else {
      const userIdAsString = String(StaffID);
      // Use SHA-256 to hash the userId
      const hashedUserId = SHA256(userIdAsString).toString();
      // Check if the user's ID and type match the expected values (e.g., StaffID and "Staff")
      if (userId === hashedUserId && type === "Staff") {
        // Proceed with rendering the component
        console.log('Authorized');
      } else {
        // If not authorized, display "Unauthorized access" message
        console.log('Unauthorized');
        navigate("/unauthorize");
      }
    }
  }, [navigate, StaffID]);

  useEffect(() => {
    getTickets();
  }, []);

  const getTickets = async () => {
    try {
      let data = await ticketManager.getTicketsByPARCStatusForStaffID(
        PARCStatus.toUpperCase(),
        parseInt(StaffID)
      );

      console.log("data" + data);

      if (data !== false && data !== undefined && data !== null) {
        console.log(data);
        setServiceTickets(data);
        setFetchError(null);
      }
    } catch {
      setFetchError("Error!");
      setServiceTickets([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getViewTicketsRoute = () => {
    return "/staffportal/ticket";
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
    if (unitFilter && ticket.Property && !ticket.Property.includes(unitFilter)) {
      return false;
    }
    if (submittedByFilter && ticket.tenantDetails && !ticket.tenantDetails.TenantName.toLowerCase().includes(submittedByFilter.toLowerCase())) {
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
    setIsUnitFilterOpen(false);
    setUnitFilter("");
    setIsSubmittedByFilterOpen(false);
    setSubmittedByFilter("");
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
    <div className="page staffportal">

      {/* start of MUI table */}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ height: 100 }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }} align="left">S/N</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="left">Ticket ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="left">Request<IconButton
                onClick={() => setIsRequestFilterOpen(!isRequestFilterOpen)}><SortIcon></SortIcon></IconButton>
                {(
                  <div className={`filter-dropdown${isRequestFilterOpen ? ' open' : ''}`}>
                    <input
                      type="text"
                      id="request-filter"
                      value={requestFilter}
                      onChange={(e) => setRequestFilter(e.target.value)}
                      placeholder="Filter by request..."
                    />
                  </div>
                )}
              </TableCell>

              <TableCell sx={{ fontWeight: 'bold' }} align="left">Category<IconButton onClick={() => setIsCategoryFilterOpen(!isCategoryFilterOpen)}>
                <SortIcon></SortIcon></IconButton>
                {(
                  <div className={`filter-dropdown${isCategoryFilterOpen ? ' open' : ''}`}>
                    <select
                      id="category-filter"
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}>
                      <option value="" id="all">All</option>
                      <option value="Plumbing" id="plumbing">Plumbing</option>
                      <option value="Toilet" id="toilet">Toilet</option>
                      <option value="Pest" id="pest">Pest</option>
                      <option value="Electric" id="electric">Electric</option>
                      <option value="Aircon" id="aircon">Aircon</option>
                      <option value="Others" id="other">Others</option>
                    </select>
                  </div>
                )}</TableCell>

              <TableCell sx={{ fontWeight: 'bold' }} align="left">Unit<IconButton onClick={() => setIsUnitFilterOpen(!isUnitFilterOpen)}>
                <SortIcon></SortIcon></IconButton>
                {(
                  <div className={`filter-dropdown${isUnitFilterOpen ? ' open' : ''}`}>
                    <select
                    id="unit-filter"
                      value={unitFilter}
                      onChange={(e) => setUnitFilter(e.target.value)}>
                      <option value="" id="all">All</option>
                      {/* {units.map((unit) => (
                        <option key={unit.UnitNumber} value={unit.UnitNumber}>
                          {unit.UnitNumber}
                        </option>
                      ))} */}
                    </select>
                  </div>
                )}
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="left">Status<IconButton onClick={() => setIsStatusFilterOpen(!isStatusFilterOpen)}>
                <SortIcon></SortIcon></IconButton>
                {(
                  <div className={`filter-dropdown${isStatusFilterOpen ? ' open' : ''}`}>
                    <select
                    id="status-filter"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="" id="all">All</option>
                      <option value="Awaiting Review" id="Awaiting-Review">Awaiting Review</option>
                      <option value="Ticket Assigned" id="Ticket-Assigned">Ticket Assigned</option>
                      <option value="Quotation Uploaded" id="Quotation-Uploaded">Quotation Uploaded</option>
                      <option value="Quotation Accepted" id="Quotation-Accepted">Quotation Accepted</option>
                      <option value="Quotation Rejected" id="Quotation-Rejected">Quotation Rejected</option>
                      <option value="Works Started" id="Works-Started">Works Started</option>
                      <option value="Works Ended" id="Works-Ended">Works Ended</option>
                      <option value="Works Rejected" id="Works-Rejected">Works Rejected</option>
                      <option value="Feedback Submitted" id="Feedback-Submitted">Feedback Submitted</option>
                    </select>
                  </div>
                )}</TableCell>

              

              <TableCell sx={{ fontWeight: 'bold' }} align="left">Submitted Date<IconButton
                onClick={() => setIsDateFilterOpen(!isDateFilterOpen)}><SortIcon></SortIcon></IconButton>
                {(
                  <div className={`filter-dropdown${isDateFilterOpen ? ' open' : ''}`}>
                    <select
                    id="submitted-date-filter"
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value)}
                    >
                      <option value="" id="sort">Sort according to Date Submitted</option>
                      <option value="newest" id="newest">Newest to Oldest</option>
                      <option value="oldest" id="oldest">Oldest to Newest</option>
                    </select>
                  </div>
                )}
              </TableCell>

              <TableCell sx={{ fontWeight: 'bold' }} align="left">Submitted By<IconButton
                onClick={() => setIsSubmittedByFilterOpen(!isSubmittedByFilterOpen)}><SortIcon></SortIcon></IconButton>
                {(
                  <div className={`filter-dropdown${isSubmittedByFilterOpen ? ' open' : ''}`}>
                    <input
                    id="submitted-by-filter"
                      type="text"
                      value={submittedByFilter}
                      onChange={(e) => setSubmittedByFilter(e.target.value)}
                      placeholder="Filter by submitted..."
                    />
                  </div>
                )}
              </TableCell>

              <TableCell align="left"><Button
                sx={{
                  backgroundColor: '#e91e63', '&:hover': {
                    backgroundColor: '#a31545',
                  },
                }}
                variant="contained" onClick={removeFilters}>Remove Filters</Button></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
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
            ) :

              (filteredTickets.map((ticket, index) => (
                <TableRow
                  hover
                  key={ticket.ServiceRequestID}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="left">{index + 1}</TableCell>
                  <TableCell align="left">{ticket.ServiceRequestID}</TableCell>
                  <TableCell align="left">{ticket.Name}</TableCell>
                  <TableCell align="left">{ticket.Category}</TableCell>
                  <TableCell align="left">{ticket.Property}</TableCell>
                  <TableCell align="left">{ticket.Status}</TableCell>
                  <TableCell align="left">{new Date(ticket.SubmittedDateTime).toLocaleDateString()}</TableCell>
                  <TableCell className="text-center">{ticket.tenantDetails ? ticket.tenantDetails.TenantName : null}</TableCell>
                  <TableCell align="left">
                    <Link to={`${getViewTicketsRoute()}/${StaffID}/${ticket.ServiceRequestID}`}>
                      <Button 
                      variant="contained" 
                      id={ticket.Name}>
                        View Ticket
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              )))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* End of MUI table */}
{/* 
      <table className="ticket-portal-table">
        <thead>
          <tr className="table-row">
            <th className="header-cell text-center">Ticket ID</th>
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
            <th className="header-cell text-center">
              <div className="filter-header">
                <span>Unit</span>
                <button
                  className={`filter-arrow ${isUnitFilterOpen ? "up" : ""}`}
                  onClick={() => setIsUnitFilterOpen(!isUnitFilterOpen)}
                ></button>
                {isUnitFilterOpen && (
                  <div className="filter-dropdown">
                    <input
                      type="text"
                      value={unitFilter}
                      onChange={(e) => setUnitFilter(e.target.value)}
                      placeholder="Filter by unit..."
                    />
                  </div>
                )}
              </div>
            </th>
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
                <span>Submitted By</span>
                <button
                  className={`filter-arrow ${isSubmittedByFilterOpen ? "up" : ""}`}
                  onClick={() => setIsSubmittedByFilterOpen(!isSubmittedByFilterOpen)}
                ></button>
                {isSubmittedByFilterOpen && (
                  <div className="filter-dropdown">
                    <input
                      type="text"
                      value={submittedByFilter}
                      onChange={(e) => setSubmittedByFilter(e.target.value)}
                      placeholder="Filter by submitted..."
                    />
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
            <th className="header-cell text-center"></th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="8" className="text-center">Loading...</td>
            </tr>
          ) : fetchError ? (
            <tr>
              <td colSpan="8" className="text-center">{fetchError}</td>
            </tr>
          ) : filteredTickets.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center">Empty!</td>
            </tr>
          ) : (
            filteredTickets.map((ticket, index) => (
              <tr key={ticket.ServiceRequestID} className="table-row">
                <td className="text-center">{ticket.ServiceRequestID}</td>
                <td className="text-center">{ticket.Name}</td>
                <td className="text-center">{ticket.Category}</td>
                <td className="text-center">{ticket.Property}</td>
                <td className="text-center">{ticket.Status}</td>
                <td className="text-center">{ticket.tenantDetails ? ticket.tenantDetails.TenantName : null}</td>
                <td className="text-center">{new Date(ticket.SubmittedDateTime).toLocaleDateString()}</td>
                <td className="text-center">
                  <Link to={`${getViewTicketsRoute()}/${StaffID}/${ticket.ServiceRequestID}`}>
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
      </button> */}
    </div>
  );
}
