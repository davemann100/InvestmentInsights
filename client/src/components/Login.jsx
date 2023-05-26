import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/login', { email, password });

      console.log(response.data);
      if (response.data.msg === 'success') {
        sessionStorage.setItem('isAuthorized', true);
        navigate('/dashboard');
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  }


  return (
    <div className="container" style={{ padding: '150px' }}>
      <div className="row justify-content-center" style={{ minHeight: '75vh' }}>
        <div className="col-lg-5" style={{ padding: '50px' }}>
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
        <div className="col-lg-7 " style={{ padding: '50px' }}>
          <div className="card p-4 shadow h-100">
            <img src="https://www.getyourinsight.com/files/50160/base_logo_white_background_skinny~001.png" alt="Logo" className="img-fluid mb-4" />
            <h3 className="card-title text-center mb-4">Investment Insights</h3>
            <p className="text-center">

              Mission Statement:

              At Investment Insight, our mission is to empower individuals and organizations with valuable investment insights to make informed financial decisions. We are dedicated to providing comprehensive and reliable information, cutting-edge research, and expert analysis in the field of investments. Our goal is to foster financial literacy, inspire confidence, and help our clients navigate the complexities of the investment landscape. By delivering high-quality insights, we strive to enhance investment knowledge, drive positive outcomes, and contribute to the financial success and well-being of our stakeholders.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;