import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import AlumnoDashboard from './AlumnoDashboard';
import ProfesorDashboard from './ProfesorDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/alumnodashboard" element={<AlumnoDashboard />} />
        <Route path="/profesordashboard" element={<ProfesorDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
