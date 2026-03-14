import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Authentication Components
import UserLogin from './components/Auth/UserLogin';
import AdminLogin from './components/Auth/AdminLogin';

// User Components
import UserHome from './components/User/UserHome';

// Admin Components
import AdminDashboard from './components/Admin/AdminDashboard';

// Utility Components
import ProtectedRoute from './utils/ProtectedRoute';
import NotFound from './components/NotFound';

function App() {
  useEffect(() => {
    // This can be used for global initialization or checks
  }, []);

  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<UserLogin />} />
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
          path="/admin-dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
