import React from 'react';
import '../../styles/landingpage.css';

export default function LandingPage() {
  return (
    <React.Fragment>
      <table className="landing-page-table">
        <thead>
          <tr>
            <th colSpan="3"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img src={"housingportalicon.jpg"} alt="Tenant table picture" />
              <br />
              <h2>Tenant Account</h2>
            </td>
            <td>
              <img src={"housingportalicon.jpg"} alt="Landlord table picture" />
              <br />
              <h2>Landlord Account</h2>
            </td>
            <td>
              <img src={"housingportalicon.jpg"} alt="Admin table picture" />
              <br />
              <h2>Admin Account</h2>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3"></td>
          </tr>
        </tfoot>
      </table>
    </React.Fragment>
  );
}
