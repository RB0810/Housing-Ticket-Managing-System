import React, { useEffect, useState } from "react";
import AccountManager from "../../managers/accountmanager";
import { Link, useParams } from "react-router-dom";
import BuildingDetails from "../../components/BuildingDetails";
import './../../styles/profile.css'

const SupervisorProfile = () => {
  const { SupervisorID } = useParams();
  const [supervisor, setSupervisor] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState(null);
  const [buildingDetails, setBuildingDetails] = useState(null);
  const accountManager = new AccountManager();

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


  const handleSetPassword = async () => {
    if (newPassword === confirmPassword) {
      try {
        await accountManager.setPassword("Supervisor", SupervisorID, newPassword);
        setNewPassword("");
        setConfirmPassword("");
        setFormError("Password Changed Successfully!");
      } catch (error) {
        console.error("Error setting password:", error);
        setFormError("Database Error");
      }
    } else {
      setFormError("Passwords do not match!");
    }
  };

  if (!supervisor || !buildingDetails) {
    return <p>Loading supervisor details...</p>;
  }

  return (
    <div>
      <div className="supervisor-profile-row">
        <div className="supervisor-profile-col25">
          <p className="supervisor-profile-label">Personal Details</p>
        </div>
        
        <div className="supervisor-profile-col75">
          <p><b>Username:</b> {supervisor.SupervisorUsername}</p>
          <p><b>Email:</b> {supervisor.SupervisorEmail}</p>
          <p><b>Phone:</b> {supervisor.SupervisorPhone}</p>
          <p>
            <b>Building Details: </b>{supervisor.BuildingDetails.BuildingName}, {supervisor.BuildingDetails.Address}, {supervisor.BuildingDetails.PostalCode}
          </p>

          <h4>Set New Password: </h4>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={handleNewPasswordChange}
          />
          <br/>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          {formError && <p className="set-password-error">{formError}</p>}

          <br/>

          <button onClick={handleSetPassword}>Set Password</button>
        </div>
      </div>
      
        
      <hr></hr>

      <BuildingDetails building={buildingDetails} />

      <hr></hr>

      <Link to={`/`}>
        <button>Logout</button>
      </Link>

      
    </div>
  );
};

export default SupervisorProfile;
