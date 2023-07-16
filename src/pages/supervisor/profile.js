import React, { useEffect, useState } from "react";
import AccountManager from "../../managers/accountmanager";
import { Link, useParams } from "react-router-dom";
import BuildingDetails from "../../components/BuildingDetails";

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
      <p>Name: {supervisor.SupervisorName}</p>
      <p>Email: {supervisor.SupervisorEmail}</p>
      <p>Phone: {supervisor.SupervisorPhone}</p>
      <p>
        {supervisor.BuildingDetails.BuildingName}, {supervisor.BuildingDetails.Address}, {supervisor.BuildingDetails.PostalCode}
      </p>
      <BuildingDetails building={buildingDetails} />
      <Link to={`/`}>
        <button>Logout</button>
      </Link>

      <div>
            <h4>Set New Password</h4>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={handleNewPasswordChange}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            {formError && <p className="set-password-error">{formError}</p>}
            <button onClick={handleSetPassword}>Set Password</button>
      </div>
    </div>
  );
};

export default SupervisorProfile;
