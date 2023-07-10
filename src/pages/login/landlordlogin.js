import React, { useState } from "react";
import { LoginAuth } from "../../managers/AccountManager";
import "../../styles/login.css";

export default function LandlordLogin() {
  const [ID, setID] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    const eventDataSupervisor = {
      ID,
      Type: "Supervisor",
      password,
    };

    try {
      await LoginAuth(eventDataSupervisor);
    } catch (error) {
      if (error.message === "Invalid credentials") {
        const eventDataStaff = {
          ID,
          Type: "Staff",
          password,
        };

        try {
          await LoginAuth(eventDataStaff);
        } catch (error) {
          console.error("Login error:", error);
          window.alert(`Error: ${error.message}`);
        }
      } else {
        console.error("Login error:", error);
        window.alert(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="logindiv">
      <form className="loginForm" onSubmit={handleLogin}>
        <div>
          <h1 className="wlcText">
            Landlord Portal <br /> Login
          </h1>
        </div>
        <div>
          <p>Manage Tickets and Tenants!</p>
        </div>

        <div>
          <label></label>
          <input
            className="loginInput"
            type="text"
            value={ID}
            onChange={(e) => setID(e.target.value)}
            name="ID"
            placeholder="ID Number/Email"
          />
        </div>

        <div>
          <label></label>
          <input
            className="loginInput"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            placeholder="Password"
          />
        </div>

        <button className="loginBtn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
