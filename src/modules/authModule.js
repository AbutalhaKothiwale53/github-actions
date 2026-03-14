// Mock user data for authentication
export const MOCK_USERS = [
  {
    id: 1,
    username: 'user1',
    email: 'user1@example.com',
    password: 'password123',
    name: 'John Doe',
    role: 'user',
    createdAt: '2026-01-15',
  },
  {
    id: 2,
    username: 'user2',
    email: 'user2@example.com',
    password: 'password123',
    name: 'Jane Smith',
    role: 'user',
    createdAt: '2026-02-10',
  },
];

export const MOCK_ADMINS = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
    createdAt: '2025-12-01',
  },
];

// Authentication functions
export const validateUserLogin = (username, password) => {
  const user = MOCK_USERS.find(
    (u) => u.username === username && u.password === password
  );
  return user || null;
};

export const validateAdminLogin = (username, password) => {
  const admin = MOCK_ADMINS.find(
    (a) => a.username === username && a.password === password
  );
  return admin || null;
};

export const saveUserToLocalStorage = (user) => {
  localStorage.setItem('currentUser', JSON.stringify(user));
  localStorage.setItem('userRole', 'user');
  localStorage.setItem('isAuthenticated', 'true');
};

export const saveAdminToLocalStorage = (admin) => {
  localStorage.setItem('currentAdmin', JSON.stringify(admin));
  localStorage.setItem('userRole', 'admin');
  localStorage.setItem('isAuthenticated', 'true');
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
};

export const getCurrentAdmin = () => {
  const admin = localStorage.getItem('currentAdmin');
  return admin ? JSON.parse(admin) : null;
};

export const getUserRole = () => {
  return localStorage.getItem('userRole') || null;
};

export const isAuthenticated = () => {
  return localStorage.getItem('isAuthenticated') === 'true';
};

export const logout = () => {
  localStorage.removeItem('currentUser');
  localStorage.removeItem('currentAdmin');
  localStorage.removeItem('userRole');
  localStorage.removeItem('isAuthenticated');
};
