import React from 'react';
import '../../styles/landlordlandingpage.css';
import { useNavigate, useParams } from 'react-router-dom';

export default function LandlordLandingPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  var status = "";

  const handleButtonClickPending = () => {
    status = "pending";
    navigate(`/landlordportal/${id}/${status}`);
  };

  const handleButtonClickActive = () => {
    status = "active"
    navigate(`/landlordportal/${id}/${status}`);
  };

  const handleButtonClickClosed = () => {
    status = "closed"
    navigate(`/landlordportal/${id}/${status}`);
  };
  const handleButtonClickNew = () => {
    navigate(`/createtennantacc/${id}`);
  };

  return (
    <div>
      <div className="centered-card">
        <button className="card" onClick={handleButtonClickNew}>
          <img src="/createtenant.png" alt="Card" className="card-image" />
          <div>
            <button>Create Tenant Account</button>
          </div>
        </button>
        
      </div>
      <div className="card-container">
        <button className="card" onClick={handleButtonClickPending}>
          <img src="/pendingticket.png" alt="Card" className="card-image" />
          <div>
            <button>Pending Tickets</button>
          </div>
        </button>
        <button className="card" onClick={handleButtonClickActive}>
          <img src="/activeticket.png" alt="Card" className="card-image" />
          <div>
            <button>Active Tickets</button>
          </div>
        </button>
        <button className="card" onClick={handleButtonClickClosed}>
          <img src="/closedticket.png" alt="Card" className="card-image" />
          <div>
            <button>Closed Tickets</button>
          </div>
        </button>
      </div>
    </div>
  );
}

