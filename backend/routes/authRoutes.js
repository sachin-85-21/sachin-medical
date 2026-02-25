import express from 'express';
import {
  register,
  login,
  getMe,
  updateProfile,
  changePassword,
  getAllUsers,
  toggleUserStatus
} from '../controllers/authController.js';
import { protect, authorize } from '../middleware/auth.js';
import {
  registerValidation,
  loginValidation
} from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);

// Protected routes
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.put('/change-password', protect, changePassword);

// Admin routes
router.get('/users', protect, authorize('admin'), getAllUsers);
router.put('/users/:id/toggle-status', protect, authorize('admin'), toggleUserStatus);

export default router;
