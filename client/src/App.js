import Login from './components/Login';
import Registration from './components/Registration';
import { Routes, Route } from 'react-router-dom'
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>App.js</h1>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Registration />} />
      </Routes>
    </div>
  );
}

export default App;
