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
    <div className="container" style={{padding:"150px"}}>
            <div className="row justify-content-center" style={{ minHeight: '75vh' }}>
        <div className="col-lg-5" style={{padding:"50px"}}t>
          <div className="card p-4 shadow h-100">
            <h3 className="card-title text-center mb-4">Login</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  value={email}
                  type="email"
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  value={password}
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block mt-4">
                Login
              </button>
            </form>
            {error && <p className="text-danger text-center mt-3">{error}</p>}
            <p className="text-center mt-3">
              Don't have an account? <Link to="/register">Register here.</Link>
            </p>
          </div>
        </div>
        <div className="col-lg-7 " style={{padding:"50px"}}>
          <div className="card p-4 shadow h-100">
            <img src="logo.png" alt="Logo" className="img-fluid mb-4" />
            <h3 className="card-title text-center mb-4">Mission Statement</h3>
            <p className="text-center">
              Your mission statement goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque velit in dolor ultricies, id eleifend mauris
              aliquam. Sed varius sapien eu ligula cursus, vitae aliquam leo feugiat. In auctor mauris in lacus lacinia, et condimentum nisl ullamcorper.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;