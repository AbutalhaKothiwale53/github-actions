// utils/apiClient.js - API Service for Backend Communication
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:1900/api';

// Get token from localStorage
const getToken = () => localStorage.getItem('token');

// Make API request with proper headers and error handling
export const apiCall = async (endpoint, method = 'GET', data = null) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
  };

  // Add Authorization header if token exists
  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, config);
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.error || 'API Error');
      error.statusCode = response.status;
      error.data = responseData;
      throw error;
    }

    return {
      success: true,
      data: responseData.data || responseData,
      token: responseData.token,
      message: responseData.message,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      statusCode: error.statusCode || 0,
      data: error.data,
    };
  }
};

// Auth APIs
export const authAPI = {
  register: (username, email, password, name) =>
    apiCall('/auth/register', 'POST', { username, email, password, name }),

  login: (email, password) =>
    apiCall('/auth/login', 'POST', { email, password }),

  adminLogin: (email, password) =>
    apiCall('/auth/admin-login', 'POST', { email, password }),

  refreshToken: () => apiCall('/auth/refresh-token', 'POST'),

  getCurrentUser: () => apiCall('/auth/me', 'GET'),
};

// Story APIs
export const storyAPI = {
  createStory: (content) =>
    apiCall('/stories', 'POST', { content }),

  getStories: (page = 1, limit = 10) =>
    apiCall(`/stories?page=${page}&limit=${limit}`, 'GET'),

  getStoryById: (storyId) =>
    apiCall(`/stories/${storyId}`, 'GET'),

  getUserStories: (userId) =>
    apiCall(`/stories/user/${userId}`, 'GET'),

  updateStory: (storyId, content) =>
    apiCall(`/stories/${storyId}`, 'PUT', { content }),

  deleteStory: (storyId) =>
    apiCall(`/stories/${storyId}`, 'DELETE'),
};

// Like APIs
export const likeAPI = {
  likeStory: (storyId) =>
    apiCall(`/stories/${storyId}/like`, 'POST'),

  unlikeStory: (storyId) =>
    apiCall(`/stories/${storyId}/like`, 'DELETE'),

  getStoryLikes: (storyId) =>
    apiCall(`/stories/${storyId}/likes`, 'GET'),
};

// Comment APIs
export const commentAPI = {
  addComment: (storyId, text) =>
    apiCall(`/stories/${storyId}/comments`, 'POST', { text }),

  getComments: (storyId) =>
    apiCall(`/stories/${storyId}/comments`, 'GET'),

  deleteComment: (storyId, commentId) =>
    apiCall(`/stories/${storyId}/comments/${commentId}`, 'DELETE'),
};

// Admin APIs
export const adminAPI = {
  getDashboardStats: () =>
    apiCall('/admin/stats', 'GET'),

  getAllUsers: (page = 1, limit = 20) =>
    apiCall(`/admin/users?page=${page}&limit=${limit}`, 'GET'),

  getUserDetails: (userId) =>
    apiCall(`/admin/users/${userId}`, 'GET'),

  getAllStories: (page = 1, limit = 20) =>
    apiCall(`/admin/stories?page=${page}&limit=${limit}`, 'GET'),

  deleteStory: (storyId, reason) =>
    apiCall(`/admin/stories/${storyId}`, 'DELETE', { reason }),

  disableUser: (userId, reason) =>
    apiCall(`/admin/users/${userId}/status`, 'PUT', { isActive: false, reason }),

  enableUser: (userId) =>
    apiCall(`/admin/users/${userId}/status`, 'PUT', { isActive: true }),

  getAdminLogs: (page = 1, limit = 50) =>
    apiCall(`/admin/logs?page=${page}&limit=${limit}`, 'GET'),
};
