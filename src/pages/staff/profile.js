import React, { useEffect, useState } from "react";
import AccountManager from "../../managers/accountmanager";
import { Link, useParams } from "react-router-dom";

const StaffProfile = () => {
  const { StaffID } = useParams();
  const [staff, setStaff] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSetPassword, setShowSetPassword] = useState(false);
  const [formError, setFormError] = useState(null);

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

  const handleToggleSetPassword = () => {
    setShowSetPassword(!showSetPassword);
  };

  const handleSetPassword = async () => {
    if (newPassword === confirmPassword) {
      const accountManager = new AccountManager();

      try{
        await accountManager.setPassword("Staff", StaffID, newPassword);
        setNewPassword("");
        setConfirmPassword("");
        setFormError("Password Changed Successfully!");
      }catch(error){
        setFormError("Database Error");
      }
        
    } else {
      setFormError("Passwords do not match!");
    }
  };

  if (!staff) {
    return <p>Loading staff details...</p>;
  }

  return (
    <div>
      <p>Username: {staff.StaffUsername}</p>
      <p>Email: {staff.StaffEmail}</p>
      <p>Phone: {staff.StaffPhone}</p>
      <p>Ticket Category: {staff.TicketCategory}</p>
      <p>Supervisor Details</p>
      <p>Supervisor Name: {staff.SupervisorDetails.SupervisorUsername}</p>
      <p>Supervisor Email: {staff.SupervisorDetails.SupervisorEmail}</p>
      <p>Supervisor Phone: {staff.SupervisorDetails.SupervisorPhone}</p>
      <p>{staff.BuildingDetails.BuildingName}, {staff.BuildingDetails.Address}, {staff.BuildingDetails.PostalCode} </p>
      <Link to={`/`}><button>Logout</button></Link>

      <div>
        <button onClick={handleToggleSetPassword}>Change Password</button>
        {showSetPassword && (
          <div>
            <h4>Set New Password</h4>
            <input type="password" placeholder="New Password" value={newPassword} onChange={handleNewPasswordChange} />
            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
            {formError && <p className="set-password-error">{formError}</p>}
            <button onClick={handleSetPassword}>Set Password</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffProfile;
