import api from './api';

export const authService = {
  // Register new user
  register: (userData) => api.post('/auth/register', userData),

  // Login user
  login: (email, password) => api.post('/auth/login', { email, password }),

  // Get current user
  getMe: () => api.get('/auth/me'),

  // Update profile
  updateProfile: (data) => api.put('/auth/profile', data),

  // Change password
  changePassword: (currentPassword, newPassword) => 
    api.put('/auth/change-password', { currentPassword, newPassword }),

  // Get all users (Admin)
  getAllUsers: (params) => api.get('/auth/users', { params }),

  // Toggle user status (Admin)
  toggleUserStatus: (userId) => api.put(`/auth/users/${userId}/toggle-status`)
};