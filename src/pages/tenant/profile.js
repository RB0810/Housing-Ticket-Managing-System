import React, { useEffect, useState } from "react";
import AccountManager from "../../managers/accountmanager";
import { Link, useParams, useNavigate } from "react-router-dom";
import Authentication from "../../managers/authentication";
import "./../../styles/profile.css"
import Cookies from "js-cookie";
import {Button, Grid, TextField} from '@mui/material'

const TenantProfile = () => {
  const { TenantID } = useParams();
  const [tenant, setTenant] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState(null);
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
      if (Number(userId) === parseInt(TenantID) && type === "Tenant") {
        // Proceed with rendering the component
        console.log('Authorized');
      } else {
        // If not authorized, display "Unauthorized access" message
        console.log('Unauthorized');
        navigate("/unauthorize");
      }
    }
  }, [navigate, TenantID]);

  useEffect(() => {
    const fetchTenantDetails = async () => {
      const accountManager = new AccountManager();
      const tenantDetails = await accountManager.getTenantDetails(TenantID);
      setTenant(tenantDetails);
    };

    fetchTenantDetails();
  }, [TenantID]);

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const logout = () => {
    const authentication = new Authentication();
    authentication.logout();
  }

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSetPassword = async () => {
    if (newPassword && confirmPassword) {
      if (newPassword === confirmPassword) {
        const accountManager = new AccountManager();
  
        try {
          await accountManager.setPassword("Tenant", TenantID, newPassword);
          setNewPassword("");
          setConfirmPassword("");
          setFormError("Password Changed Successfully!");
        } catch (error) {
          setFormError("Database Error");
        }
      } else {
        setFormError("Passwords do not match!");
      }
    } else {
      setFormError("Please fill in all fields!");
    }
  };
  

  if (!tenant) {
    return <p>Loading tenant details...</p>;
  }

  const building_address = tenant.BuildingDetails.BuildingName.concat(', ',tenant.BuildingDetails.Address,', ', tenant.BuildingDetails.PostalCode) 

  const unitNumbers = tenant.Units.map((unit) => unit.UnitNumber).join(", ");

  return (
    <div className="tenant-profile-page">
      <div className="tenant-profile-row">
        <div className="tenant-profile-col25">
          <h1 className="tenant-profile-label">Personal Details</h1>
        </div>
        <div className="tenant-profile-col75">
          <Grid container spacing={1}>
            <Grid item xs = {12}>
                <TextField 
                className="tenant-profile-textfield"
                id="outlined-basic" 
                label="Username" 
                variant="filled" 
                defaultValue={tenant.TenantName}
                InputProps={{readOnly: true,}}/>
            </Grid>
            <Grid item xs = {12}>
                <TextField 
                className="tenant-profile-textfield"
                id="outlined-basic" 
                label="Email" 
                variant="filled" 
                defaultValue={tenant.TenantEmail}
                InputProps={{readOnly: true,}}/>
            </Grid>
            <Grid item xs = {12}>
                <TextField 
                className="tenant-profile-textfield"
                id="outlined-basic" 
                label="Phone Number" 
                variant="filled" 
                defaultValue={tenant.TenantPhone}
                InputProps={{readOnly: true,}}/>
            </Grid>
          </Grid>

          <hr></hr>
          
          <h2>Set New Password</h2>
          
          <Grid container spacing={1}>
            <Grid item xs = {12}>
              <TextField 
              type="password"
              className="tenant-profile-textfield"
              id="outlined-basic" 
              label="New Password" 
              variant="outlined" 
              defaultValue={newPassword}
              onChange={handleNewPasswordChange}/>
            </Grid>
            <Grid item xs = {12}>
              <TextField 
              type="password"
              className="tenant-profile-textfield"
              id="filled-basic" 
              label="Confirm Password" 
              variant="outlined" 
              defaultValue={newPassword}
              onChange={handleConfirmPasswordChange}/>
            </Grid>
            <Grid item xs = {12}>
              <Button 
              variant="contained"
              className="tenant-profile-button"
              onClick={handleSetPassword}>
                Reset Password
              </Button>
            </Grid>
          </Grid>

          {formError && <p className="set-password-error">{formError}</p>}

        </div>
      </div>
      
        <hr></hr>

      <div className="tenant-profile-row">
        <div className="tenant-profile-col25">
          <h1 className="tenant-profile-label">Supervisor Details</h1>
        </div>
        <div className="tenant-profile-col75">
        <Grid container spacing={1}>
            <Grid item xs = {12}>
              <TextField 
              className="tenant-profile-textfield"
              id="outlined-basic" 
              label="Supervisor Name" 
              variant="filled" 
              defaultValue={tenant.SupervisorDetails.SupervisorName}
              InputProps={{readOnly: true,}}/>
            </Grid>
            <Grid item xs = {12}>
              <TextField 
              className="tenant-profile-textfield"
              id="outlined-basic" 
              label="Supervisor Email" 
              variant="filled" 
              defaultValue={tenant.SupervisorDetails.SupervisorEmail}
              InputProps={{readOnly: true,}}/>
            </Grid>
            <Grid item xs = {12}>
              <TextField 
              className="tenant-profile-textfield"
              id="outlined-basic" 
              label="Supervisor Phone" 
              variant="filled" 
              defaultValue={tenant.SupervisorDetails.SupervisorPhone}
              InputProps={{readOnly: true,}}/>
            </Grid>
        </Grid>
        </div>
      </div>

      <hr></hr>
      
      <div className="tenant-profile-row">
        <div className="tenant-profile-col25">
          <h1 className="tenant-profile-label">Lease Details</h1>
        </div>
        
        <div className="tenant-profile-col75">
        <Grid container spacing={1}>
          <Grid item xs = {12}>
            <TextField 
            className="tenant-profile-textfield"
            id="outlined-basic" 
            label="Commencement Date" 
            variant="filled" 
            defaultValue={new Date(tenant.LeaseDetails.CommenceDate).toLocaleDateString()}
            InputProps={{readOnly: true,}}/>
          </Grid> 
          <Grid item xs = {12}>
            <TextField 
            className="tenant-profile-textfield"
            id="outlined-basic" 
            label="Termination Date" 
            variant="filled" 
            defaultValue={new Date(tenant.LeaseDetails.TerminationDate).toLocaleDateString()}
            InputProps={{readOnly: true,}}/>
          </Grid> 
          <Grid item xs = {12}>
            <TextField 
            className="tenant-profile-textfield"
            id="outlined-basic" 
            label="Monthly Rental" 
            variant="filled" 
            defaultValue={tenant.LeaseDetails.MonthlyRental}
            InputProps={{readOnly: true,}}/>
          </Grid> 
          <Grid item xs = {12}>
            <TextField 
            className="tenant-profile-textfield"
            id="outlined-basic" 
            label="Trade Type" 
            variant="filled" 
            defaultValue={tenant.LeaseDetails.TradeType}
            InputProps={{readOnly: true,}}/>
          </Grid> 
          <Grid item xs = {12}>
            <TextField 
            className="tenant-profile-textfield"
            id="outlined-basic" 
            label="Area (sq meters)" 
            variant="filled" 
            defaultValue={tenant.LeaseDetails.AreaInSqMeters}
            InputProps={{readOnly: true,}}/>
          </Grid> 
          <Grid item xs = {12}>
            <TextField 
            className="tenant-profile-textfield"
            id="outlined-basic" 
            label="Building" 
            variant="filled" 
            defaultValue={building_address}
            InputProps={{readOnly: true,}}/>
          </Grid> 
          <Grid item xs = {12}>
            <TextField 
            className="tenant-profile-textfield"
            id="outlined-basic" 
            label="Units" 
            variant="filled" 
            defaultValue={unitNumbers}
            InputProps={{readOnly: true,}}/>
          </Grid> 
        </Grid>
        </div>
      </div>

      <hr></hr>

      <div className="tenant-profile-row">
        <Button variant="contained" className="tenant-profile-button"onClick={logout}>Logout</Button>
      </div>
    </div>
  );
};

export default TenantProfile;
