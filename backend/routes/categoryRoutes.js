import express from 'express';
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  toggleCategoryStatus
} from '../controllers/categoryController.js';
import { protect, authorize } from '../middleware/auth.js';
import { uploadSingle, handleMulterError } from '../middleware/upload.js';
import {
  categoryValidation,
  idValidation
} from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.get('/', getCategories);
router.get('/:id', idValidation, getCategoryById);

// Admin routes
router.post(
  '/',
  protect,
  authorize('admin'),
  uploadSingle,
  handleMulterError,
  categoryValidation,
  createCategory
);

router.put(
  '/:id',
  protect,
  authorize('admin'),
  uploadSingle,
  handleMulterError,
  idValidation,
  updateCategory
);

router.delete(
  '/:id',
  protect,
  authorize('admin'),
  idValidation,
  deleteCategory
);

router.put(
  '/:id/toggle-status',
  protect,
  authorize('admin'),
  idValidation,
  toggleCategoryStatus
);

export default router;
