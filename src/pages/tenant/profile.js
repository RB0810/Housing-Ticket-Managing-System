import React, { useEffect, useState } from "react";
import AccountManager from "../../managers/accountmanager";
import { Link, useParams } from "react-router-dom";

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
    <div>
      <p>Name: {tenant.TenantName}</p>
      <p>Email: {tenant.TenantEmail}</p>
      <p>Phone: {tenant.TenantPhone}</p>
      <p>Supervisor Details</p>
      <p>Supervisor Name: {tenant.SupervisorDetails.SupervisorName}</p>
      <p>Supervisor Email: {tenant.SupervisorDetails.SupervisorEmail}</p>
      <p>Supervisor Phone: {tenant.SupervisorDetails.SupervisorPhone}</p>
      <p>Lease Details</p>
      <p>Commencement Date: {new Date(tenant.LeaseDetails.CommenceDate).toLocaleDateString()}</p>
      <p>Termination Date: {new Date(tenant.LeaseDetails.TerminationDate).toLocaleDateString()}</p>
      <p>Monthly Rental: {tenant.LeaseDetails.MonthlyRental} </p>
      <p>Trade Type: {tenant.LeaseDetails.TradeType} </p>
      <p>Area (sq meters): {tenant.LeaseDetails.AreaInSqMeters} </p>
      <p>Building: {tenant.BuildingDetails.BuildingName}, {tenant.BuildingDetails.Address}, {tenant.BuildingDetails.PostalCode} </p>
      <p>Units: {unitNumbers} </p>
      <Link to={`/`}><button>Logout</button></Link>

      <div>
            <h4>Set New Password</h4>
            <input type="password" placeholder="New Password" value={newPassword} onChange={handleNewPasswordChange} />
            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
            {formError && <p className="set-password-error">{formError}</p>}
            <button onClick={handleSetPassword}>Set Password</button>
      </div>
    </div>
  );
};

export default TenantProfile;
