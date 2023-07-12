import { useEffect, useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import Ticket from "../../objects/ticket";
import TicketManager from "../../managers/ticketmanager";
import "./../../styles/viewticket.css";

const CreateTicket = () => {
  const ticketManager = new TicketManager();
  let { TenantID } = useParams();
  const [name, setName] = useState("");
  const [requestType, setRequestType] = useState("");
  const [description, setDescription] = useState("");
  const [submittedDateTime, setSubmittedDateTime] = useState("");
  const [formError, setFormError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !requestType || !description) {
      setFormError("Please fill out all fields");
      return;
    }

    let submittedDateTime = new Date().toLocaleString();

    const ticket = new Ticket(
      name,
      parseInt(TenantID),
      submittedDateTime,
      requestType,
      description
    );

    console.log(ticket);

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
