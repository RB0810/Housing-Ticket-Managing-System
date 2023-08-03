import React, { useEffect, useState } from "react";
import AccountManager from "../../managers/accountmanager";
import { Link, useParams, useNavigate } from "react-router-dom";
import Authentication from "../../managers/authentication";
import Cookies from "js-cookie";
import {Button, Grid, TextField} from '@mui/material'
import Swal from "sweetalert2";

const StaffProfile = () => {
  const { StaffID } = useParams();
  const [staff, setStaff] = useState(null);
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
      // Check if the user's ID and type match the expected values (e.g., StaffID and "Staff")
      if (Number(userId) === parseInt(StaffID) && type === "Staff") {
        // Proceed with rendering the component
        console.log('Authorized');
      } else {
        // If not authorized, display "Unauthorized access" message
        console.log('Unauthorized');
        navigate("/unauthorize");
      }
    }
  }, [navigate, StaffID]);

  useEffect(() => {
    const fetchTenantDetails = async () => {
      const accountManager = new AccountManager();
      const staffDetails = await accountManager.getStaffDetails(StaffID);
      setStaff(staffDetails);
    };

    fetchTenantDetails();
  }, [StaffID]);

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const logout = () => {
    const authentication = new Authentication();
    authentication.logout();
  }

  const handleSetPassword = async () => {
    if (newPassword && confirmPassword) {
      if (newPassword === confirmPassword) {
        const accountManager = new AccountManager();
  
        try {
          await accountManager.setPassword("Staff", StaffID, newPassword);
          setNewPassword("");
          setConfirmPassword("");
          Swal.fire({
            icon: "success",
            title: "Password changed successfully!",
            showConfirmButton: true,
            confirmButtonColor: "#707c4f"
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
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
  

  if (!staff) {
    return <p>Loading staff details...</p>;
  }
  const building_address = staff.BuildingDetails.BuildingName.concat(', ',staff.BuildingDetails.Address,', ', staff.BuildingDetails.PostalCode) 

  return (
    <div className="staff-profile-page">
      <div className="staff-profile-row">
        <div className="staff-profile-col25">
          <h2 className="staff-profile-label">Personal Details</h2>
        </div>
        <div className="staff-profile-col75">
          <Grid container spacing={1}>
              <Grid item xs = {12}>
                  <TextField 
                  className="staff-profile-textfield"
                  id="outlined-basic" 
                  label="Name" 
                  variant="filled" 
                  defaultValue={staff.StaffName}
                  InputProps={{readOnly: true,}}/>
              </Grid>
              <Grid item xs = {12}>
                  <TextField 
                  className="staff-profile-textfield"
                  id="outlined-basic" 
                  label="Email" 
                  variant="filled" 
                  defaultValue={staff.StaffEmail}
                  InputProps={{readOnly: true,}}/>
              </Grid>
              <Grid item xs = {12}>
                  <TextField 
                  className="staff-profile-textfield"
                  id="outlined-basic" 
                  label="Phone" 
                  variant="filled" 
                  defaultValue={staff.StaffPhone}
                  InputProps={{readOnly: true,}}/>
              </Grid>
            </Grid>
          <hr></hr>
          
          <h2>Set New Password</h2>
          
          <Grid container spacing={1}>
            <Grid item xs = {12}>
              <TextField 
              type="password"
              className="staff-profile-textfield"
              id="staff-portal-new-password-textfield"
              label="New Password" 
              variant="outlined" 
              defaultValue={newPassword}
              onChange={handleNewPasswordChange}/>
            </Grid>
            <Grid item xs = {12}>
              <TextField 
              type="password"
              className="staff-profile-textfield"
              id="staff-portal-confirm-password-textfield"
              label="Confirm Password" 
              variant="outlined" 
              defaultValue={newPassword}
              onChange={handleConfirmPasswordChange}/>
            </Grid>
            <Grid item xs = {12}>
              <Button 
              id="staff-portal-reset-password-button"
              variant="contained"
              className="staff-profile-button"
              onClick={handleSetPassword}>
                Reset Password
              </Button>
            </Grid>
          </Grid>

          {formError && <p className="set-password-error">{formError}</p>}
        </div>
      </div>
      <hr></hr>
      <div className="staff-profile-row">
        <div className="staff-profile-col25">
          <h2 className="staff-profile-label">Supervisor Details</h2>
        </div>
        <div className="staff-profile-col75">
          <Grid container spacing={1}>
            <Grid item xs = {12}>
                <TextField 
                className="staff-profile-textfield"
                id="outlined-basic" 
                label="Supervisor Name" 
                variant="filled" 
                defaultValue={staff.SupervisorDetails.SupervisorName}
                InputProps={{readOnly: true,}}/>
            </Grid>
            <Grid item xs = {12}>
                <TextField 
                className="staff-profile-textfield"
                id="outlined-basic" 
                label="Supervisor Email" 
                variant="filled" 
                defaultValue={staff.SupervisorDetails.SupervisorEmail}
                InputProps={{readOnly: true,}}/>
            </Grid>
            <Grid item xs = {12}>
                <TextField 
                className="staff-profile-textfield"
                id="outlined-basic" 
                label="Supervisor Phone" 
                variant="filled" 
                defaultValue={staff.SupervisorDetails.SupervisorPhone}
                InputProps={{readOnly: true,}}/>
            </Grid>
            <Grid item xs = {12}>
                <TextField 
                className="staff-profile-textfield"
                id="outlined-basic" 
                label="Building Address" 
                variant="filled" 
                defaultValue={building_address}
                InputProps={{readOnly: true,}}/>
            </Grid>
          </Grid>
        </div>
      </div>
      <hr></hr>
      <div className="staff-profile-row">
        <Link to={`/`}>
          <Button
            id="staff-portal-logout-button"
            variant="contained"
            className="staff-profile-button">
              Logout
          </Button>
        </Link>
      </div>
      

      
    </div>
  );
};

export default StaffProfile;
