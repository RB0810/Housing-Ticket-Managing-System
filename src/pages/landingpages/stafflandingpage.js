<<<<<<< HEAD
import React from 'react';
import '../../styles/landlordlandingpage.css';
import { useNavigate, useParams } from 'react-router-dom';

export default function StaffLandingPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  var status = "";

  const handleButtonClickPending = () => {
    status = "pending";
    navigate(`/staffportal/${id}/${status}`);
  };

  const handleButtonClickActive = () => {
    status = "active"
    navigate(`/staffportal/${id}/${status}`);
  };

  const handleButtonClickClosed = () => {
    status = "closed"
    navigate(`/staffportal/${id}/${status}`);
  };

  return (
    <div>
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

=======
import React from 'react';
import '../../styles/landlordlandingpage.css';
import { useNavigate, useParams } from 'react-router-dom';

export default function StaffLandingPage() {
  const navigate = useNavigate();
  const { StaffID } = useParams();
  var status = "";

  const handleButtonClickPending = () => {
    status = "pending";
    navigate(`/staffportal/tickets/${StaffID}/${status}`);
  };

  const handleButtonClickActive = () => {
    status = "active"
    navigate(`/staffportal/tickets/${StaffID}/${status}`);
  };

  const handleButtonClickClosed = () => {
    status = "closed"
    navigate(`/staffportal/tickets/${StaffID}/${status}`);
  };

  return (
    <div>
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

>>>>>>> a68d74b2e817c7184e70c9d65d952e983e357804
