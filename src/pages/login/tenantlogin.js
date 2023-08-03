import React, { useState } from "react";
import "../../styles/login.css";
import Authentication from "../../managers/authentication";
import "../../styles/login.css";
import {Button, Grid, TextField} from '@mui/material'
import Swal from "sweetalert2";

export default function TenantLogin() {
  const [ID, setID] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    const authentication = new Authentication();

    const eventData = {
      ID,
      Type: "Tenant",
      password,
    };

    try {
      await authentication.loginAuth(eventData);
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        icon: "error",
        title: "Login error",
        text: error.message,
        showConfirmButton: true,
        confirmButtonColor: "#707c4f"
      });
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

        <Grid container spacing={1}>
          <Grid item xs = {12}>
              <TextField 
              className="login-portal-textfield"
              id="tenant-login-email-textfield" 
              label="ID Number/Email"
              onChange={(e) => setID(e.target.value)} 
              variant="outlined" />
          </Grid>
          <Grid item xs = {12}>
              <TextField 
              type="password"
              className="login-portal-textfield"
              id="tenant-login-password-textfield" 
              label="Password" 
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined" />
          </Grid>
          <Grid item xs = {12}>
            <Button 
            id="tenant-login-login-button" 
            type="submit"
            variant="contained"
            className="login-portal-button">
              Login
            </Button>
          </Grid>
        </Grid>

      </form>
    </div>
  );
}
