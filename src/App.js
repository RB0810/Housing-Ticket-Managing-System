import "./styles/App.css";
import Navbar from "./components/Navbar";
import LandlordLogin from "./pages/login/landlordlogin";
import TenantLogin from "./pages/login/tenantlogin";
import LandingPage from "./pages/landingpage";
import AdminLogin from "./pages/login/adminlogin";
import TenantPortal from "./pages/portal/tenantportal";
import LandlordPortal from "./pages/portal/landlordportal";
import TicketDetails from "./components/TicketDetails";
import AdminLandingPage from "./pages/landingpages/adminlandingpage"
import { Route, Routes } from "react-router-dom";
import LandlordLandingPage from "./pages/landingpages/landlordlandingpage";
import TenantLandingPage from "./pages/landingpages/tenantlandingpage";

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
          <Route path="/landlordlandingpage/:id" element={<LandlordLandingPage />} />
          <Route path="/tenantlandingpage/:id" element={<TenantLandingPage />} />
          <Route path="/adminlandingpage/:id" element={<AdminLandingPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
