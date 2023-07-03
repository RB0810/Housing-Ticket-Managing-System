import React, { useState } from "react";

const CreateAccount = ({ type, onCreateAccount }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      // Call the onCreateAccount callback function and pass the email, password, and type
      await onCreateAccount(email, password, type);
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSignUp}>
        <div>
          <h1 className='wlcText'>Create {type} Account</h1>
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="createBtn" type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default CreateAccount;
