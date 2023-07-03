import "./App.css";
import LandingPage from "./pages/landingpage/landingpage";
import Navbar from "./components/Navbar";
import LandlordLogin from "./pages/login/landlordlogin";
import TenantLogin from "./pages/login/tenantlogin";
import AdminLogin from "./pages/login/adminlogin";
import TenantPortal from "./pages/portal/tenantportal";
import LandlordPortal from "./pages/portal/landlordportal";
import AdminLandingPage from "./pages/adminportal/adminlandingpage";
import TenantLandingPage from "./pages/tenantportal/tenantlandingpage";
import CreateLandlordAccount from "./pages/adminportal/createlandlordacc";
import LandlordLandingPage from "./pages/landlordportal/landlordlandingpage";
import CreateTenantAccount from "./pages/landlordportal/createtenantacc";
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
          <Route path="/landlordlandingpage" element={<LandlordLandingPage />} />
          <Route path="/createtenantacc" element={<CreateTenantAccount />} />
          <Route path="/tenantlandingpage" element={<TenantLandingPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
