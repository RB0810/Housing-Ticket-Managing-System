import "../../styles/landingpage.css";
import { Route, Link } from 'react-router-dom';

const LandingPageCard = ({ imageSrc, altText, heading, path }) => {
  return (
    <div className="page-card">
      <img class="card-image" src={imageSrc} alt={altText} />
      <div class="page-card-container">
        <h3 class="card-heading">{heading}</h3>
        <button className="loginButton">
          <Link to={path}>Login</Link>
        </button>
      </div>
    </div>
  );
};

export default function LandingPage() {
  return (
    <>
      <div className="LandingPage-row">
        <div className="tenant-card"><LandingPageCard imageSrc="tenantLandingPageimg.png" altText="Tenant" heading="Tenant Account" path="/tenantlogin" /></div>
        <div className="landlord-card"><LandingPageCard imageSrc="landlordLandingPageimg.png" altText="Landlord" heading="Landlord Account" path="/landlordlogin" /></div>
        <div className="admin-card"><LandingPageCard imageSrc="adminLandingPageimg.png" altText="Admin" heading="Admin Account" path="/adminlogin" /></div>
      </div>
    </>)
}
