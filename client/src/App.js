import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Registration from './components/Registration';
import Dashboard from './components/Dashboard';
import Create from './components/Create';
import './App.css';

function App() {
  return (
<<<<<<< HEAD
    <div className="App">

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </div>
=======
    <Router>
      <div className="App">
        <h1>App.js</h1>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </div>
    </Router>
>>>>>>> c92074dcfe1a07e80d1e3949aa9e61ff06ae771f
  );
}

export default App;