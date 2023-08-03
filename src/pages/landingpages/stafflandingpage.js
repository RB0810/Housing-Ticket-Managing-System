import React from 'react';
import '../../styles/landlordlandingpage.css';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

export default function StaffLandingPage() {
  const navigate = useNavigate();
  const { StaffID } = useParams();
  var status = "";

  useEffect(() => {
    const userId = Cookies.get('userId');
    const type = Cookies.get('type');

    if (!userId || !type) {
      // If any of the required cookies are missing, redirect to the login page
      console.log('Unauthorized');
      navigate("/unauthorize");
    } else {
      // Check if the user's ID and type match the expected values (e.g., StaffID and "Staff")
      if (Number(userId) === parseInt(StaffID) && type === "Staff") {
        // Proceed with rendering the component
        console.log('Authorized');
      } else {
        // If not authorized, display "Unauthorized access" message
        console.log('Unauthorized');
        navigate("/unauthorize");
      }
    }
  }, [navigate, StaffID]);

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
        <button className="card" id='button-pending-tickets' onClick={handleButtonClickPending}>
          <img src="/pendingticket.png" alt="Card" className="card-image" />
          <div>
            <button>Pending Tickets</button>
          </div>
        </button>
        <button id='button-active-tickets' className="card" onClick={handleButtonClickActive}>
          <img src="/activeticket.png" alt="Card" className="card-image" />
          <div>
            <button>Active Tickets</button>
          </div>
        </button>
        <button id='button-closed-tickets' className="card" onClick={handleButtonClickClosed}>
          <img src="/closedticket.png" alt="Card" className="card-image" />
          <div>
            <button>Closed Tickets</button>
          </div>
        </button>
      </div>
    </div>
  );
}

