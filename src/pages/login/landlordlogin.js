import React, { useState } from "react";
import  AccountManager  from '../../managers/accountmanager';
import "../../styles/login.css";
import {Button, Grid, TextField} from '@mui/material'

export default function LandlordLogin() {
  const [ID, setID] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    const accountManager = new AccountManager();

    const eventDataSupervisor = {
      ID,
      Type: "Supervisor",
      password,
    };

    try {
      await accountManager.loginAuth(eventDataSupervisor);
    } catch (error) {
      if (error.message === "Invalid credentials") {
        const eventDataStaff = {
          ID,
          Type: "Staff",
          password,
        };

        try {
          await accountManager.loginAuth(eventDataStaff);
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

        <Grid container spacing={1}>
          <Grid item xs = {12}>
              <TextField 
              className="login-portal-textfield"
              id="outlined-basic" 
              label="ID Number/Email"
              onChange={(e) => setID(e.target.value)} 
              variant="outlined" />
          </Grid>
          <Grid item xs = {12}>
              <TextField 
              type="password"
              className="login-portal-textfield"
              id="outlined-basic" 
              label="Password" 
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined" />
          </Grid>
          <Grid item xs = {12}>
            <Button 
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
