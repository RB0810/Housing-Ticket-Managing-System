import React from 'react';
import '../../styles/adminportalcss/adminlandingpage.css';
import { useNavigate } from 'react-router-dom';

export default function AdminLandingPage() {
  const navigate = useNavigate();

  const handleButtonClickCreate = () => {
    navigate('../../pages/adminportal/createlandlordacc.js');
  };

  const handleButtonClickDelete = () => {
    navigate('../../pages/adminportal/deletelandlordacc.js');
  };

  return (
    <div className="card-container">
        <div className="card">
          <img src="/addlandlord.png" alt="Card" className="card-image" />
          <div>
            <button onClick={handleButtonClickCreate}>Create Landlord Account</button>
          </div>
        </div>
        <div className="card">
          <img src="/deletelandlord.png" alt="Card" className="card-image" />
          <div>
            <button onClick={handleButtonClickDelete}>Delete Landlord Account</button>
          </div>
        </div>
      </div>
  );
}
