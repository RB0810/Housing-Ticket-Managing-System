import { useState } from "react";
import "../../styles/createaccount.css";
import StaffAccount from "../../objects/StaffAccount";

const CreateStaffAcc = () => {
  const [formError, setFormError] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [phone, setPhone] = useState("");
  const [ticketCategory, setTicketCategory] = useState("Cleaning"); // Set default value
  const [buildingID, setBuildingID] = useState("");
  const [buildingOptions, setBuildingOptions] = useState([]);

  const handleFetchBuildingOptions = async () => {
    const staffAccount = new StaffAccount();
    await staffAccount.fetchBuildingOptions();
    setBuildingOptions(staffAccount.buildingOptions);
  };

  handleFetchBuildingOptions();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const staffAccount = new StaffAccount();
    staffAccount.username = username;
    staffAccount.email = email;
    staffAccount.password = password;
    staffAccount.rePassword = rePassword;
    staffAccount.phone = phone;
    staffAccount.ticketCategory = ticketCategory;
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
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Staff Username</label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Staff Email</label>
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
          <label htmlFor="phone">Staff Phone</label>
          <input
            type="tel"
            id="phone"
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="ticketCategory">Ticket Category</label>
          <select
            id="ticketCategory"
            className="form-control"
            value={ticketCategory}
            onChange={(e) => setTicketCategory(e.target.value)}
          >
            <option value="Cleaning">Cleaning</option>
            <option value="Toilet">Toilet</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Pest">Pest</option>
            <option value="Electric">Electric</option>
            <option value="Aircon">Aircon</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="buildingID">Building ID</label>
          <select
            id="buildingID"
            className="form-control"
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

        <button type="submit">Create Staff Account</button>

        {formError && <p className="create-ticket-error">{formError}</p>}
      </form>
    </div>
  );
};

export default CreateStaffAcc;
