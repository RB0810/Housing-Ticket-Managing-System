import React, { useEffect, useState } from "react";
import supabase from "../../config/supabaseClient";


export default function CreateLandlordAccount() {
	const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      console.log("User created:", user);
      // Redirect to the desired page after successful sign-up
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          margin: "10px",
          padding: "5px",
          borderRadius: "4px",
          border: "1px solid gray",
        }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          margin: "10px",
          padding: "5px",
          borderRadius: "4px",
          border: "1px solid gray",
        }}
      />
      <button
        type="submit"
        style={{
          margin: "10px",
          padding: "8px 16px",
          borderRadius: "4px",
          background: "blue",
          color: "white",
          border: "none",
        }}
      >
        Sign Up
      </button>
    </form>
  );
}