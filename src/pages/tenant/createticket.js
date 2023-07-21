import { useEffect, useState, useMemo } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import Ticket from "../../objects/ticket";
import TicketManager from "../../managers/ticketmanager";
import AccountManager from "../../managers/accountmanager";
import "./../../styles/viewticket.css";

// material UI
import TextField from '@mui/material/TextField';
import Box from "@mui/material/Box";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Button, Grid } from "@mui/material";

const CreateTicket = () => {
  const ticketManager = new TicketManager();
  let { TenantID } = useParams();
  const [name, setName] = useState("");
  const [requestType, setRequestType] = useState("");
  const [description, setDescription] = useState("");
  const [formError, setFormError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [property, setProperty] = useState("");

  const accountManager = useMemo(() => new AccountManager(), []);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const tenantProperties = await accountManager.getUnits(TenantID);
        setProperties(tenantProperties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, [TenantID, accountManager]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !requestType || !description || !property) {
      setFormError("Please fill out all fields");
      return;
    }

    let currentDate = new Date();
    let timezoneOffset = currentDate.getTimezoneOffset() * 60000;
    let localTime = new Date(currentDate - timezoneOffset);
    let submittedDateTime = localTime.toISOString().replace("T", " ").slice(0, -5);

    const ticket = new Ticket(
      name,
      parseInt(TenantID),
      submittedDateTime,
      requestType,
      description,
      property
    );

    setLoading(true);

    try {
      let success = await ticketManager.addTicket(ticket);

      if (success) {
        setFormError("Successfully added ticket");
      } else {
        setFormError("Error adding ticket");
      }
    } catch (error) {
      setFormError("An error occurred while adding the ticket");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ticket-creation-page">
      <Box className="create-ticket-box" sx={{}}>
        <div>
          <h1 className="ticket-creation-title">Create Ticket</h1>
        </div>
        <form onSubmit={handleSubmit} className="ticket-creation-form">

          <Grid container spacing={1}>
            <Grid item xs={12}>
              <div className="field-row">
                <div className="con-25">
                  <label htmlFor="name">Name</label>
                </div>
                <TextField
                  className="con-75"
                  required
                  type="text"
                  id="name"
                  label="Name"
                  placeholder="Enter your name"
                  variant="outlined"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </Grid>

            <Grid item xs={12}>
              <div className="field-row">
                <div className="con-25">
                  <label htmlFor="dropdown-request-type">Request Type</label>
                </div>
                <Select
                  className="con-75"
                  labelId="dropdown-request-type"
                  id="dropdown-request-type"
                  value={requestType}
                  label="Age"
                  displayEmpty
                  onChange={(e) => setRequestType(e.target.value)}
                >
                  <MenuItem value=""><em>Please Select Request Type</em></MenuItem>
                  <MenuItem value="Toilet">Toilet</MenuItem>
                  <MenuItem value="Plumbing">Plumbing</MenuItem>
                  <MenuItem value="Pest">Pest</MenuItem>
                  <MenuItem value="Electric">Electric</MenuItem>
                  <MenuItem value="Aircon">Aircon</MenuItem>
                  <MenuItem value="Cleaning">Cleaning</MenuItem>
                  <MenuItem value="Others">Others</MenuItem>
                </Select>
              </div>
            </Grid>

            <Grid item xs={12}>
              <div className="field-row">
                <div className="con-25">
                  <label htmlFor="description">Description</label>
                </div>
                <TextField
                  className="con-75"
                  required
                  id="description"
                  label="Description"
                  multiline
                  rows={4}
                  placeholder="Enter your description of the problem"
                  variant="outlined"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </Grid>

            <Grid item xs={12}>
              <div className="field-row">
                <div className="con-25">
                  <label htmlFor="dropdown-property-type">Property</label>
                </div>
                <Select
                  className="con-75"
                  labelId="dropdown-property-type"
                  id="dropdown-property-type"
                  value={requestType}
                  label="Age"
                  displayEmpty
                  onChange={(e) => setProperty(e.target.value)}
                >
                  <MenuItem value=""><em>Please Select Property</em></MenuItem>
                  {properties.map((property) => (
                    <MenuItem key={property.UnitNumber} value={property.UnitNumber}>
                      {property.UnitNumber}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </Grid>

            {/* <input
            type="submit"
            value="Create Service Ticket"
            className="submit-button"
            disabled={loading}
          /> */}

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
              >
                Create Service Ticket
              </Button>

              {formError && <p className="create-ticket-error">{formError}</p>}
            </Grid>
          </Grid>
        </form>
      </Box>

    </div>
  );
};

export default CreateTicket;
