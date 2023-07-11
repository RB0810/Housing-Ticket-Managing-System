import { useState } from "react";
import "../../styles/createaccount.css";
import SupervisorAccount from "../../objects/SupervisorAccount";

const CreateSupervisor = () => {
  const [formError, setFormError] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [phone, setPhone] = useState("");
  const [buildingName, setBuildingName] = useState("");
  const [buildingAddress, setBuildingAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const supervisorAccount = new SupervisorAccount();
    supervisorAccount.username = username;
    supervisorAccount.email = email;
    supervisorAccount.password = password;
    supervisorAccount.rePassword = rePassword;
    supervisorAccount.phone = phone;
    supervisorAccount.buildingName = buildingName;
    supervisorAccount.buildingAddress = buildingAddress;
    supervisorAccount.postalCode = postalCode;

    try {
      const message = await supervisorAccount.createAccount();
      setFormError(message);
    } catch (error) {
      setFormError(error.message);
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
            type="tel"
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
            type="tel"
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
