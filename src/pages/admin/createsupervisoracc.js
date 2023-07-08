import { useState } from "react";
import "../../styles/createaccount.css";
import { CreateSupervisorAcc } from "../../managers/accountmanager";

const CreateSupervisor = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [phone, setPhone] = useState("");
  const [buildingName, setBuildingName] = useState("");
  const [buildingAddress, setBuildingAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !username ||
      !email ||
      !password ||
      !rePassword ||
      !buildingName ||
      !buildingAddress ||
      !phone ||
      !postalCode
    ) {
      setFormError("Please fill out all fields");
      return;
    }

    if (password !== rePassword) {
      setFormError("Passwords do not match");
      return;
    }

    const Building = {
      BuildingName: buildingName,
      Address: buildingAddress,
      PostalCode: postalCode,
    };

    const Supervisor = {
      SupervisorUsername: username,
      SupervisorEmail: email,
      SupervisorPassword: password,
      SupervisorPhone: phone,
      BuildingID: null,
    };

    try {
      await CreateSupervisorAcc(Building, Supervisor);
      setFormError("Supervisor Account Created!");
    } catch (error) {
      console.error(error);
      setFormError("Database Error");
    }
  };

  return (
    <div className="ticket-creation-page">
      <h1 className="wlcText">Create Supervisor Account</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Supervisor Username</label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Supervisor Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Enter Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="rePassword">Re-enter Password</label>
          <input
            type="password"
            id="rePassword"
            className="form-control"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Supervisor Phone</label>
          <input
            type="number"
            id="phone"
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="buildingName">Building Name</label>
          <input
            type="text"
            id="buildingName"
            className="form-control"
            value={buildingName}
            onChange={(e) => setBuildingName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="buildingAddress">Building Address</label>
          <input
            type="text"
            id="buildingAddress"
            className="form-control"
            value={buildingAddress}
            onChange={(e) => setBuildingAddress(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="number"
            id="postalCode"
            className="form-control"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>

        <button type="submit">Create Supervisor Account</button>

        {formError && <p className="create-ticket-error">{formError}</p>}
      </form>
    </div>
  );
};

export default CreateSupervisor;
