import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    axios
      .post('http://localhost:8000/api/login', { email, password })
      .then((response) => {
        console.log(response.data); // Handle the response as needed
        navigate('/dashboard'); // Redirect to the dashboard or any other page
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.error) {
          setError(error.response.data.error);
        } else {
          setError('An error occurred. Please try again later.');
        }
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Link to="/register">Don't have an account? Register here.</Link>
    </div>
  );
};

export default Login;