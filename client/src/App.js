import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Registration from './components/Registration';
import Dashboard from './components/Dashboard';
import Create from './components/Create';
import Sidebar from './components/Sidebar';
import './App.css';

function App() {
  const location = useLocation();

  const shouldShowSidebar = !['/', '/register'].includes(location.pathname);

  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
        {shouldShowSidebar && (
          <Sidebar>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/create" element={<Create />} />
            </Routes>
          </Sidebar>
        )}
    </div>
  );
}

export default App;