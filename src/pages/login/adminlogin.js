import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../config/supabaseClient';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const adminEmail = 'admin@gmail.com';
  const adminPassword = 'admin';

  const handleLogin = () => {
    if (email === adminEmail && password === adminPassword) {
      console.log('Logged in successfully!');
      // Redirect to the admin portal landing page
      navigate('/adminlandingpage')
    } else {
      console.error('Invalid credentials');
      // Handle invalid credentials, such as displaying an error message to the user.
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
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

export default AdminLogin;
