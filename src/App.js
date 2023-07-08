import "./styles/App.css";
import Navbar from "./components/Navbar";
import LandlordLogin from "./pages/login/landlordlogin";
import TenantLogin from "./pages/login/tenantlogin";
import LandingPage from "./pages/landingpage";
import AdminLogin from "./pages/login/adminlogin";
import TenantPortal from "./pages/portal/tenantportal";
import LandlordPortal from "./pages/portal/landlordportal";
import TicketDetails from "./components/TicketDetails";
import ViewTicket from "./pages/tenant/viewticket";
import PendingTickets from "./components/PendingTickets";
import ActiveTickets from "./components/ActiveTickets";
import ClosedTickets from "./components/ClosedTickets";
import { Route, Routes } from "react-router-dom";

function App() {
  // Routing

  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/tenantlogin" element={<TenantLogin />} />
          <Route path="/landlordlogin" element={<LandlordLogin />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/ticket/:ServiceRequestID" component={TicketDetails} />
          <Route path="/tenantportal/:id" element={<TenantPortal />} />
          <Route path="/landlordportal/:id" element={<LandlordPortal />} />
          <Route path="/viewticket" element={<ViewTicket />} />
          <Route path="/viewticket/pendingtickets" element={<PendingTickets />} />
          <Route path="/viewticket/activetickets" element={<ActiveTickets />} />
          <Route path="/viewticket/closedtickets" element={<ClosedTickets />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
