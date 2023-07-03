import React from "react";
import CreateAccount from "../../components/CreateAccount";
import { supabase } from "../../config/supabaseClient";
import { useNavigate } from "react-router-dom";

const TenantCreateAcc = () => {
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
      navigate("/landlordlandingpage"); 

    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  return (
    <div>
      <CreateAccount type="Tenant" onCreateAccount={handleCreateAccount} />
    </div>
  );
};

export default TenantCreateAcc;
