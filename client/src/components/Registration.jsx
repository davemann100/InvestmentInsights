import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !username || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/register', {
        firstName,
        lastName,
        email,
        username,
        password,
        confirmPassword,
      });

      console.log(response.data);
      setIsRegistered(true);
      if (response.data.msg === 'success') {
        sessionStorage.setItem('isRegistered', true);
        navigate('/dashboard');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="container" style={{ padding: "100px" }}>
      <div
        className="row justify-content-center"
        style={{ minHeight: "75vh", width: "200%" }}
      >
        <div className="col-lg d-flex justify-content-center">
          <div className="card p-5 shadow">
            <h3 className="card-title text-center ">Register</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="firstName">First Name:</label>
                <input
                  type="text"
                  value={firstName}
                  className="form-control"
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  value={lastName}
                  className="form-control"
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  value={email}
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                  type="text" // Fixed: Added the type attribute
                  value={username}
                  className="form-control"
                  onChange={(e) => setUsername(e.target.value)}
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
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                  type="password"
                  value={confirmPassword}
                  className="form-control"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block mt-4"
              >
                Register
              </button>
            </form>
            {error && !isRegistered && (
              <p className="text-danger text-center mt-3">{error}</p>
            )}
            <p className="text-center mt-3">
              Already have an account? <Link to="/">Login here.</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;