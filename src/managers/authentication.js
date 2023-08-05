import supabase from "../config/supabaseClient";
import Cookies from "js-cookie";
import { SHA256 } from "crypto-js";
import emailjs from "emailjs-com";

class Authentication {

  async loginAuth(event) {
    
    const { data, error } = await supabase
      .from(`${event.Type}Users`)
      .select("*")
      .eq(`${event.Type}Email`, event.ID);

    if (error) {
      throw error;
    }

    const user = data[0];

    if (user && user[`${event.Type}Password`] === event.password) {

      const redirectUrl = `/twofactorauth/${event.Type.toLowerCase()}/${user[`${event.Type}ID`]}`;
      window.location.href = redirectUrl;
    } else {
      throw new Error("Invalid credentials");
    }
  }

  logout() {
    // Remove the userId and type cookies
    Cookies.remove("userId");
    Cookies.remove("type");

    // Redirect to the home page
    window.location.href = "/";
  }

  async otp(event, randomOTP){
    if (event.OTP === randomOTP) {
      const userIdAsString = String(event.ID);
      // Use SHA-256 to hash the userId
      const hashedUserId = SHA256(userIdAsString).toString();
      console.log(hashedUserId);
      // Store the user's ID and type in cookies (secure and not accessible from JavaScript)
      Cookies.set('userId', hashedUserId, { expires: 1 });
      Cookies.set("type", event.Type, { expires: 1 });
      const redirectUrl = `/${event.Type.toLowerCase()}portal/landingpage/${event.ID}`;
      window.location.href = redirectUrl;
    } else {
      throw new Error("Invalid credentials");
    }

  }
  
}

export default Authentication;
