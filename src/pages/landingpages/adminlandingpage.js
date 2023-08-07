import React from 'react';
import '../../styles/adminlandingpage.css';
import { useNavigate,useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { SHA256 } from 'crypto-js';

export default function AdminLandingPage() {
  const navigate = useNavigate();
  const { AdminID } = useParams();


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
