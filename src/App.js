// App.js - Main application component with routing and authentication
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Authentication Components
import UserLogin from './components/Auth/UserLogin';
import UserRegister from './components/Auth/UserRegister';
import AdminLogin from './components/Auth/AdminLogin';

// User Components
import UserHome from './components/User/UserHome';

// Admin Components
import AdminDashboard from './components/Admin/AdminDashboard';

// Utility Components
import ProtectedRoute from './utils/ProtectedRoute';
import NotFound from './components/NotFound';
import logger from './utils/frontendLogger';

function App() {
  useEffect(() => {
    // Initialize frontend logger
    logger.info('Application initialized', {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent.substring(0, 50),
    });

    // Log when user leaves app
    return () => {
      logger.info('Application unloading');
    };
  }, []);

  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<UserLogin />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* User Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute requiredRole="user">
              <UserHome />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
