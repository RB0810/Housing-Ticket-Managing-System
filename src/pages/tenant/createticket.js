<<<<<<< HEAD
import { useState } from "react";
import supabase from "../../config/supabaseClient";

const CreateTicket = () => {
  const [name, setName] = useState("");
  const [requestType, setRequestType] = useState("Toilet"); // Set default value
  const [description, setDescription] = useState("");
  const [submittedDateTime, setSubmittedDateTime] = useState("");
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !requestType || !description) {
      setFormError("Please fill out all fields");
      return;
    }

    let submittedDateTime = new Date().toLocaleString();
    const { data, error } = await supabase.from("Service Request").insert([
      {
        TenantID: 1,
        SupervisorID: 1,
        Name: name,
        RequestType: requestType,
        RequestDescription: description,
        SubmittedDateTime: submittedDateTime,
        PARCStatus: "PENDING",
      },
    ]);

    if (error) {
      console.log(error);
      setFormError("Database Error");
    } else {
      setFormError("Successfully added ticket");
      console.log(data);
    }
  };

  return (
    <div className="ticket-creation-page">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="dropdown">Request Type</label>
        <select
          id="dropdown"
          value={"requestType"}
          onChange={(e) => setRequestType(e.target.value)}
        >
          <option value="Toilet">Toilet</option>
          <option value="Plumbing">Plumbing</option>
          <option value="Pest">Pest</option>
        </select>

        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button>Create Service Ticket</button>
        {formError && <p className="create-ticket-error">{formError}</p>}
      </form>
    </div>
  );
};

export default CreateTicket;
=======
import { useEffect, useState, useMemo } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import Ticket from "../../objects/ticket";
import TicketManager from "../../managers/ticketmanager";
import AccountManager from "../../managers/accountmanager";
import "./../../styles/viewticket.css";

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
        <div className="con-25">
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
        </div>

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

        <div className="con-25">
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
>>>>>>> a68d74b2e817c7184e70c9d65d952e983e357804
