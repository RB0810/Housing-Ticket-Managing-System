import "../../styles/landingpage.css";
import { Link } from 'react-router-dom';

const LandingPageCard = ({ imageSrc, altText, heading, path }) => {
  return (
    <div className="page-card">
      <img className="card-image" src={imageSrc} alt={altText} />
      <div className="page-card-container">
        <h3 className="card-heading">{heading}</h3>
        <Link to={path}>
          <button className="login-button" useRef={{ path }}>
            Login
          </button>
        </Link>
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
