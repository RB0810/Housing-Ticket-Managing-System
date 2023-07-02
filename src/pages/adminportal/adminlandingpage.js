import React from 'react';
import '../../styles/adminportalcss/adminlandingpage.css';
import { useNavigate } from 'react-router-dom';

export default function AdminLandingPage() {
  const navigate = useNavigate();

  const handleButtonClickPending = () => {
    navigate('../../pages/adminportal/pendingtickets.js');
  };

  const handleButtonClickActive = () => {
    navigate('../../pages/adminportal/activetickets.js');
  };

  const handleButtonClickClosed = () => {
    navigate('../../pages/adminportal/closedtickets.js');
  };
  const handleButtonClickNew = () => {
    navigate('../../pages/adminportal/createticket.js');
  };

  return (
    <div>
      <div className="centered-card">
        <div className="card">
          <img src="/addticket.png" alt="Card" className="card-image" />
          <div>
            <button onClick={handleButtonClickNew}>Create Ticket</button>
          </div>
        </div>
        
      </div>
      <div className="card-container">
        <div className="card">
          <img src="/pendingticket.png" alt="Card" className="card-image" />
          <div>
            <button onClick={handleButtonClickActive}>Active Tickets</button>
          </div>
        </div>
        <div className="card">
          <img src="/activeticket.png" alt="Card" className="card-image" />
          <div>
            <button onClick={handleButtonClickPending}>Pending Tickets</button>
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
