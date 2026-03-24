// Get user from token (for ProtectedRoute, UserHome)
export const getCurrentUser = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      id: payload.userId,
      name: payload.name || 'User', // Add name if backend sends it
      email: payload.email || '',
      role: payload.role || 'user'
    };
  } catch {
    localStorage.removeItem('token');
    return null;
  }
};

// Logout
export const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/';
};
