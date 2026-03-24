import { authAPI } from '../utils/apiClient';
import logger from '../utils/frontendLogger';

// User Registration
export const registerUser = async (name, email, password) => {
  try {
    logger.info('User registration attempt', { name, email });
    
    const response = await authAPI.register('', email, password, name);

    if (response.success) {
      // Auto-login: Save user and token to localStorage
      saveUserToLocalStorage(response.data.user, response.token);
      logger.info('User registered and logged in successfully', { 
        email, 
        userId: response.data.user._id 
      });
      return response;
    } else {
      logger.warn('User registration failed', { email, error: response.error });
      return response;
    }
  } catch (error) {
    logger.error('Registration Error', { email, error: error.message });
    return {
      success: false,
      error: error.message || 'Registration failed',
    };
  }
};

// User Login
export const loginUser = async (email, password) => {
  try {
    logger.info('User login attempt', { email });
    const response = await authAPI.login(email, password);

    if (response.success) {
      saveUserToLocalStorage(response.data.user, response.token);
      logger.info('User logged in successfully', { email, userId: response.data.user._id });
      return response;
    } else {
      logger.warn('User login failed', { error: response.error });
      return response;
    }
  } catch (error) {
    logger.logError('Login Error', error, { email });
    return {
      success: false,
      error: error.message || 'Login failed',
    };
  }
};

// Admin Login
export const loginAdmin = async (email, password) => {
  try {
    logger.info('Admin login attempt', { email });
    const response = await authAPI.adminLogin(email, password);

    if (response.success) {
      saveAdminToLocalStorage(response.data.user, response.token);
      logger.info('Admin logged in successfully', { email, adminId: response.data.user._id });
      return response;
    } else {
      logger.warn('Admin login failed', { error: response.error });
      return response;
    }
  } catch (error) {
    logger.logError('Admin Login Error', error, { email });
    return {
      success: false,
      error: error.message || 'Admin login failed',
    };
  }
};

// Save user to localStorage
export const saveUserToLocalStorage = (user, token) => {
  localStorage.setItem('currentUser', JSON.stringify(user));
  localStorage.setItem('authToken', token);
  localStorage.setItem('userRole', 'user');
  localStorage.setItem('isAuthenticated', 'true');
};

// Save admin to localStorage
export const saveAdminToLocalStorage = (admin, token) => {
  localStorage.setItem('currentAdmin', JSON.stringify(admin));
  localStorage.setItem('authToken', token);
  localStorage.setItem('userRole', 'admin');
  localStorage.setItem('isAuthenticated', 'true');
};

// Get current user
export const getCurrentUser = () => {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
};

// Get current admin
export const getCurrentAdmin = () => {
  const admin = localStorage.getItem('currentAdmin');
  return admin ? JSON.parse(admin) : null;
};

// Get user role
export const getUserRole = () => {
  return localStorage.getItem('userRole') || null;
};

// Check if authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem('authToken');
  return !!token && localStorage.getItem('isAuthenticated') === 'true';
};

// Logout
export const logout = () => {
  
  logger.logUserAction('Logout', {
    user: getCurrentUser()?.name || getCurrentAdmin()?.name,
  });

  localStorage.removeItem('currentUser');
  localStorage.removeItem('currentAdmin');
  localStorage.removeItem('token');
  localStorage.removeItem('userRole');
  localStorage.removeItem('isAuthenticated');
  
};
