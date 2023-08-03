import { useState, useEffect } from "react";
import "../../styles/createaccount.css";
import SupervisorAccount from "../../objects/SupervisorAccount";
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router";
import { Grid,TextField, Button } from "@mui/material";
import Swal from "sweetalert2";

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
      Swal.fire({
        icon: "success",
        title: "Supervisor Account created successfully!",
        showConfirmButton: true,
        confirmButtonColor: "#707c4f"
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    } catch (error) {
      setFormError(error.message);
    }
  };

  return (
    <div className="ticket-creation-page">
      <h1 className="wlcText">Create Supervisor Account</h1>
      <form onSubmit={handleSubmit} className="create-supervisor-acc-form">
            <Grid container spacing={1}>
              <Grid item xs = {12}>
              <div className="create-supervisor-acc-col25">
                <label htmlFor="username">Supervisor Username:</label>
              </div>
                <TextField 
                className="create-supervisor-acc-textfield"
                id="create-supervisor-username-textfield"
                variant="outlined" 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}/>
              </Grid>
              <Grid item xs = {12}>
              <div className="create-supervisor-acc-col25">
                <label htmlFor="email">Supervisor Email:</label>
              </div>
                <TextField 
                className="create-supervisor-acc-textfield"
                id="create-supervisor-email-textfield"
                variant="outlined" 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>
              </Grid>
              <Grid item xs = {12}>
              <div className="create-supervisor-acc-col25">
                <label htmlFor="password">Enter Password:</label>
              </div>
                <TextField 
                className="create-supervisor-acc-textfield"
                id="create-supervisor-password-textfield"
                variant="outlined" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
              </Grid>
              <Grid item xs = {12}>
              <div className="create-supervisor-acc-col25">
                <label htmlFor="rePassword">Re-enter Password:</label>
              </div>
                <TextField 
                className="create-supervisor-acc-textfield"
                id="create-supervisor-repassword-textfield"
                variant="outlined" 
                type="password"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}/>
              </Grid>
              <Grid item xs = {12}>
              <div className="create-supervisor-acc-col25">
                <label htmlFor="phone">Supervisor Phone:</label>
              </div>
                <TextField 
                className="create-supervisor-acc-textfield"
                id="create-supervisor-phone-number-textfield"
                variant="outlined" 
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}/>
              </Grid>
              <Grid item xs = {12}>
              <div className="create-supervisor-acc-col25">
                <label htmlFor="buildingName">Building Name:</label>
              </div>
                <TextField 
                className="create-supervisor-acc-textfield"
                id="create-supervisor-building-name-textfield"
                variant="outlined" 
                type="text"
                value={buildingName}
                onChange={(e) => setBuildingName(e.target.value)}/>
              </Grid>
              <Grid item xs = {12}>
              <div className="create-supervisor-acc-col25">
                <label htmlFor="buildingAddress">Building Address:</label>
              </div>
                <TextField 
                className="create-supervisor-acc-textfield"
                id="create-supervisor-building-address-textfield"
                variant="outlined" 
                type="text"
                value={buildingAddress}
                onChange={(e) => setBuildingAddress(e.target.value)}/>
              </Grid>
              <Grid item xs = {12}>
              <div className="create-supervisor-acc-col25">
                <label htmlFor="postalCode">Postal Code:</label>
              </div>
                <TextField 
                className="create-supervisor-acc-textfield"
                id="create-supervisor-postal-code-textfield"
                variant="outlined" 
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}/>
              </Grid>
              <Grid item xs = {12}>
                <Button
                id="create-supervisor-submit-button"
                onClick={handleSubmit}
                variant="contained"
                className="create-supervisor-acc-button">
                  Create Supervisor Account
                </Button>
              </Grid>
            </Grid>

        {formError && <p className="create-ticket-error">{formError}</p>}
      </form>
    </div>
  );
};

export default CreateSupervisor;
