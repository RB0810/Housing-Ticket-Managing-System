import React, { useEffect, useState } from "react";
import AccountManager from "../../managers/accountmanager";
import { Link, useParams, useNavigate } from "react-router-dom";
import BuildingDetails from "../../components/BuildingDetails";
import './../../styles/profile.css'
import Authentication from "../../managers/authentication";
import Cookies from "js-cookie";
import {Button, Grid, TextField} from '@mui/material'
import Swal from "sweetalert2";
import { SHA256 } from "crypto-js";

const SupervisorProfile = () => {
  const { SupervisorID } = useParams();
  const [supervisor, setSupervisor] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState(null);
  const [buildingDetails, setBuildingDetails] = useState(null);
  const accountManager = new AccountManager();
  const navigate = useNavigate();

  useEffect(() => {
    const userId = Cookies.get('userId');
    const type = Cookies.get('type');

    if (!userId || !type) {
      // If any of the required cookies are missing, redirect to the login page
      console.log('Unauthorized');
      navigate("/unauthorize");
    } else {
      const userIdAsString = String(SupervisorID);
      // Use SHA-256 to hash the userId
      const hashedUserId = SHA256(userIdAsString).toString();
      // Check if the user's ID and type match the expected values (e.g., SupervisorID and "Supervisor")
      if (userId === hashedUserId && type === "Supervisor") {
        // Proceed with rendering the component
        console.log('Authorized');
      } else {
        // If not authorized, display "Unauthorized access" message
        console.log('Unauthorized');
        navigate("/unauthorize");
      }
    }
  }, [navigate, SupervisorID]);

  useEffect(() => {
    const fetchSupervisorDetails = async () => {
      try {
        const supervisorDetails = await accountManager.getSupervisorDetails(SupervisorID);
        setSupervisor(supervisorDetails);
      } catch (error) {
        console.error("Error fetching supervisor details:", error);
      }
    };

    fetchSupervisorDetails();
  }, [SupervisorID]);

  useEffect(() => {
    const fetchBuildingDetails = async () => {
      try {
        if (supervisor && supervisor.BuildingDetails) {
          const buildingData = await accountManager.getBuildingDetails(supervisor.BuildingDetails.BuildingID);
          setBuildingDetails(buildingData);
        }
      } catch (error) {
        console.error("Error fetching building details:", error);
      }
    };

    fetchBuildingDetails();
  }, [supervisor]);

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
          await accountManager.setPassword("Supervisor", SupervisorID, newPassword);
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
  

  if (!supervisor || !buildingDetails) {
    return <p>Loading supervisor details...</p>;
  }
  
  const building_address = supervisor.BuildingDetails.BuildingName.concat(', ',supervisor.BuildingDetails.Address,', ', supervisor.BuildingDetails.PostalCode) 

  return (
    <div className="supervisor-profile-page">
      <div className="supervisor-profile-row">
        <div className="supervisor-profile-col25">
          <h2 className="supervisor-profile-label">Personal Details</h2>
        </div>
        
        <div className="supervisor-profile-col75">
          <Grid container spacing={1}>
            <Grid item xs = {12}>
              <TextField 
              className="supervisor-profile-textfield"
              id="outlined-basic" 
              label="Username" 
              variant="filled" 
              defaultValue={supervisor.SupervisorName}
              InputProps={{readOnly: true,}}/>
            </Grid>
            <Grid item xs = {12}>
              <TextField 
              className="supervisor-profile-textfield"
              id="outlined-basic" 
              label="Email" 
              variant="filled" 
              defaultValue={supervisor.SupervisorEmail}
              InputProps={{readOnly: true,}}/>
            </Grid>
            <Grid item xs = {12}>
              <TextField 
              className="supervisor-profile-textfield"
              id="outlined-basic" 
              label="Phone" 
              variant="filled" 
              defaultValue={supervisor.SupervisorPhone}
              InputProps={{readOnly: true,}}/>
            </Grid>
            <Grid item xs = {12}>
              <TextField 
              className="supervisor-profile-textfield"
              id="outlined-basic" 
              label="Building Details" 
              variant="filled" 
              defaultValue={building_address}
              InputProps={{readOnly: true,}}/>
            </Grid>
          </Grid>

          <hr></hr>

          <h2>Set New Password: </h2>

          <Grid container spacing={1}>
            <Grid item xs = {12}>
              <TextField 
              type="password"
              className="supervisor-profile-textfield"
              id="supervisor-profile-new-password-textfield" 
              label="New Password" 
              variant="outlined" 
              defaultValue={newPassword}
              onChange={handleNewPasswordChange}/>
            </Grid>
            <Grid item xs = {12}>
              <TextField 
              type="password"
              className="supervisor-profile-textfield"
              id="supervisor-profile-confirm-password-textfield" 
              label="Confirm Password" 
              variant="outlined" 
              defaultValue={newPassword}
              onChange={handleConfirmPasswordChange}/>
            </Grid>
            <Grid item xs = {12}>
              <Button 
              id="supervisor-profile-reset-password-button" 
              variant="contained"
              className="supervisor-profile-button"
              onClick={handleSetPassword}>
                Reset Password
              </Button>
            </Grid>
          </Grid>

          {formError && <p className="set-password-error">{formError}</p>}
        
        </div>
      </div>

      <hr></hr>

      <BuildingDetails building={buildingDetails} />

      <hr></hr>

      <Button
      id="supervisor-profile-logout-button"  
      variant="contained" 
      className="supervisor-profile-button" 
      onClick={logout}>
        Logout
      </Button>
    
    </div>
  );
};

export default SupervisorProfile;
