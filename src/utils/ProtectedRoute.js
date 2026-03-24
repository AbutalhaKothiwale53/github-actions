import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, getUserRole } from '../modules/authModule';
import { getCurrentUser } from '../utils/authUtils';

const ProtectedRoute = ({ children, requiredRole = 'user' }) => {
  const user = getCurrentUser();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole === 'admin' && user.role !== 'admin') {
    return <Navigate to="/admin-login" replace />;
  }
  
  return children;
};

export default ProtectedRoute;
