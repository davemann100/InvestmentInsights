import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
import Registration from './components/Registration';
import Dashboard from './components/Dashboard';
import Create from './components/Create';
import Sidebar from './components/Sidebar';
import './App.css';


function App() {
  const location = useLocation();
  const shouldShowSidebar = location.pathname !== '/' && location.pathname !== '/register';
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthorization();
  }, []);

  const checkAuthorization = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/checkAuthorization', { withCredentials: true });
      const { isAuthorized, isRegistered } = response.data;
      setIsAuthorized(isAuthorized);
      setIsRegistered(isRegistered);
      if (isAuthorized && isRegistered) {
        navigate('/dashboard');
      } else if (!isRegistered) {
        navigate('/');
      }
    } catch (error) {
      console.error('Authorization check failed:', error);
      setIsAuthorized(false);
      setIsRegistered(false);
      navigate('/');
    }
  };
  
  const handleLogout = () => {
    setIsAuthorized(false);
    setIsRegistered(false);
    sessionStorage.clear();
  };
  
  return (
    <div className="App">
      {shouldShowSidebar &&  (
        <div style={{ display: 'flex' }}>
          <div style={{ flex: '0 0 20%' }}>
            <Sidebar handleLogout={handleLogout} />
          </div>
          <div style={{ flex: '1 0 80%' }}>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/create" element={<Create />} />
            </Routes>
          </div>
        </div>
      )}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
    </div>
  );
}

export default App;







