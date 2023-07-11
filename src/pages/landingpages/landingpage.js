import "../../styles/landingpage.css";
import { Route, Link } from 'react-router-dom';

const LandingPageCard = ({ imageSrc, altText, heading, path }) => {
  return (
    <div className="page-card">
      <img className="card-image" src={imageSrc} alt={altText} />
      <div className="page-card-container">
        <h3 className="card-heading">{heading}</h3>
        <button className="login-button">
          <Link className="login-button-text" to={path}>Login</Link>
          {/* i need to make this such that the user can click any part of the button */}
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
