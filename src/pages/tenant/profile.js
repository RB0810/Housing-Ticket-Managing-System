import React, { useEffect, useState } from "react";
import AccountManager from "../../managers/accountmanager";
import { Link, useParams, useNavigate } from "react-router-dom";
import Authentication from "../../managers/authentication";
import "./../../styles/profile.css"
import Cookies from "js-cookie";

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

  const unitNumbers = tenant.Units.map((unit) => unit.UnitNumber).join(", ");

  return (
    <div className="tenant-profile-page">
      <div className="tenant-profile-row">
        <div className="tenant-profile-col25">
          <p className="tenant-profile-label">Personal Details</p>
        </div>
        
        <div className="tenant-profile-col75">
          <p><b>Username:</b> {tenant.TenantName}</p>
          <p><b>Email:</b> {tenant.TenantEmail}</p>
          <p><b>Phone:</b> {tenant.TenantPhone}</p>

          <hr></hr>

          <div className="tenant-profile-change-password">
            <h4>Set New Password</h4>
            <input type="password" placeholder="New Password" value={newPassword} onChange={handleNewPasswordChange} />
            <br></br>
            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
            {formError && <p className="set-password-error">{formError}</p>}
            <br></br>
            <button onClick={handleSetPassword}>Set Password</button>
          </div>
        </div>
      </div>
      
        <hr></hr>

      <div className="tenant-profile-row">
        <div className="tenant-profile-col25">
          <p className="tenant-profile-label">Supervisor Details</p>
        </div>
        
        <div className="tenant-profile-col75">
          <p><b>Supervisor Name:</b> {tenant.SupervisorDetails.SupervisorName}</p>
          <p><b>Supervisor Email:</b> {tenant.SupervisorDetails.SupervisorEmail}</p>
          <p><b>Supervisor Phone:</b> {tenant.SupervisorDetails.SupervisorPhone}</p>
        </div>
      </div>

      <hr></hr>
      
      <div className="tenant-profile-row">
        <div className="tenant-profile-col25">
          <p className="tenant-profile-label">Lease Details</p>
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
        <button onClick={logout}>Logout</button>
      </div>
      
      
    </div>
  );
};

export default TenantProfile;
