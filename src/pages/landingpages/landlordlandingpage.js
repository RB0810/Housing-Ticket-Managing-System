import React from 'react';
import '../../styles/landlordlandingpage.css';
import { useNavigate } from 'react-router-dom';



export default function LandlordLandingPage() {
  const navigate = useNavigate();

  const handleButtonClickPending = () => {
    navigate('/pendingtickets');
  };

  const handleButtonClickActive = () => {
    navigate('/activetickets');
  };

  const handleButtonClickClosed = () => {
    navigate('/closedtickets');
  };
  const handleButtonClickNew = () => {
    navigate('/createtenantacc');
  };

  return (
    <div>
      <div className="centered-card">
        <div className="card">
          <img src="/createtenant.png" alt="Card" className="card-image" />
          <div>
            <button onClick={handleButtonClickNew}>Create Tenant Account</button>
          </div>
        </div>
        
      </div>
      <div className="card-container">
        <div className="card">
          <img src="/pendingticket.png" alt="Card" className="card-image" />
          <div>
            <button onClick={handleButtonClickPending}>Pending Tickets</button>
          </div>
        </div>
        <div className="card">
          <img src="/activeticket.png" alt="Card" className="card-image" />
          <div>
            <button onClick={handleButtonClickActive}>Active Tickets</button>
          </div>
        </div>
        <div className="card">
          <img src="/closedticket.png" alt="Card" className="card-image" />
          <div>
            <button onClick={handleButtonClickClosed}>Closed Tickets</button>
          </div>
        </div>
      </div>
    </div>
  );
}

