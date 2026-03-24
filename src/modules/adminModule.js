import { adminAPI } from '../utils/apiClient';
import logger from '../utils/frontendLogger';

// Get dashboard statistics
export const getDashboardStats = async () => {
  try {
    logger.info('Fetching dashboard stats');
    const response = await adminAPI.getDashboardStats();
    if (response.success) {
      logger.info('Dashboard stats fetched successfully', { stats: response.data });
      return response;
    } else {
      logger.warn('Failed to fetch dashboard stats', { error: response.error });
      return response;
    }
  } catch (error) {
    logger.error('Error fetching dashboard stats', { error: error.message });
    return {
      success: false,
      error: error.message,
      data: null,
    };
  }
};

// Get all users with their statistics
export const getAllUsers = async () => {
  try {
    logger.info('Fetching all users');
    const response = await adminAPI.getAllUsers();
    if (response.success) {
      logger.info('Users fetched successfully', { count: response.data?.length || 0 });
      return response;
    } else {
      logger.warn('Failed to fetch users', { error: response.error });
      return response;
    }
  } catch (error) {
    logger.error('Error fetching users', { error: error.message });
    return {
      success: false,
      error: error.message,
      data: [],
    };
  }
};

// Get all posts with author information
export const getAllPosts = async () => {
  try {
    logger.info('Fetching all posts');
    const response = await adminAPI.getAllPosts();
    if (response.success) {
      logger.info('Posts fetched successfully', { count: response.data?.length || 0 });
      return response;
    } else {
      logger.warn('Failed to fetch posts', { error: response.error });
      return response;
    }
  } catch (error) {
    logger.error('Error fetching posts', { error: error.message });
    return {
      success: false,
      error: error.message,
      data: [],
    };
  }
};

// Delete a post
export const deletePost = async (postId) => {
  try {
    logger.logUserAction('Deleting post', { postId });
    const response = await adminAPI.deletePost(postId);
    if (response.success) {
      logger.info('Post deleted successfully', { postId });
      return response;
    } else {
      logger.warn('Failed to delete post', { postId, error: response.error });
      return response;
    }
  } catch (error) {
    logger.error('Error deleting post', { postId, error: error.message });
    return {
      success: false,
      error: error.message,
      data: null,
    };
  }
};

// Get user by ID
export const getUserById = async (userId) => {
  try {
    logger.info('Fetching user details', { userId });
    const response = await adminAPI.getUserById(userId);
    if (response.success) {
      logger.info('User details fetched successfully', { userId });
      return response;
    } else {
      logger.warn('Failed to fetch user details', { userId, error: response.error });
      return response;
    }
  } catch (error) {
    logger.error('Error fetching user details', { userId, error: error.message });
    return {
      success: false,
      error: error.message,
      data: null,
    };
  }
};

// Disable/Ban a user
export const disableUser = async (userId) => {
  try {
    logger.logUserAction('Disabling user', { userId });
    const response = await adminAPI.disableUser(userId);
    if (response.success) {
      logger.info('User disabled successfully', { userId });
      return response;
    } else {
      logger.warn('Failed to disable user', { userId, error: response.error });
      return response;
    }
  } catch (error) {
    logger.error('Error disabling user', { userId, error: error.message });
    return {
      success: false,
      error: error.message,
      data: null,
    };
  }
};

// Enable a user
export const enableUser = async (userId) => {
  try {
    logger.logUserAction('Enabling user', { userId });
    const response = await adminAPI.enableUser(userId);
    if (response.success) {
      logger.info('User enabled successfully', { userId });
      return response;
    } else {
      logger.warn('Failed to enable user', { userId, error: response.error });
      return response;
    }
  } catch (error) {
    logger.error('Error enabling user', { userId, error: error.message });
    return {
      success: false,
      error: error.message,
      data: null,
    };
  }
};

// Get admin activity logs
export const getAdminLogs = async () => {
  try {
    logger.info('Fetching admin logs');
    const response = await adminAPI.getAdminLogs();
    if (response.success) {
      logger.info('Admin logs fetched successfully', { count: response.data?.length || 0 });
      return response;
    } else {
      logger.warn('Failed to fetch admin logs', { error: response.error });
      return response;
    }
  } catch (error) {
    logger.error('Error fetching admin logs', { error: error.message });
    return {
      success: false,
      error: error.message,
      data: [],
    };
  }
};
