import "./styles/App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import TenantNavbar from "./components/TenantNavbar";
import SupervisorNavbar from "./components/SupervisorNavbar";
import StaffNavbar from "./components/StaffNavbar";
import AdminNavbar from "./components/AdminNavbar";
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
import TenantProfile from "./pages/tenant/profile";
import SupervisorProfile from "./pages/supervisor/profile";
import StaffProfile from "./pages/staff/profile";
import UnauthorizedAccess from "./pages/unauthorized_access";

// MUI themes
import { red } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
  },
});

function App() {
  // Routing

  return (
    <>
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/*" element={<Navbar />} />
        <Route path="/tenantportal/*" element={<TenantNavbar />} />
        <Route path="/supervisorportal/*" element={<SupervisorNavbar />} />
        <Route path="/staffportal/*" element={<StaffNavbar />} />
        <Route path="/adminportal/*" element={<AdminNavbar />} />
      </Routes>

      <div className="container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/tenantlogin" element={<TenantLogin />} />
          <Route path="/landlordlogin" element={<LandlordLogin />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/tenantportal/ticket/:TenantID/:ServiceRequestID" element={<ViewTicketTenant />} />
          <Route path="/supervisorportal/ticket/:SupervisorID/:ServiceRequestID" element={<ViewTicketSupervisor />} />
          <Route path="/staffportal/ticket/:StaffID/:ServiceRequestID" element={<ViewTicketStaff />} />
          <Route path="/tenantportal/tickets/:TenantID/:PARCStatus" element={<TenantPortal />} />
          <Route path="/staffportal/tickets/:StaffID/:PARCStatus" element={<StaffPortal />} />
          <Route path="/supervisorportal/tickets/:SupervisorID/:PARCStatus" element={<SupervisorPortal />} />
          <Route path="/supervisorportal/createtennantacc/:SupervisorID" element={<CreateTenantAcc />} />
          <Route path="/tenantportal/createticket/:TenantID" element={<CreateTicket />} />
          <Route path="/supervisorportal/landingpage/:SupervisorID" element={<SupervisorLandingPage />} />
          <Route path="/staffportal/landingpage/:StaffID" element={<StaffLandingPage />} />
          <Route path="/tenantportal/landingpage/:TenantID" element={<TenantLandingPage />} />
          <Route path="/adminportal/landingpage/:AdminID" element={<AdminLandingPage />} />
          <Route path="/adminportal/createsupervisoracc/:AdminID" element={<CreateSupervisor />} />
          <Route path="/adminportal/createstaffacc/:AdminID" element={<CreateStaffAcc />} />
          <Route path="/adminportal/manageacc/:AdminID" element={<ManageAccount />} />
          <Route path="/adminportal/manageacc/:AdminID/building/:BuildingID" element={<BuildingDetailsPage />} />
          <Route path="/tenantportal/profile/:TenantID" element={<TenantProfile />} />
          <Route path="/supervisorportal/profile/:SupervisorID" element={<SupervisorProfile />} />
          <Route path="/staffportal/profile/:StaffID" element={<StaffProfile />} />
          <Route path="/unauthorize" element={<UnauthorizedAccess />} />
          </Routes>
      </div>
      </ThemeProvider>
    </>
  );
}

export default App;
