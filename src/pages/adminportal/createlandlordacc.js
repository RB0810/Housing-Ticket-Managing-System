import React from "react";
import CreateAccount from "../../components/CreateAccount";
import { supabase } from "../../config/supabaseClient";
import { useNavigate } from "react-router-dom";

const LandlordCreateAcc = () => {
  const navigate = useNavigate();

  const handleCreateAccount = async (email, password, type) => {
    try {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      console.log("User created:", user);
      navigate("/adminlandingpage"); 

    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  return (
    <div>
      <h1>Landlord Create Account</h1>
      <CreateAccount type="Landlord" onCreateAccount={handleCreateAccount} />
    </div>
  );
};

export default LandlordCreateAcc;
