import React from 'react';
import '../../styles/adminlandingpage.css';
import { useNavigate,useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { SHA256 } from 'crypto-js';

export default function AdminLandingPage() {
  const navigate = useNavigate();
  const { AdminID } = useParams();

  useEffect(() => {
    const userId = Cookies.get('userId');
    const type = Cookies.get('type');

    if (!userId || !type) {
      // If any of the required cookies are missing, redirect to the login page
      console.log('Unauthorized');
      navigate("/unauthorize");
    } else {
      const userIdAsString = String(AdminID);
      // Use SHA-256 to hash the userId
      const hashedUserId = SHA256(userIdAsString).toString();
      // Check if the user's ID and type match the expected values (e.g., AdminID and "admin")
      if (userId === hashedUserId && type === "Admin") {
        // Proceed with rendering the component
        console.log('Authorized');
      } else {
        // If not authorized, display "Unauthorized access" message
        console.log('Unauthorized');
        navigate("/unauthorize");
      }
    }
  }, [navigate, AdminID]);

  const handleButtonClickCreate = () => {
    navigate(`/adminportal/createsupervisoracc/${AdminID}`);
  };

  const handleButtonClickDelete = () => {
    navigate(`/adminportal/createstaffacc/${AdminID}`);
  };

  const handleButtonClickManage = () => {
    navigate(`/adminportal/manageacc/${AdminID}`);
  };

  return (
    <div>
      <div className="centered-card">
      <button className="card" id="admin-landing-page-manage-account" onClick={handleButtonClickManage}>
        <img src="/manageaccount.jpg" alt="Card" className="card-image" />
        <div>
          <button>Manage Accounts</button>
        </div>
      </button>
    </div>
      <div className="card-container">
        <button className="card" id="admin-landing-page-create-supervisor-account" onClick={handleButtonClickCreate}>
          <img src="/addlandlord.png" alt="Card" className="card-image" />
          <div>
            <button>Create Landlord Account <br />(Building Supervisor)</button>
          </div>
        </button>
        <button className="card" id="admin-landing-page-create-staff-account" onClick={handleButtonClickDelete}>
          <img src="/addstaff.png" alt="Card" className="card-image" />
          <div>
            <button>Create Landlord Account <br />(Staff/Engineers)</button>
          </div>
        </button>
      </div>
  </div>
    
  );
}
