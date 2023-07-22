import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Ticket from "../../objects/ticket";
import TicketManager from "../../managers/ticketmanager";
import AccountManager from "../../managers/accountmanager";
import "./../../styles/viewticket.css";
import NotificationManager from "../../managers/notificationmanager";

// material UI
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Button, Grid } from "@mui/material";

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

    const body = `A new ticket has been created by Tenant ${TenantID}, unit ${property}.
    Request: ${name} 
    Ticket Category: ${requestType}
    ${description}`;

    setLoading(true);

    try {
      let success = await ticketManager.addTicket(ticket);

        setFormError("Successfully added ticket");
        const notificationmanager = new NotificationManager();
        try {
          await notificationmanager.sendMailtoSupervisorFromTenantID(TenantID, body);
          console.log("Mail sent");
        } catch (error) {
          console.error("Mail sending error:", error);
        window.alert("Ticket Sucessfully Created");
        window.location.reload();
      }
    } catch (error) {
      window.alert("Error submitting ticket");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ticket-creation-page">
      <div>
        <h1 className="ticket-creation-title">Create Ticket</h1>
      </div>



      <form onSubmit={handleSubmit} className="ticket-creation-form">
        <div className="con-25">
          <label htmlFor="name" className="create-ticket-label">Name</label>

        </div>
        <div className="con-75">
          <input
            type="text"
            id="name"
            className="create-ticket-input"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div> */}
        <div className="name-textfield">
          <img className="create-ticket-icons" src={"/userAccountBox.png"} />
          <TextField
            id="name"
            label="Name"
            placeholder="Enter your name"
            variant="filled"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="con-25">
          <label htmlFor="dropdown" className="create-ticket-label">Request Type</label>
        </div>
        <div className="con-75">
          <select
            id="dropdown"
            className="create-ticket-select"
            value={requestType}
            onChange={(e) => setRequestType(e.target.value)}
          >
            <option value="">Please Select Request Type</option>
            <option value="Toilet">Toilet</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Pest">Pest</option>
            <option value="Electric">Electric</option>
            <option value="Aircon">Aircon</option>
            <option value="Cleaning">Cleaning</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div className="con-25">
          <label htmlFor="description" className="create-ticket-label">Description</label>

        </div>
        <div className="con-75">
          <textarea
            id="description"
            className="create-ticket-description"
            placeholder="Description"
            rows='5'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div> */}

        <div className="description-textfield">
          <TextField
            id="description"
            label="Description"
            multiline
            rows={4}
            placeholder="Enter your description of the problem"
            variant="filled"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="con-25">
          <label htmlFor="property" className="create-ticket-label">Property</label>
        </div>
        <div className="con-75">
          <select
            id="property"
            className="create-ticket-select"
            value={property}
            onChange={(e) => setProperty(e.target.value)}
          >
            <option value="">Please Select Property</option>
            {properties.map((property) => (
              <option key={property.UnitNumber} value={property.UnitNumber}>
                {property.UnitNumber}
              </option>
            ))}
          </select>
        </div>

        <input
          type="submit"
          value="Create Service Ticket"
          className="create-ticket-button"
          disabled={loading}
        />

        {formError && <p className="create-ticket-error">{formError}</p>}
      </form>
    </div>
  );
};

export default CreateTicket;
