import React from "react";
import { useState, useEffect } from "react";
import "../../styles/createaccount.css";
import SupervisorAccount from "../../objects/SupervisorAccount";
import { useParams, useNavigate } from "react-router";
import { Grid,TextField, Button } from "@mui/material";
import Swal from "sweetalert2";
;

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
        confirmButtonColor: "#707c4f",
        customClass: {
          container: 'createSupervisorAcc'
        },
        id: 'createSupervisorAcc'
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
                <label htmlFor="create-supervisor-username-textfield">Supervisor Username:</label>
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
                <label htmlFor="create-supervisor-email-textfield">Supervisor Email:</label>
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
                <label htmlFor="create-supervisor-password-textfield">Enter Password:</label>
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
                <label htmlFor="create-supervisor-repassword-textfield">Re-enter Password:</label>
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
                <label htmlFor="create-supervisor-phone-number-textfield">Supervisor Phone:</label>
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
                <label htmlFor="create-supervisor-building-name-textfield">Building Name:</label>
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
                <label htmlFor="create-supervisor-building-address-textfield">Building Address:</label>
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
                <label htmlFor="create-supervisor-postal-code-textfield">Postal Code:</label>
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
                data-testid="create-supervisor-submit-button"
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
