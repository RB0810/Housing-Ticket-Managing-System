import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import TenantAccount from "../../objects/TenantAccount";

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
  const { id } = useParams();

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
    tenantAccount.supervisor = id;
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
          onChange={(e) => handleUnitFieldChange(i, e.target.value)}
        />
      );
    }
    return fields;
  };

  return (
    <div>
      <h1>Create Tenant Account</h1>
      <form onSubmit={handleSubmit}>
        <label>Tenant Username:</label>
        <input
          type="text"
          value={tenantUsername}
          onChange={(e) => setTenantUsername(e.target.value)}
        />
        <br />

        <label>Tenant Email:</label>
        <input
          type="email"
          value={tenantEmail}
          onChange={(e) => setTenantEmail(e.target.value)}
        />
        <br />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />

        <label>Re-enter Password:</label>
        <input
          type="password"
          value={reEnterPassword}
          onChange={(e) => setReEnterPassword(e.target.value)}
        />
        <br />

        <label>Tenant Phone:</label>
        <input
          type="tel"
          value={tenantPhone}
          onChange={(e) => setTenantPhone(e.target.value)}
        />
        <br />

        <label>Trade Type:</label>
        <input
          type="text"
          value={tradeType}
          onChange={(e) => setTradeType(e.target.value)}
        />
        <br />

        <label>Monthly Rental:</label>
        <input
          type="text"
          value={monthlyRental}
          onChange={(e) => setMonthlyRental(e.target.value)}
        />
        <br />

        <label>Lease Commencement Date:</label>
        <input
          type="date"
          value={leaseCommencementDate}
          onChange={(e) => setLeaseCommencementDate(e.target.value)}
        />
        <br />

        <label>Lease Termination Date:</label>
        <input
          type="date"
          value={leaseTerminationDate}
          onChange={(e) => setLeaseTerminationDate(e.target.value)}
        />
        <br />

        <label>Area (in Sq Meters):</label>
        <input
          type="text"
          value={areaOfUnit}
          onChange={(e) => setAreaOfUnit(e.target.value)}
        />
        <br />

        <label>Number of Units:</label>
        <input
          type="number"
          value={numberOfUnits}
          onChange={handleNumberOfUnitsChange}
          min="1"
          onKeyDown={(e) => e.preventDefault()}
        />
        <br />


        <label>Unit:</label>
        {renderUnitFields()}
        <br />

        <button type="submit">Create Account</button>

        {formError && <p className="create-ticket-error">{formError}</p>}
      </form>
    </div>
  );
};

export default CreateTenantAcc;
