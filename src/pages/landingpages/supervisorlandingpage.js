import React from 'react';
import '../../styles/landlordlandingpage.css';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

export default function SupervisorLandingPage() {
  const navigate = useNavigate();
  const { SupervisorID } = useParams();
  var status = "";

  useEffect(() => {
    const userId = Cookies.get('userId');
    const type = Cookies.get('type');

    if (!userId || !type) {
      // If any of the required cookies are missing, redirect to the login page
      console.log('Unauthorized');
      navigate("/unauthorize");
    } else {
      // Check if the user's ID and type match the expected values (e.g., SupervisorID and "Supervisor")
      if (Number(userId) === parseInt(SupervisorID) && type === "Supervisor") {
        // Proceed with rendering the component
        console.log('Authorized');
      } else {
        // If not authorized, display "Unauthorized access" message
        console.log('Unauthorized');
        navigate("/unauthorize");
      }
    }
  }, [navigate, SupervisorID]);

  const handleButtonClickPending = () => {
    status = "pending";
    navigate(`/supervisorportal/tickets/${SupervisorID}/${status}`);
  };

  const handleButtonClickActive = () => {
    status = "active"
    navigate(`/supervisorportal/tickets/${SupervisorID}/${status}`);
  };

  const handleButtonClickClosed = () => {
    status = "closed"
    navigate(`/supervisorportal/tickets/${SupervisorID}/${status}`);
  };
  const handleButtonClickNew = () => {
    navigate(`/supervisorportal/createtennantacc/${SupervisorID}`);
  };

  return (
    <div>
      <div className="centered-card">
          <button className="card" onClick={handleButtonClickNew}>
            <img src="/createtenant.png" alt="Card" className="card-image" />
            <div><button>Create Tenant Account</button></div>
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

