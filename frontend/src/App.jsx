// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Login from './Login';
import AlumnoDashboard from './AlumnoDashboard';
import ProfesorDashboard from './ProfesorDashboard';
import ProtectedRoute from './ProtectedRoute';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/alumnodashboard"
            element={
              <ProtectedRoute>
                <AlumnoDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profesordashboard"
            element={
              <ProtectedRoute>
                <ProfesorDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
