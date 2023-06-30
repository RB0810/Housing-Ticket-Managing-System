import Login from "../../components/Login";
import React from 'react';
import { useState } from 'react';
import supabase from '../../config/supabaseClient';

const LandlordLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const { user, error } = await supabase.auth.signIn({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error.message);
      } else {
        console.log('Logged in:', user);
        // Redirect to the landlord portal or the desired page
      }
    } catch (error) {
      console.error('Login error:', error.message);
    }
  };

  return (
    <div>
      <h2>Landlord Login</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LandlordLogin;
