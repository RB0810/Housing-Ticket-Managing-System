import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const adminEmail = 'admin@gmail.com';
  const adminPassword = 'admin';

  const handleLogin = (event) => {
    event.preventDefault(); // Prevent form submission
    if (email === adminEmail && password === adminPassword) {
      console.log('Logged in successfully!');
      // Redirect to the admin portal landing page
      navigate('/adminlandingpage');
    } else {
      console.error('Invalid credentials');
      // Handle invalid credentials, such as displaying an error message to the user.
    }
  };

  return (
    <div>
      <form className='loginForm'>
        <div>
          <h1 className='wlcText'>
            Admin Portal Login
          </h1>
        </div>
        <div>
          <p>Create and Manage tickets!</p>
        </div>

        <div>
          <label>Email:</label>
          <input
            className='loginInput'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name='email'
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            className='loginInput'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name='password'
          />
        </div>

        <button className='loginBtn' onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
