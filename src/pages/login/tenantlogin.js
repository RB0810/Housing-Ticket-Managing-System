import React, { useState } from "react";
import "../../styles/login.css";
import { useAccountManager } from "../../managers/context";

export default function TenantLogin() {
  const [ID, setID] = useState("");
  const [password, setPassword] = useState("");
  const accountmanager = useAccountManager();

  const handleLogin = async (event) => {
    event.preventDefault();

    const eventData = {
      ID,
      Type: "Tenant",
      password,
    };

    try {
      await accountmanager.loginAuth(eventData);
    } catch (error) {
      console.error("Login error:", error);
      window.alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="logindiv">
      <form className="loginForm" onSubmit={handleLogin}>
        <div>
          <h1 className="wlcText">
            Tenant Portal <br /> Login
          </h1>
        </div>
        <div>
          <p>Create and Manage Tickets!</p>
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
