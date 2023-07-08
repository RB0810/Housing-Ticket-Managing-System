import "./styles/App.css";
import Navbar from "./components/Navbar";
import LandlordLogin from "./pages/login/landlordlogin";
import TenantLogin from "./pages/login/tenantlogin";
import LandingPage from "./pages/landingpage";
import AdminLogin from "./pages/login/adminlogin";
import TenantPortal from "./pages/portal/tenantportal";
import SupervisorPortal from "./pages/portal/supervisorportal";
import StaffPortal from "./pages/portal/staffportal";
import TicketDetails from "./components/TicketDetails";
import AdminLandingPage from "./pages/landingpages/adminlandingpage"
import { Route, Routes } from "react-router-dom";
import SupervisorLandingPage from "./pages/landingpages/supervisorlandingpage";
import TenantLandingPage from "./pages/landingpages/tenantlandingpage";
import StaffLandingPage from "./pages/landingpages/stafflandingpage";
import CreateTicket from "./pages/tenant/createticket";
import CreateSupervisor from "./pages/admin/createsupervisoracc";
import CreateStaffAcc from "./pages/admin/createstaffacc";

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
          <Route path="/tenantportal/:id/:status" element={<TenantPortal />} />
          <Route path="/staffportal/:id/:status" element={<StaffPortal />} />
          <Route path="/supervisorportal/:id/:status" element={<SupervisorPortal />} />
          <Route path="/createticket/:id" element={<CreateTicket />} />
          <Route path="/supervisorlandingpage/:id" element={<SupervisorLandingPage />} />
          <Route path="/stafflandingpage/:id" element={<StaffLandingPage />} />
          <Route path="/tenantlandingpage/:id" element={<TenantLandingPage />} />
          <Route path="/adminlandingpage/:id" element={<AdminLandingPage />} />
          <Route path="/createsupervisoracc" element={<CreateSupervisor />} />
          <Route path="/createstaffacc" element={<CreateStaffAcc />} />
        </Routes> 
      </div>
    </>
  );
}

export default App;
