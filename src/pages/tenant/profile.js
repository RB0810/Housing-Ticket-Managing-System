import React, { useEffect, useState } from "react";
import AccountManager from "../../managers/accountmanager";
import { Link, useParams } from "react-router-dom";
import "./../../styles/profile.css"
import {Button, Grid, TextField} from '@mui/material'


const TenantProfile = () => {
  const { TenantID } = useParams();
  const [tenant, setTenant] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState(null);

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
              variant="filled" 
              defaultValue={newPassword}
              onChange={handleNewPasswordChange}/>
            </Grid>
            <Grid item xs = {12}>
              <TextField 
              type="password"
              className="tenant-profile-textfield"
              id="filled-basic" 
              label="Confirm Password" 
              variant="filled" 
              defaultValue={newPassword}
              onChange={handleConfirmPasswordChange}/>
            </Grid>
            <Grid item xs = {12}>
              <Button 
              variant="contained"
              className="tenant-profile-button">
                Reset Password
              </Button>
            </Grid>
          </Grid>
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
          <p><b>Commencement Date:</b> {new Date(tenant.LeaseDetails.CommenceDate).toLocaleDateString()}</p>
          <p><b>Termination Date:</b> {new Date(tenant.LeaseDetails.TerminationDate).toLocaleDateString()}</p>
          <p><b>Monthly Rental:</b> {tenant.LeaseDetails.MonthlyRental} </p>
          <p><b>Trade Type:</b> {tenant.LeaseDetails.TradeType} </p>
          <p><b>Area (sq meters):</b> {tenant.LeaseDetails.AreaInSqMeters} </p>
          <p><b>Building:</b> {tenant.BuildingDetails.BuildingName}, {tenant.BuildingDetails.Address}, {tenant.BuildingDetails.PostalCode} </p>
          <p><b>Units:</b> {unitNumbers} </p>
        </div>
      </div>

      <hr></hr>

      <div className="tenant-profile-row">
        <Link to={`/`}><button>Logout</button></Link>
      </div>
      
      
    </div>
  );
};

export default TenantProfile;
