import React, { useState } from "react";
import "../../styles/login.css";
import Authentication from "../../managers/authentication";

export default function AdminLogin() {
  const [ID, setID] = useState("");
  const [password, setPassword] = useState("");

  const authentication = new Authentication();

  const handleLogin = async (event) => {
    event.preventDefault();

    const eventData = {
      ID,
      Type: "Admin",
      password,
    };

    try {
      await authentication.loginAuth(eventData);
    } catch (error) {
      console.error("Login error:", error);
      window.alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="logindiv">
      <form className="loginForm">
        <div>
          <h1 className="wlcText">
            Admin Portal <br /> Login
          </h1>
        </div>
        <div>
          <p>Manage Landlords and Properties!</p>
        </div>

        <div>
          <label></label>
          <input
            className="loginInput"
            type="text"
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
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            placeholder="Password"
          />
        </div>

        <button className="loginBtn" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
}
