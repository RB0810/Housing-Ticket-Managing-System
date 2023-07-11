import "./styles/App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandlordLogin from "./pages/login/landlordlogin";
import TenantLogin from "./pages/login/tenantlogin";
import LandingPage from "./pages/landingpages/landingpage";
import AdminLogin from "./pages/login/adminlogin";
import TenantPortal from "./pages/portal/tenantportal";
import SupervisorPortal from "./pages/portal/supervisorportal";
import StaffPortal from "./pages/portal/staffportal";
import ViewTicketTenant from "./pages/tenant/viewticket";
import ViewTicketSupervisor from "./pages/supervisor/viewticket"
import ViewTicketStaff from "./pages/staff/viewticket";
import AdminLandingPage from "./pages/landingpages/adminlandingpage";
import SupervisorLandingPage from "./pages/landingpages/supervisorlandingpage";
import TenantLandingPage from "./pages/landingpages/tenantlandingpage";
import StaffLandingPage from "./pages/landingpages/stafflandingpage";
import CreateTicket from "./pages/tenant/createticket";
import CreateSupervisor from "./pages/admin/createsupervisoracc";
import CreateStaffAcc from "./pages/admin/createstaffacc";
import CreateTenantAcc from "./pages/supervisor/createtenantacc";
import ManageAccount from "./pages/admin/manageacc";
import BuildingDetailsPage from "./pages/admin/BuildingDetailsPage";

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
          <Route path="/tenantportal/ticket/:ServiceRequestID" element={<ViewTicketTenant />} />
          <Route path="/supervisorportal/ticket/:ServiceRequestID" element={<ViewTicketSupervisor />} />
          <Route path="/staffportal/ticket/:ServiceRequestID" element={<ViewTicketStaff />} />
          <Route path="/tenantportal/:TenantID/:PARCStatus" element={<TenantPortal />} />
          <Route path="/staffportal/:StaffID/:PARCStatus" element={<StaffPortal />} />
          <Route path="/supervisorportal/:SupervisorID/:PARCStatus" element={<SupervisorPortal />} />
          <Route path="/createtennantacc/:SupervisorID" element={<CreateTenantAcc />} />
          <Route path="/createticket/:TenantID" element={<CreateTicket />} />
          <Route path="/supervisorlandingpage/:SupervisorID" element={<SupervisorLandingPage />} />
          <Route path="/stafflandingpage/:StaffID" element={<StaffLandingPage />} />
          <Route path="/tenantlandingpage/:TenantID" element={<TenantLandingPage />} />
          <Route path="/adminlandingpage/:AdminID" element={<AdminLandingPage />} />
          <Route path="/createsupervisoracc" element={<CreateSupervisor />} />
          <Route path="/createstaffacc" element={<CreateStaffAcc />} />
          <Route path="/manageacc" element={<ManageAccount />} />
          <Route path="/manageacc/building/:BuildingID" element={<BuildingDetailsPage />} />
          </Routes>
      </div>
    </>
  );
}

export default App;
