import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Registration from './components/Registration';
import Dashboard from './components/Dashboard';
import Create from './components/Create';
import Sidebar from './components/Sidebar';
import EditProfile from './components/EditProfile';
import Metrics from './components/Metrics';
import Logout from './components/Logout';
import './App.css';

function App() {
  const location = useLocation();
  const shouldShowSidebar = !['/', '/register', '/logout'].includes(location.pathname);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/logout" element={<Logout />} />
        {shouldShowSidebar && (
          <Route
            path="/dashboard"
            element={
              <div style={{ display: 'flex' }}>
                <div style={{ flex: '0 0 20%' }}>
                  <Sidebar />
                </div>
                <div style={{ flex: '1 0 80%' }}>
                  <Dashboard />
                </div>
              </div>
            }
          />
        )}
        {shouldShowSidebar && (
          <Route
            path="/create"
            element={
              <div style={{ display: 'flex' }}>
                <div style={{ flex: '0 0 20%' }}>
                  <Sidebar />
                </div>
                <div style={{ flex: '1 0 80%' }}>
                  <Create />
                </div>
              </div>
            }
          />
        )}
        {shouldShowSidebar && (
          <Route
            path="/edit/:id"
            element={
              <div style={{ display: 'flex' }}>
                <div style={{ flex: '0 0 20%' }}>
                  <Sidebar />
                </div>
                <div style={{ flex: '1 0 80%' }}>
                  <EditProfile />
                </div>
              </div>
            }
          />
        )}
        {shouldShowSidebar && (
          <Route
            path="/metrics"
            element={
              <div style={{ display: 'flex' }}>
                <div style={{ flex: '0 0 20%' }}>
                  <Sidebar />
                </div>
                <div style={{ flex: '1 0 80%' }}>
                  <Metrics />
                </div>
              </div>
            }
          />
        )}
      </Routes>
    </div>
  );
}

export default App;