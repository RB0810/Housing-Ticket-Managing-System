import { useState, useEffect } from "react";
import "../../styles/createaccount.css";
import StaffAccount from "../../objects/StaffAccount";

const CreateStaffAcc = () => {
  const [formError, setFormError] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [phone, setPhone] = useState("");
  const [buildingID, setBuildingID] = useState("");
  const [buildingOptions, setBuildingOptions] = useState([]);

  const handleFetchBuildingOptions = async () => {
    const staffAccount = new StaffAccount();
    await staffAccount.fetchBuildingOptions();
    setBuildingOptions(staffAccount.buildingOptions);
  };

  useEffect(() => {
    handleFetchBuildingOptions();
  }, []); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const staffAccount = new StaffAccount();
    staffAccount.username = username;
    staffAccount.email = email;
    staffAccount.password = password;
    staffAccount.rePassword = rePassword;
    staffAccount.phone = phone;
    staffAccount.buildingID = buildingID;

    try {
      const message = await staffAccount.createAccount();
      setFormError(message);
    } catch (error) {
      setFormError(error.message);
    }
  };

  return (
    <div className="ticket-creation-page">
      <h1 className="wlcText">Create Staff Account</h1>
      <form onSubmit={handleSubmit} className="create-staff-acc-form">
        <div className="create-staff-acc-row">
          <div className="create-staff-acc-col25">
            <label 
            htmlFor="username"
            className="create-staff-acc-label"
            >Staff Username</label>
          </div>
          
          <div className="create-staff-acc-col75">
            <input
            type="text"
            id="username"
            className="create-staff-acc-input-text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          </div>
        </div>

        <div className="create-staff-acc-row">
          <div className="create-staff-acc-col25">
            <label 
            htmlFor="email"
            className="create-staff-acc-label"
            >Staff Email</label>
          </div>
          
          <div className="create-staff-acc-col75">
            <input
              type="email"
              id="email"
              className="create-staff-acc-input-text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="create-staff-acc-row">
          <div className="create-staff-acc-col25">
            <label 
            htmlFor="password"
            className="create-staff-acc-label"
            >Enter Password</label>
          </div>
          
          <div className="create-staff-acc-col75">
            <input
            type="password"
            id="password"
            className="create-staff-acc-input-text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          </div>
        </div>

        <div className="create-staff-acc-row">
          <div className="create-staff-acc-col25">
            <label 
            htmlFor="rePassword"
            className="create-staff-acc-label"
            >Re-enter Password</label>
          </div>
          
          <div className="create-staff-acc-col75">
            <input
            type="password"
            id="rePassword"
            className="create-staff-acc-input-text"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
          />
          </div>
        </div>

        <div className="create-staff-acc-row">
          <div className="create-staff-acc-col25">
            <label 
            htmlFor="phone"
            className="create-staff-acc-label"
            >Staff Phone</label>
          </div>
          
          <div className="create-staff-acc-col75">
            <input
            type="tel"
            id="phone"
            className="create-staff-acc-input-text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          </div>
        </div>

        <div className="create-staff-acc-row">
          <div className="create-staff-acc-col25">
            <label 
            htmlFor="buildingID"
            className="create-staff-acc-label"
            >Building ID</label>
          </div>
          
          <div className="create-staff-acc-col75">
            <select
            id="buildingID"
            className="create-staff-acc-input-text"
            value={buildingID}
            onChange={(e) => setBuildingID(e.target.value)}
          >
            <option value="">Select Building ID</option>
            {buildingOptions.map((building) => (
              <option key={building.id} value={building.id}>
                {building.name},{building.address}
              </option>
            ))}
          </select>
          </div>
        </div>

        <div className="create-staff-acc-row">
          <input
            type="submit"
            value="Create Staff Account"
            className="create-staff-acc-input-submit"
          />
        </div>     
        

        {formError && <p className="create-ticket-error">{formError}</p>}
      </form>
    </div>
  );
};

export default CreateStaffAcc;
