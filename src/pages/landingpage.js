import "./landingpage.css";

const AccountColumn = ({ imageSrc, altText, heading, path }) => {
  return (
    <td>
  
      <img src={imageSrc} alt={altText} />
      <h2>{heading}</h2>
      <button className="loginButton">Login</button>
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
            <AccountColumn imageSrc="Tenantimage.jpg" altText="Tenant" heading="Tenant Account" />
            <AccountColumn imageSrc="Landlordimage.jpg" altText="Landlord" heading="Landlord Account" />
            <AccountColumn imageSrc="Adminimage.jpg" altText="Admin" heading="Admin Account" />
          </tr>
        </tbody>
      </table>
    </>
  );
}
