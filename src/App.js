import "./App.css";
import Navbar from "./components/Navbar";
import LandlordLogin from "./pages/login/landlordlogin";
import TenantLogin from "./pages/login/tenantlogin";
import LandingPage from "./pages/landingpage/landingpage";
import AdminLogin from "./pages/login/adminlogin";
import TenantPortal from "./pages/portal/tenantportal";
import LandlordPortal from "./pages/portal/landlordportal";
import AdminLandingPage from "./pages/adminportal/adminlandingpage";
import CreateLandlordAccount from "./pages/adminportal/createlandlordacc.jsx";
import { Route, Routes } from "react-router-dom";
import React from "react";

function App() {
  // Routing
  return (
    <div>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/tenantlogin" element={<TenantLogin />} />
          <Route path="/landlordlogin" element={<LandlordLogin />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/tenantportal" element={<TenantPortal />} />
          <Route path="/landlordportal" element={<LandlordPortal />} />
          <Route path="/adminlandingpage" element={<AdminLandingPage />} />
          <Route path="/createlandlordacc" element={<CreateLandlordAccount />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
