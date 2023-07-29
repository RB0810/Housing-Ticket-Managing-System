import React, { useEffect, useState } from "react";
import AccountManager from "../../managers/accountmanager";
import { Link, useParams, useNavigate } from "react-router-dom";
import Authentication from "../../managers/authentication";
import Cookies from "js-cookie";

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
  

  if (!staff) {
    return <p>Loading staff details...</p>;
  }

  return (
    <div>
      <p>Name: {staff.StaffName}</p>
      <p>Email: {staff.StaffEmail}</p>
      <p>Phone: {staff.StaffPhone}</p>
      <p>Supervisor Details</p>
      <p>Supervisor Name: {staff.SupervisorDetails.SupervisorName}</p>
      <p>Supervisor Email: {staff.SupervisorDetails.SupervisorEmail}</p>
      <p>Supervisor Phone: {staff.SupervisorDetails.SupervisorPhone}</p>
      <p>{staff.BuildingDetails.BuildingName}, {staff.BuildingDetails.Address}, {staff.BuildingDetails.PostalCode} </p>
      <button onClick={logout}>Logout</button>

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

export default StaffProfile;
