import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import TenantAccount from "../../objects/TenantAccount";
import "./../../../src/styles/createtenantacc.css"
import Cookies from "js-cookie";

const CreateTenantAcc = () => {
  const [tenantUsername, setTenantUsername] = useState("");
  const [tenantEmail, setTenantEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [tenantPhone, setTenantPhone] = useState("");
  const [tradeType, setTradeType] = useState("");
  const [monthlyRental, setMonthlyRental] = useState("");
  const [leaseCommencementDate, setLeaseCommencementDate] = useState("");
  const [leaseTerminationDate, setLeaseTerminationDate] = useState("");
  const [areaOfUnit, setAreaOfUnit] = useState("");
  const [numberOfUnits, setNumberOfUnits] = useState(1);
  const [unitFields, setUnitFields] = useState([]);
  const [formError, setFormError] = useState(null);
  const { SupervisorID } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const userId = Cookies.get('userId');
    const type = Cookies.get('type');

    if (!userId || !type) {
      // If any of the required cookies are missing, redirect to the login page
      console.log('Unauthorized');
      navigate("/unauthorize");
    } else {
      // Check if the user's ID and type match the expected values (e.g., SupervisorID and "Supervisor")
      if (Number(userId) === parseInt(SupervisorID) && type === "Supervisor") {
        // Proceed with rendering the component
        console.log('Authorized');
      } else {
        // If not authorized, display "Unauthorized access" message
        console.log('Unauthorized');
        navigate("/unauthorize");
      }
    }
  }, [navigate, SupervisorID]);

  const handleUnitFieldChange = (index, value) => {
    const updatedUnitFields = [...unitFields];
    updatedUnitFields[index] = value;
    setUnitFields(updatedUnitFields);
  };

  const handleNumberOfUnitsChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setNumberOfUnits(value);
    setUnitFields(Array(value).fill(""));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tenantAccount = new TenantAccount();
    tenantAccount.username = tenantUsername;
    tenantAccount.email = tenantEmail;
    tenantAccount.password = password;
    tenantAccount.rePassword = reEnterPassword;
    tenantAccount.phone = tenantPhone;
    tenantAccount.supervisor = SupervisorID;
    tenantAccount.commenceDate = leaseCommencementDate;
    tenantAccount.terminationDate = leaseTerminationDate;
    tenantAccount.AreaInSqMeters = areaOfUnit;
    tenantAccount.tradetype = tradeType;
    tenantAccount.monthlyrental = monthlyRental;
    tenantAccount.numberofunits = numberOfUnits;
    tenantAccount.units = unitFields;

    try {
      const message = await tenantAccount.createAccount();
      setFormError(message);
    } catch (error) {
      setFormError(error.message);
    }
  };

  const renderUnitFields = () => {
    const fields = [];
    for (let i = 0; i < numberOfUnits; i++) {
      fields.push(
        <input
          key={i}
          type="text"
          value={unitFields[i] || ""}
          className="create-tenant-acc-input-text"
          onChange={(e) => handleUnitFieldChange(i, e.target.value)}
        />
      );
    }
    return fields;
  };

  return (
    <div className="create-tenant-acc-div">
      <h1>Create Tenant Account</h1>
      <form onSubmit={handleSubmit} className="create-tenant-acc-form">
        <div className="create-tenant-acc-row">
          <div className="create-tenant-acc-col-25">
            <label className="create-tenant-acc-label">Tenant Username:</label>
          </div>
          
          <div className="create-tenant-acc-col-75">
            <input
            type="text"
            value={tenantUsername}
            className="create-tenant-acc-input-text"
            onChange={(e) => setTenantUsername(e.target.value)}
          />
          </div>
        </div>
        
        
        <div className="create-tenant-acc-row">
          <div className="create-tenant-acc-col-25">
            <label className="create-tenant-acc-label">Tenant Email:</label>
          </div>
          
          <div className="create-tenant-acc-col-75">
            <input
            type="email"
            value={tenantEmail}
            className="create-tenant-acc-input-text"
            onChange={(e) => setTenantEmail(e.target.value)}
          />
          </div>
        </div>
        
        
        <div className="create-tenant-acc-row">
          <div className="create-tenant-acc-col-25">
            <label className="create-tenant-acc-label">Password:</label>
          </div>
          
          <div className="create-tenant-acc-col-75">
            <input
            type="password"
            value={password}
            className="create-tenant-acc-input-text"
            onChange={(e) => setPassword(e.target.value)}
          />
          </div>
        </div>
        
        
        <div className="create-tenant-acc-row">
          <div className="create-tenant-acc-col-25">
            <label className="create-tenant-acc-label">Re-enter Password:</label>
          </div>
          
          <div className="create-tenant-acc-col-75">
            <input
            type="password"
            value={reEnterPassword}
            className="create-tenant-acc-input-text"
            onChange={(e) => setReEnterPassword(e.target.value)}
          />
          </div>
        </div>
        
        <div className="create-tenant-acc-row">
          <div className="create-tenant-acc-col-25">
            <label className="create-tenant-acc-label">Tenant Phone:</label>
          </div>
          
          <div className="create-tenant-acc-col-75">
            <input
            type="tel"
            value={tenantPhone}
            className="create-tenant-acc-input-text"
            onChange={(e) => setTenantPhone(e.target.value)}
          />
          </div>
        </div>
        
        <div className="create-tenant-acc-row">
          <div className="create-tenant-acc-col-25">
            <label className="create-tenant-acc-label">Trade Type:</label>
          </div>
          
          <div className="create-tenant-acc-col-75">
            <input
            type="text"
            value={tradeType}
            className="create-tenant-acc-input-text"
            onChange={(e) => setTradeType(e.target.value)}
          />
          </div>
        </div>
        
        <div className="create-tenant-acc-row">
          <div className="create-tenant-acc-col-25">
            <label className="create-tenant-acc-label">Monthly Rental:</label>
          </div>
          
          <div className="create-tenant-acc-col-75">
            <input
            type="text"
            value={monthlyRental}
            className="create-tenant-acc-input-text"
            onChange={(e) => setMonthlyRental(e.target.value)}
          />
          </div>
        </div>
        
        <div className="create-tenant-acc-row">
          <div className="create-tenant-acc-col-25">
            <label className="create-tenant-acc-label">Lease Commencement Date:</label>
          </div>
          
          <div className="create-tenant-acc-col-75">
            <input
            type="date"
            value={leaseCommencementDate}
            className="create-tenant-acc-input-date"
            onChange={(e) => setLeaseCommencementDate(e.target.value)}
          />
          </div>
        </div>
        
        <div className="create-tenant-acc-row">
          <div className="create-tenant-acc-col-25">
            <label className="create-tenant-acc-label">Lease Termination Date:</label>
          </div>
          
          <div className="create-tenant-acc-col-75">
            <input
            type="date"
            value={leaseTerminationDate}
            className="create-tenant-acc-input-date"
            onChange={(e) => setLeaseTerminationDate(e.target.value)}
          />
          </div>
        </div>
        
        <div className="create-tenant-acc-row">
          <div className="create-tenant-acc-col-25">
            <label className="create-tenant-acc-label">Area (in Sq Meters):</label>
          </div>
          
          <div className="create-tenant-acc-col-75">
            <input
            type="text"
            value={areaOfUnit}
            className="create-tenant-acc-input-text"
            onChange={(e) => setAreaOfUnit(e.target.value)}
          />
          </div>
        </div>
        
        <div className="create-tenant-acc-row">
          <div className="create-tenant-acc-col-25">
            <label className="create-tenant-acc-label">Number of Units:</label>
          </div>
          
          <div className="create-tenant-acc-col-75">
            <input
            type="number"
            value={numberOfUnits}
            onChange={handleNumberOfUnitsChange}
            min="1"
            className="create-tenant-acc-input-text"
            onKeyDown={(e) => e.preventDefault()}
          />
          </div>
        </div>
        
        <div className="create-tenant-acc-row">
          <div className="create-tenant-acc-col-25">
          <label className="create-tenant-acc-label">Unit:</label>
        </div>
        
        <div className="create-tenant-acc-col-75">
          {renderUnitFields()}
        </div>
        </div>
        
        <div className="create-tenant-acc-row">
          <input
            type="submit"
            value="Create Account"
            className="create-tenant-acc-input-submit"
          />
        </div>
        

        {formError && <p className="create-ticket-error">{formError}</p>}
      </form>
    </div>
  );
};

export default CreateTenantAcc;
