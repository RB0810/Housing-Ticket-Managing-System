import { useEffect, useState, useMemo } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import Ticket from "../../objects/ticket";
import TicketManager from "../../managers/ticketmanager";
import AccountManager from "../../managers/accountmanager";
import "./../../styles/viewticket.css";

// material UI
import TextField from '@mui/material/TextField';

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
      <div>
        <h1 className="ticket-creation-title">Create Ticket</h1>
      </div>



      <form onSubmit={handleSubmit} className="ticket-creation-form">

        {/* old Name TextField */}
        {/* <div className="con-25">
          <label htmlFor="name">Name</label>
        </div>
        <div className="con-75">
          <input
            type="text"
            id="name"
            className="Name_input"
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
        <div className="request-field">
          <div className="con-25">
            <label htmlFor="dropdown">Request Type</label>
          </div>
          <div className="con-75">
            <select
              id="dropdown"
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
        </div>

        {/* <div className="con-25">
          <label htmlFor="description">Description</label>
        </div>
        <div className="con-75">
          <input
            type="text"
            id="description"
            className="description-input"
            placeholder="Description"
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
          <label htmlFor="property">Property</label>
        </div>
        <div className="con-75">
          <select
            id="property"
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
          className="submit-button"
          disabled={loading}
        />

        {formError && <p className="create-ticket-error">{formError}</p>}
      </form>
    </div>
  );
};

export default CreateTicket;
