import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import { CreateTenantAccount } from "../../managers/accountmanager";

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== reEnterPassword) {
      setFormError("Passwords do not match");
      return;
    }

    if (
      !tenantUsername ||
      !tenantEmail ||
      !password ||
      !reEnterPassword ||
      !tenantPhone ||
      !tradeType ||
      !monthlyRental ||
      !leaseCommencementDate ||
      !leaseTerminationDate ||
      !areaOfUnit ||
      !unitFields.every((unit) => unit !== "")
    ) {
      setFormError("Please fill out all fields");
      return;
    }

    // Prepare tenant data
    const tenantData = {
      TenantUsername: tenantUsername,
      TenantEmail: tenantEmail,
      TenantPassword: password,
      TenantPhone: tenantPhone,
      UnderSupervisor: id,
      Lease: null
    };

    const leaseData = {
      CommenceDate: leaseCommencementDate,
      TerminationDate: leaseTerminationDate,
      Status: "Active",
      AreaInSqMeters: areaOfUnit,
      TradeType: tradeType,
      MonthlyRental: monthlyRental
    };

    const units = {
      number: numberOfUnits,
      unit: unitFields
    };

    console.log(tenantData);
    console.log(leaseData);
    console.log(units);

    try {
      CreateTenantAccount(tenantData, leaseData, units);
      setFormError("Tenant Account Created!");
    } catch (error) {
      console.error(error);
      setFormError("Database Error");
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
