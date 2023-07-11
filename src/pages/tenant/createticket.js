import { useState } from "react";
import supabase from "../../config/supabaseClient";
import './../../styles/viewticket.css'; 

const CreateTicket = () => {
  const [name, setName] = useState("");
  const [requestType, setRequestType] = useState("Toilet"); // Set default value
  const [description, setDescription] = useState("");
  const [propertyID, setPID] = useState("");
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
        LandlordID: 1,
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
          <label htmlFor="property ID">Property ID</label>
        </div>
        <div className="con-75">
          <input
          type="text"
          id="property ID"
          placeholder="Property ID"
          value={propertyID}
          onChange={(e) => setPID(e.target.value)}
          />
        </div>
        
        <div className="con-25"> 
          <label htmlFor="dropdown">Request Type</label>
        </div>
        <div className="con-75">
          <select
          id="dropdown"
          value={"requestType"}

          onChange={(e) => setRequestType(e.target.value)}
          >
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

        
        

        <input type="submit" value="Create Service Ticket" className="submit-button"></input>
        {formError && <p className="create-ticket-error">{formError}</p>}
      </form>
    </div>
  );
};

export default CreateTicket;
