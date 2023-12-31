import React from "react";
import { useState, useEffect } from "react";
import "../../styles/createaccount.css";
import StaffAccount from "../../objects/StaffAccount";
import { useParams, useNavigate } from "react-router";
import Cookies from "js-cookie";
import {Grid,TextField,MenuItem,Select,OutlinedInput,Button} from '@mui/material';
import Swal from "sweetalert2";
import { SHA256 } from "crypto-js";

const CreateStaffAcc = () => {
  const [formError, setFormError] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [phone, setPhone] = useState("");
  const [buildingID, setBuildingID] = useState("");
  const [buildingOptions, setBuildingOptions] = useState([]);
  const {AdminID} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const userId = Cookies.get('userId');
    const type = Cookies.get('type');

    if (!userId || !type) {
      // If any of the required cookies are missing, redirect to the login page
      console.log('Unauthorized');
      navigate("/unauthorize");
    } else {
      const userIdAsString = String(AdminID);
      // Use SHA-256 to hash the userId
      const hashedUserId = SHA256(userIdAsString).toString();
      // Check if the user's ID and type match the expected values (e.g., TenantID and "tenant")
      if (userId === hashedUserId && type === "Admin") {
        // Proceed with rendering the component
        console.log('Authorized');
      } else {
        // If not authorized, display "Unauthorized access" message
        console.log('Unauthorized');
        navigate("/unauthorize");
      }
    }
  }, [navigate, AdminID]);

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

    console.log("button clicked");
    console.log("username", username);

    const staffAccount = new StaffAccount();
    staffAccount.username = username;
    staffAccount.email = email;
    staffAccount.password = password;
    staffAccount.rePassword = rePassword;
    staffAccount.phone = phone;
    staffAccount.buildingID = buildingID;

    try {
      const message = await staffAccount.createAccount();
      Swal.fire({
        icon: "success",
        title: "Staff Account created successfully!",
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

  console.log(buildingOptions);

  return (
    <div data-testid="create-staff-acc-mock" className="ticket-creation-page">
      <h1 className="wlcText">Create Staff Account</h1>
      <form onSubmit={handleSubmit} className="create-staff-acc-form">
            <Grid container spacing={1}>
              <Grid item xs = {12}>
                <div className="create-staff-acc-col25">
                  <label 
                  htmlFor="create-staff-username-textfield"
                  className="create-staff-acc-label"
                  >Staff Username</label>
                </div>
                  <TextField 
                  data-testid="username-field"
                  className="create-staff-acc-textfield"
                  id="create-staff-username-textfield" 
                  variant="outlined" 
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}/>
              </Grid>
              <Grid item xs = {12}>
                <div className="create-staff-acc-col25">
                  <label 
                  htmlFor="create-staff-email-textfield"
                  className="create-staff-acc-label"
                  >Staff Email</label>
                </div>
                  <TextField 
                  data-testid="staff-field"
                  className="create-staff-acc-textfield"
                  id="create-staff-email-textfield"
                  variant="outlined" 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}/>
              </Grid>
              <Grid item xs = {12}>
                <div className="create-staff-acc-col25">
                  <label 
                  htmlFor="create-staff-password-textfield"
                  className="create-staff-acc-label"
                  >Enter Password</label>
                </div>
                  <TextField
                  data-testid="password-field"
                  className="create-staff-acc-textfield"
                  id="create-staff-password-textfield" 
                  variant="outlined" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}/>
              </Grid>
              <Grid item xs = {12}>
                <div className="create-staff-acc-col25">
                  <label 
                  htmlFor="create-staff-repassword-textfield"
                  className="create-staff-acc-label"
                  >Re-enter Password</label>
                </div>
                  <TextField 
                  data-testid="renter-field"
                  className="create-staff-acc-textfield"
                  id="create-staff-repassword-textfield"
                  variant="outlined" 
                  type="password"
                  value={rePassword}
                  onChange={(e) => setRePassword(e.target.value)}/>
              </Grid>
              <Grid item xs = {12}>
                <div className="create-staff-acc-col25">
                  <label 
                  htmlFor="create-staff-phone-number-textfield"
                  className="create-staff-acc-label"
                  >Staff Phone Number</label>
                </div>
                  <TextField 
                  data-testid="staff-phone"
                  className="create-staff-acc-textfield"
                  id="create-staff-phone-number-textfield"
                  variant="outlined" 
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}/>
              </Grid>
              <Grid item xs = {12}>
                <div className="create-staff-acc-col25">
                  <label 
                  htmlFor="create-staff-building-id-select"
                  className="create-staff-acc-label"
                  >Select Building</label>
                </div>
                <Select
                id="create-staff-building-id-select"
                className="create-staff-acc-textfield"
                value={buildingID}
                variant='outlined'
                inputProps={{ "data-testid": "create-staff-building-id-select" }}
                onChange={(e) => setBuildingID(e.target.value)}
                input={<OutlinedInput />}>
                  {buildingOptions.map((building) => (
                    <MenuItem
                    key={building.id} 
                    value={building.id}
                    id={building.id}>
                    {building.name},{building.address}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs = {12}>
                <Button
                data-testid="create-staff-submit-button"
                id="create-staff-submit-button"
                onClick={handleSubmit}
                variant="contained"
                className="create-staff-acc-button">
                  Create Staff Account
                </Button>
              </Grid>
            </Grid>     
        {formError && <p className="create-ticket-error">{formError}</p>}
      </form>
    </div>
  );
};

export default CreateStaffAcc;
