import React from 'react';
import '../../styles/adminlandingpage.css';
import { useNavigate } from 'react-router-dom';

export default function AdminLandingPage() {
  const navigate = useNavigate();

  const handleButtonClickCreate = () => {
    navigate('/createlandlordacc');
  };

  const handleButtonClickDelete = () => {
    navigate('/deletelandlordacc');
  };

  return (
    <div className="card-container">
        <button className="card" onClick={handleButtonClickCreate}>
          <img src="/addlandlord.png" alt="Card" className="card-image" />
          <div>
            <button>Create Landlord Account</button>
          </div>
        </button>
        <button className="card" onClick={handleButtonClickDelete}>
          <img src="/deletelandlord.png" alt="Card" className="card-image" />
          <div>
            <button>Delete Landlord Account</button>
          </div>
        </button>
      </div>
  );
}
