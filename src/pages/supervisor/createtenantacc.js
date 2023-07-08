import { useState } from "react";
import "../../styles/createaccount.css"

const CreateTenant = () => {
  const [name, setName] = useState("");
  const [requestType, setRequestType] = useState("Toilet"); // Set default value
  const [description, setDescription] = useState("");
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !requestType || !description) {
      setFormError("Please fill out all fields");
      return;
    }

  };

  return (
    <div className="tenant-account-creation-page">
    <h1 className='wlcText'>Create Tenant Account</h1>
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

export default CreateTenant;
