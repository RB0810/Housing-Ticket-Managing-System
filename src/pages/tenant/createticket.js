import React from "react";
import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Ticket from "../../objects/ticket";
import TicketManager from "../../managers/ticketmanager";
import AccountManager from "../../managers/accountmanager";
import "./../../styles/createticket.css";
import NotificationManager from "../../managers/notificationmanager";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { SHA256 } from "crypto-js";
import TextField from '@mui/material/TextField';
import Box from "@mui/material/Box";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Button, Grid } from "@mui/material";
import { green } from "@mui/material/colors";

const CreateTicket = () => {
  const navigate = useNavigate();
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
        if (property === "" && TenantID === "999") {
          setProperty("TESTUNITDONTDELETE");
        }
        else{
          const tenantProperties = await accountManager.getUnits(TenantID);
          setProperties(tenantProperties);
        }   
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, [TenantID, accountManager]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log(name);
    console.log("Request Type", requestType);
    console.log(description);
    console.log(property);
    console.log("Tenant ID", TenantID);
    console.log("here");


    if (!name || !requestType || !description || !property) {
      setFormError("Please fill out all fields");
      return;
    }

    console.log("not here");

    let currentDate = new Date();
    let timezoneOffset = currentDate.getTimezoneOffset() * 60000;
    let localTime = new Date(currentDate - timezoneOffset);
    let submittedDateTime = localTime
      .toISOString()
      .replace("T", " ")
      .slice(0, -5);

    const ticket = new Ticket(
      name,
      parseInt(TenantID),
      submittedDateTime,
      requestType,
      description,
      property
    );

    console.log(ticket);

    const body = `A new ticket has been created by Tenant ${TenantID}, unit ${property}.
    Request: ${name} 
    Ticket Category: ${requestType}
    ${description}`;

    setLoading(true);

    try {
      await ticketManager.addTicket(ticket);
        // const notificationmanager = new NotificationManager();
        // try {
        //   await notificationmanager.sendMailtoSupervisorFromTenantID(TenantID, body);
        //   console.log("Mail sent");
        // } catch (error) {
        //   console.error("Mail sending error:", error);
        // }
        Swal.fire({
          icon: "success",
          showConfirmButton: true,
          confirmButtonColor: "#707c4f",
          title: "Ticket submitted successfully!",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
    } catch (error) {
      console.log("Error submitting ticket:", error);
      // Swal.fire({
      //   icon: "error",
      //   showConfirmButton: true,
      //   confirmButtonColor: "#707c4f",
      //   title: "Error submitting ticket",
      //   text: error.message, // Log the specific error message
      // });    
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
                  <label htmlFor="tenant-create-ticket-name-textfield">Name</label>
                </div>
                <TextField
                  className="con-75"
                  required
                  type="text"
                  id="tenant-create-ticket-name-textfield"
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
                  id="tenant-create-ticket-request-type-select"
                  value={requestType}
                  label="Age"
                  inputProps={{ "data-testid": "tenant-create-ticket-request-type-select" }}
                  displayEmpty
                  onChange={(e) => setRequestType(e.target.value)}
                >
                  <MenuItem value="" id=""><em>Please Select Request Type</em></MenuItem>
                  <MenuItem value="Toilet" id="toilet">Toilet</MenuItem>
                  <MenuItem value="Plumbing" id="plumbing">Plumbing</MenuItem>
                  <MenuItem value="Pest" id="pest">Pest</MenuItem>
                  <MenuItem value="Electric" id="electric">Electric</MenuItem>
                  <MenuItem value="Aircon" id="aircon">Aircon</MenuItem>
                  <MenuItem value="Cleaning" id="cleaning">Cleaning</MenuItem>
                  <MenuItem value="Others" id="others">Others</MenuItem>
                </Select>
              </div>
            </Grid>

            <Grid item xs={12}>
              <div className="field-row">
                <div className="con-25">
                  <label htmlFor="tenant-create-ticket-description-textfield">Description</label>
                </div>
                <TextField
                  className="con-75"
                  required
                  id="tenant-create-ticket-description-textfield"
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
                  id="tenant-create-ticket-property-type-select"
                  value={property} // Use property instead of requestType here
                  label="Age"
                  displayEmpty
                  inputProps={{ "data-testid": "tenant-create-ticket-property-type-select" }}
                  onChange={(e) => setProperty(e.target.value)}
                >
                  <MenuItem value=""><em>Please Select Property</em></MenuItem>
                  {properties.map((property) => (
                    <MenuItem 
                    key={property.UnitNumber} 
                    value={property.UnitNumber}
                    id={property.UnitNumber}>
                      {property.UnitNumber}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </Grid>

            <Grid item xs={12}>
              <Button
                data-testid="tenant-create-ticket-submit-button"
                id="tenant-create-ticket-submit-button"
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
