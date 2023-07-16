import React, { useState } from "react";
import "../../styles/login.css";
import AccountManager from "../../managers/accountmanager";
import "../../styles/login.css";

export default function AdminLogin() {
  const [ID, setID] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    const accountManager = new AccountManager();

    const eventData = {
      ID,
      Type: "Tenant",
      password,
    };

    try {
      await accountManager.loginAuth(eventData);
    } catch (error) {
      console.error("Login error:", error);
      window.alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="logindiv">
      <form className="loginForm" onSubmit={handleLogin}>
        <div className="title-words">
          <h1 className="wlcText">
            Tenant Portal <br /> Login
          </h1>
          <p className="login-subtitle">Create and Manage Tickets!</p>
        </div>
        <input
          className="login-email"
          type="text"
          value={ID}
          onChange={(e) => setID(e.target.value)}
          name="ID"
          placeholder="ID Number/Email"
        />
        <input
          className="loginInput"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          placeholder="Password"
        />

        <button className="loginBtn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
