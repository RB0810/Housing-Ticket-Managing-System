import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from "../../components/Login";

const AdminLogin = () => {
  const [ID, setID] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const adminID = 'admin';
  const adminPassword = 'admin';

  const handleLogin = (event) => {
    event.preventDefault(); // Prevent form submission
    if (ID === adminID && password === adminPassword) {
      console.log('Logged in successfully!');
      // Redirect to the admin portal landing page
      navigate('/adminlandingpage');
    } else {
      console.error('Invalid credentials');
      // Handle invalid credentials, such as displaying an error message to the user.
    }
  };

  return (
    <Login
      type='Admin'
      handleLogin={handleLogin}
      ID={ID}
      setID={setID}
      password={password}
      setPassword={setPassword}
    />
  );
};

export default AdminLogin;
