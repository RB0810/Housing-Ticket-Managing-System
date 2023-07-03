import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, signIn } from '../config/supabaseClient'; // Make sure to import the supabase client and signIn function

const Login = ({ type }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const { user, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        // Handle login error
        console.error('Login error:', error.message);
      } else {
        // If login is successful, navigate to the desired page based on the type
        if (type === 'landlord') {
          navigate('/landlordlandingpage'); // Replace '/landlordlandingpage' with the desired route for the landlord
        } else if (type === 'tenant') {
          navigate('/tenantlandingpage'); // Replace '/tenantlandingpage' with the desired route for the tenant
        }
      }
    } catch (error) {
      // Handle any other errors
      console.error('Error:', error.message);
    }
  };

  return (
    <div>
      <form className='loginForm'>
        <div>
          <h1 className='wlcText'>
            {type} Portal <br /> Login
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

export default Login;
