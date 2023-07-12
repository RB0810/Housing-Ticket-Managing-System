import "./landingpage.css";
import { Route, Link } from 'react-router-dom';

const AccountColumn = ({ imageSrc, altText, heading, path }) => {
  return (
    <td>
  
      <img src={imageSrc} alt={altText} />
      <h2>{heading}</h2>
      <button className="loginButton">
      <Link to={path} style={{ textDecoration: 'none' }}>Login</Link>
        </button>
    </td>
  );
};

export default function LandingPage() {
  return (
    <>
      <table>
        <thead></thead>
        <tbody>
          <tr>
            <AccountColumn imageSrc="Tenantimage.jpg" altText="Tenant" heading="Tenant Account" path="/tenantlogin" />
            <AccountColumn imageSrc="Landlordimage.jpg" altText="Landlord" heading="Landlord Account" path="/landlordlogin" />
            <AccountColumn imageSrc="Adminimage.jpg" altText="Admin" heading="Admin Account" path="/adminlogin" />
          </tr>
        </tbody>
      </table>
    </>
  );
}
