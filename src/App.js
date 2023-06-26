import "./App.css";
import Navbar from "./components/Navbar";
import LandlordLogin from "./pages/login/landlordlogin";
import TenantLogin from "./pages/login/tenantlogin";
import LandingPage from "./pages/landingpage";
import AdminLogin from "./pages/login/adminlogin";
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
        </Routes>
      </div>
    </>
  );
}

export default App;
