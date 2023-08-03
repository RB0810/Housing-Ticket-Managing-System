import React, { useState } from "react";
import "../../styles/login.css";
import Authentication from "../../managers/authentication";
import {Button, Grid, TextField} from '@mui/material'
import Swal from "sweetalert2";

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
      Swal.fire({
        icon: "error",
        title: "Login error",
        text: error.message
      });
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

        <Grid container spacing={1}>
          <Grid item xs = {12}>
              <TextField 
              className="login-portal-textfield"
              id="admin-login-email-textfield" 
              label="ID Number/Email"
              onChange={(e) => setID(e.target.value)} 
              variant="outlined" />
          </Grid>
          <Grid item xs = {12}>
              <TextField 
              type="password"
              className="login-portal-textfield"
              id="admin-login-password-textfield" 
              label="Password" 
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined" />
          </Grid>
          <Grid item xs = {12}>
            <Button 
            id="admin-login-login-button"
            type="submit"
            variant="contained"
            onClick={handleLogin}
            className="login-portal-button">
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
