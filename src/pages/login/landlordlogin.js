import React, { useState } from "react";
import "../../styles/login.css";
import Authentication from "../../managers/authentication";
import {Button, Grid, TextField} from '@mui/material'
import Swal from "sweetalert2";


export default function LandlordLogin() {
  const [ID, setID] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    const authentication = new Authentication();

    const eventDataSupervisor = {
      ID,
      Type: "Supervisor",
      password,
    };

    try {
      await authentication.loginAuth(eventDataSupervisor);
    } catch (error) {
      if (error.message === "Invalid credentials") {
        const eventDataStaff = {
          ID,
          Type: "Staff",
          password,
        };

        try {
          await authentication.loginAuth(eventDataStaff);
        } catch (error) {
          console.error("Login error:", error);
          Swal.fire({
            icon: "error",
            title: "Login error",
            text: error.message
          });
        }
      } else {
        console.error("Login error:", error);
        Swal.fire({
          icon: "error",
          title: "Login error",
          text: error.message
        });
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
