import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Import your CSS file for styling
import Dashboard from './Sidebar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(''); // Track login state

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      // Make POST request
      const response = await axios.post('http://localhost:3000/api/superadmin/login', {
        email,
        password,
      });

      // Handle success
      console.log('Login successful', response.data);
      setLoggedIn(true);
      // You can redirect the user or perform any other action upon successful login
    } catch (error) {
      // Handle error
      console.error('Login failed', error);
      setError('Invalid email or password. Please try again.');
    }
  };

  if (loggedIn) {
    return <Dashboard />;
  }

  return (
    <div className="login-container">
      <div className="card">
      <h2 className="custom-heading">iLoma portal</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="email"></label>
            <input
              type="email"
              id="email"
              value={email}
              placeholder='username or email'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password"></label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder='password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Log in</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
