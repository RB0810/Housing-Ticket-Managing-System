import React, { useState } from "react";
import "../../styles/login.css";
import Authentication from "../../managers/authentication";
import {Button, Grid, TextField} from '@mui/material'
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import NotificationManager from "../../managers/notificationmanager";

export default function TwoFactorAuth() {
  const [OTP, setOTP] = useState("");
  const [otpSent, setotpSent] = useState(false);
  const [randomOTP, setRandomOTP] = useState(null);
  let { UserType, UserID } = useParams();

  const authentication = new Authentication();
  const notificationmanager = new NotificationManager();
  
  const TypeUpper = UserType.charAt(0).toUpperCase() + UserType.slice(1);

  const sendOTP = async (event) => {
    
    const newRandomOTP = Math.floor(10000 + Math.random() * 90000);
    setRandomOTP(newRandomOTP);

    const body = "Your otp is: " + newRandomOTP

    try{
      await notificationmanager.sendOTP(TypeUpper, UserID, body);
      setotpSent(true);
    }catch(error){
      console.error("Mail error:", error);
      Swal.fire({
        icon: "error",
        title: "Error sending email",
        text: error.message,
        showConfirmButton: true,
        confirmButtonColor: "#707c4f"
      });
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault();

    const eventData = {
      ID: UserID,
      Type: TypeUpper,
      OTP

    }
    try {
      await authentication.otp(eventData, randomOTP.toString());
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
      <form className="loginForm">
        <div>
          <h1 className="wlcText">
            Two Factor <br /> Authentication
          </h1>
        </div>
        <div>
          {otpSent ? ( // Show text field and submit button when otpSent is true
            <>
              <p>Please enter OTP sent to your email id!</p>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    className="login-portal-textfield"
                    id="otp-textfield"
                    label="OTP"
                    onChange={(e) => setOTP(e.target.value)}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    id="otp-button"
                    type="submit"
                    variant="contained"
                    onClick={handleLogin}
                    className="login-portal-button"
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </>
          ) : ( // Show the "Send OTP" button when otpSent is false
          <div>
            <p>We will send an OTP to your registered email ID! </p>
            <Button
              id="otp-button"
              variant="contained"
              onClick={sendOTP}
              className="login-portal-button"
            >
              Send OTP
            </Button>
          </div>
          )}
        </div>
      </form>
    </div>
  );
}
