import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import TicketManager from "../../managers/ticketmanager";
import AccountManager from "../../managers/accountmanager"
import "../../styles/ticketportal.css";
import Cookies from "js-cookie";

// material ui
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import { visuallyHidden } from '@mui/utils';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import SortIcon from '@mui/icons-material/Sort';
import SearchIcon from '@mui/icons-material/Search';
import { Height } from "@mui/icons-material";

const TenantPortal = () => {
  const ticketManager = new TicketManager();
  const accountManager = new AccountManager();
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
  const [isUnitFilterOpen, setIsUnitFilterOpen] = useState(false);
  const [isDateFilterOpen, setIsDateFilterOpen] = useState(false);
  const [unitFilter, setUnitFilter] = useState("");
  const [units, setUnits] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = Cookies.get('userId');
    const type = Cookies.get('type');

    if (!userId || !type) {
      // If any of the required cookies are missing, redirect to the login page
      console.log('Unauthorized');
      navigate("/unauthorize");
    } else {
      // Check if the user's ID and type match the expected values (e.g., TenantID and "tenant")
      if (Number(userId) === parseInt(TenantID) && type === "Tenant") {
        // Proceed with rendering the component
        console.log('Authorized');
      } else {
        // If not authorized, display "Unauthorized access" message
        console.log('Unauthorized');
        navigate("/unauthorize");
      }
    }
  }, [navigate, TenantID]);

  useEffect(() => {
    getTickets();
  }, [PARCStatus, TenantID]);

  useEffect(() => {
    // Fetch unit data from the server and populate the dropdown options
    const fetchUnits = async () => {
      try {
        const unitData = await accountManager.getUnits(TenantID);
        setUnits(unitData);
      } catch (error) {
        console.error("Error fetching units:", error);
      }
    };

    fetchUnits();
  }, [TenantID]);

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
    if (unitFilter && ticket.Property !== unitFilter) {
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
    setIsUnitFilterOpen(false);
    setUnitFilter("");
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

  const tablerowSX = {
    background: "#f1f1f1",
    '&:hover': {
      background: "#f00",
    }
  }

  return (
    <div className="page tenantportal">
      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ height: 100}}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }} align="left">S/N</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="left">Request<IconButton
                onClick={() => setIsRequestFilterOpen(!isRequestFilterOpen)}><SortIcon></SortIcon></IconButton>
                {(
                  <div className={`filter-dropdown${isRequestFilterOpen ? ' open' : ''}`}>
                    <input
                      type="text"
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
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}>
                      <option value="">All</option>
                      <option value="Plumbing">Plumbing</option>
                      <option value="Toilet">Toilet</option>
                      <option value="Pest">Pest</option>
                      <option value="Electric">Electric</option>
                      <option value="Aircon">Aircon</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                )}</TableCell>

              <TableCell sx={{ fontWeight: 'bold' }} align="left">Unit<IconButton onClick={() => setIsUnitFilterOpen(!isUnitFilterOpen)}>
                <SortIcon></SortIcon></IconButton>
                {(
                  <div className={`filter-dropdown${isUnitFilterOpen ? ' open' : ''}`}>
                    <select
                      value={unitFilter}
                      onChange={(e) => setUnitFilter(e.target.value)}>
                      <option value="">All</option>
                      {units.map((unit) => (
                        <option key={unit.UnitNumber} value={unit.UnitNumber}>
                          {unit.UnitNumber}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="left">Status<IconButton onClick={() => setIsStatusFilterOpen(!isStatusFilterOpen)}>
                <SortIcon></SortIcon></IconButton>
                {(
                  <div className={`filter-dropdown${isStatusFilterOpen ? ' open' : ''}`}>
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
                )}</TableCell>

              <TableCell sx={{ fontWeight: 'bold' }} align="left">Submitted Date<IconButton onClick={() => setIsDateFilterOpen(!isDateFilterOpen)}>
                <SortIcon></SortIcon></IconButton>
                {(
                  <div className={`filter-dropdown${isDateFilterOpen ? ' open' : ''}`}>
                    <select
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value)}
                    >
                      <option value="">Sort according to Date Submitted</option>
                      <option value="newest">Newest to Oldest</option>
                      <option value="oldest">Oldest to Newest</option>
                    </select>
                  </div>
                )}</TableCell>

              <TableCell sx={{ fontWeight: 'bold' }} align="left">Assigned To<IconButton onClick={() => setIsAssignedToFilterOpen(!isAssignedToFilterOpen)}>
                <SearchIcon></SearchIcon></IconButton>
                {(
                  <div className={`filter-dropdown${isAssignedToFilterOpen ? ' open' : ''}`}>
                    <input
                      type="text"
                      value={assignedToFilter}
                      onChange={(e) => setAssignedToFilter(e.target.value)}
                      placeholder="Filter by assigned..."
                    />
                  </div>
                )}</TableCell>

              <TableCell align="left"><Button
              sx={{backgroundColor: '#e91e63', '&:hover': {
                backgroundColor: '#a31545',
              }, }}
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
                  <TableCell align="left">{ticket.Name}</TableCell>
                  <TableCell align="left">{ticket.Category}</TableCell>
                  <TableCell align="left">{ticket.Property}</TableCell>
                  <TableCell align="left">{ticket.Status}</TableCell>
                  <TableCell align="left">{new Date(ticket.SubmittedDateTime).toLocaleDateString()}</TableCell>
                  <TableCell align="left">{ticket.staffDetails ? ticket.staffDetails.StaffName : "Unassigned"}</TableCell>
                  <TableCell align="left">
                    <Link to={`${getViewTicketsRoute()}/${TenantID}/${ticket.ServiceRequestID}`}>
                      <Button variant="contained" >View Ticket
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              )))}
          </TableBody>
        </Table>
      </TableContainer>

    </div>
  );
};

export default TenantPortal;
