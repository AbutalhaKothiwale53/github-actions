import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, getUserRole } from '../modules/authModule';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const isAuth = isAuthenticated();
  const userRole = getUserRole();

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to={requiredRole === 'admin' ? '/login' : '/admin-login'} replace />;
  }

  return children;
};

export default ProtectedRoute;
