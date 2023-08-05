import React from 'react';
import { useEffect } from 'react';
import '../../styles/tenantlandingpage.css';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { SHA256 } from 'crypto-js';

export default function TenantLandingPage() {
  const navigate = useNavigate();
  const { TenantID } = useParams();
  var status = "";

  useEffect(() => {
    const userId = Cookies.get('userId');
    const type = Cookies.get('type');

    if (!userId || !type) {
      // If any of the required cookies are missing, redirect to the login page
      console.log('Unauthorized');
      navigate("/unauthorize");
    } else {
      const userIdAsString = String(TenantID);
      // Use SHA-256 to hash the userId
      const hashedUserId = SHA256(userIdAsString).toString();
      console.log(hashedUserId)
      // Check if the user's ID and type match the expected values (e.g., TenantID and "tenant")
      if (userId === hashedUserId && type === "Tenant") {
        // Proceed with rendering the component
        console.log('Authorized');
      } else {
        // If not authorized, display "Unauthorized access" message
        console.log('Unauthorized');
        navigate("/unauthorize");
      }
    }
  }, [navigate, TenantID]);

  const handleButtonClickPending = () => {
    status = "pending";
    navigate(`/tenantportal/tickets/${TenantID}/${status}`);
  };

  const handleButtonClickActive = () => {
    status = "active";
    navigate(`/tenantportal/tickets/${TenantID}/${status}`);
  };

  const handleButtonClickClosed = () => {
    status = "closed";
    navigate(`/tenantportal/tickets/${TenantID}/${status}`);
  };
  const handleButtonClickNew = () => {
    navigate(`/tenantportal/createticket/${TenantID}`);
  };

  return (
    <div>
      <div className="centered-card">
        <button id='create-new-ticket-button' className="card" onClick={handleButtonClickNew}>
          <img src="/addticket.png" alt="Card" className="card-image" />
          <div>
            <button>Create Ticket</button>
          </div>
        </button>
        
      </div>
      <div className="card-container">
        <button id='pending-tickets-button' className="card" onClick={handleButtonClickPending}>
          <img src="/pendingticket.png" alt="Card" className="card-image" />
          <div>
            <button>Pending Tickets</button>
          </div>
        </button>
        <button className="card" id='active-tickets-button' onClick={handleButtonClickActive}>
          <img id='active-tickets-button' src="/activeticket.png" alt="Card" className="card-image" />
          <div>
            <button>Active Tickets</button>
          </div>
        </button>
        <button className="card" id='closed-tickets-button' onClick={handleButtonClickClosed}>
          <img id='closed-tickets-button' src="/closedticket.png" alt="Card" className="card-image" />
          <div>
            <button>Closed Tickets</button>
          </div>
        </button>
      </div>
    </div>
  );
}
