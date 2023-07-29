import React, { useEffect, useState } from "react";
import AccountManager from "../../managers/accountmanager";
import { Link, useParams, useNavigate } from "react-router-dom";
import BuildingDetails from "../../components/BuildingDetails";
import './../../styles/profile.css'
import Authentication from "../../managers/authentication";
import Cookies from "js-cookie";

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
      // Check if the user's ID and type match the expected values (e.g., SupervisorID and "Supervisor")
      if (Number(userId) === parseInt(SupervisorID) && type === "Supervisor") {
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
          <p><b>Username:</b> {supervisor.SupervisorName}</p>
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

      <button onClick={logout}>Logout</button>

      
    </div>
  );
};

export default SupervisorProfile;
