import { useState, useEffect } from "react";
import "../../styles/createaccount.css";
import SupervisorAccount from "../../objects/SupervisorAccount";
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router";
import { Grid,TextField } from "@mui/material";

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
  const { AdminID } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    const userId = Cookies.get('userId');
    const type = Cookies.get('type');

    if (!userId || !type) {
      // If any of the required cookies are missing, redirect to the login page
      console.log('Unauthorized');
      navigate("/unauthorize");
    } else {
      // Check if the user's ID and type match the expected values (e.g., TenantID and "tenant")
      if (Number(userId) === parseInt(AdminID) && type === "Admin") {
        // Proceed with rendering the component
        console.log('Authorized');
      } else {
        // If not authorized, display "Unauthorized access" message
        console.log('Unauthorized');
        navigate("/unauthorize");
      }
    }
  }, [navigate, AdminID]);

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
      <form onSubmit={handleSubmit} className="create-supervisor-acc-form">
        <div className="create-supervisor-acc-row">
          <div className="create-supervisor-acc-col25">
            <label htmlFor="username">Supervisor Username:</label>
          </div>
          
          <div className="create-supervisor-acc-col75">
            <Grid container spacing={1}>
              <Grid item xs = {12}>
                  <TextField 
                  className="create-supervisor-acc-textfield"
                  id="outlined-basic" 
                  variant="outlined" 
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}/>
              </Grid>
            </Grid>
          </div>
        </div>

        <div className="create-supervisor-acc-row">
          <div className="create-supervisor-acc-col25">
            <label htmlFor="email">Supervisor Email:</label>
          </div>
          
          <div className="create-supervisor-acc-col75">
            <input
              type="email"
              id="email"
              className="create-supervisor-acc-input-text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="create-supervisor-acc-row">
          <div className="create-supervisor-acc-col25">
            <label htmlFor="password">Enter Password:</label>
          </div>
          
          <div className="create-supervisor-acc-col75">
            <input
              type="password"
              id="password"
              className="create-supervisor-acc-input-text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
        </div>

        <div className="create-supervisor-acc-row">
          <div className="create-supervisor-acc-col25">
            <label htmlFor="rePassword">Re-enter Password:</label>
          </div>
          
          <div className="create-supervisor-acc-col75">
            <input
              type="password"
              id="rePassword"
              className="create-supervisor-acc-input-text"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
            />
          </div>
        </div>

        <div className="create-supervisor-acc-row">
          <div className="create-supervisor-acc-col25">
            <label htmlFor="phone">Supervisor Phone:</label>
          </div>
          
          <div className="create-supervisor-acc-col75">
            <input
              type="tel"
              id="phone"
              className="create-supervisor-acc-input-text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        <div className="create-supervisor-acc-row">
          <div className="create-supervisor-acc-col25">
            <label htmlFor="buildingName">Building Name:</label>
          </div>
          
          <div className="create-supervisor-acc-col75">
            <input
              type="text"
              id="buildingName"
              className="create-supervisor-acc-input-text"
              value={buildingName}
              onChange={(e) => setBuildingName(e.target.value)}
            />
          </div>
        </div>

        <div className="create-supervisor-acc-row">
          <div className="create-supervisor-acc-col25">
            <label htmlFor="buildingAddress">Building Address:</label>
          </div>
          
          <div className="create-supervisor-acc-col75">
            <input
              type="text"
              id="buildingAddress"
              className="create-supervisor-acc-input-text"
              value={buildingAddress}
              onChange={(e) => setBuildingAddress(e.target.value)}
            />
          </div>
        </div>

        <div className="create-supervisor-acc-row">
          <div className="create-supervisor-acc-col25">
            <label htmlFor="postalCode">Postal Code:</label>
          </div>
          
          <div className="create-supervisor-acc-col75">
            <input
              type="tel"
              id="postalCode"
              className="create-supervisor-acc-input-text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
        </div>

        <div className="create-supervisor-acc-row">
          <input
            type="submit"
            value="Create Supervisor Account"
            className="create-supervisor-acc-input-submit"
          />
        </div> 

        {formError && <p className="create-ticket-error">{formError}</p>}
      </form>
    </div>
  );
};

export default CreateSupervisor;
