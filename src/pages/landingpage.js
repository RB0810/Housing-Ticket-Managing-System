import "./landingpage.css";

export default function LandingPage() {
  return <>
  <table>
  <thead>
      <tr>
          <th colspan="3"></th>
      </tr>
  </thead>
  <tbody>
      <tr>
          <td>
            <img src={"Tenantimage.jpg"} alt="Tenant table picture"/>
            <br/>
            <h2>Tenant Account</h2>
            </td>
          <td>
          <img src={"Landlordimage.jpg"} alt="Landlord table picture"/>
            <br/>
            <h2>Landlord Account</h2>
            </td>
          <td>
          <img src={"Adminimage.jpg"} alt="Admin table picture"/>
            <br/>
            <h2>Tenant Account</h2>
          </td>
      </tr>
  </tbody>
</table>
</>

  // <h1>Landing Page</h1>;
}
