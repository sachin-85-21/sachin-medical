import express from 'express';
import {
  getMedicines,
  getMedicineById,
  createMedicine,
  updateMedicine,
  deleteMedicine,
  updateStock,
  getLowStockMedicines,
  getExpiredMedicines,
  addReview
} from '../controllers/medicineController.js';
import { protect, authorize } from '../middleware/auth.js';
import { uploadMultiple, handleMulterError } from '../middleware/upload.js';
import {
  medicineValidation,
  idValidation,
  paginationValidation
} from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.get('/', paginationValidation, getMedicines);
router.get('/:id', idValidation, getMedicineById);

// Protected user routes
router.post('/:id/reviews', protect, addReview);

// Admin routes
router.post(
  '/',
  protect,
  authorize('admin'),
  uploadMultiple,
  handleMulterError,
  medicineValidation,
  createMedicine
);

router.put(
  '/:id',
  protect,
  authorize('admin'),
  uploadMultiple,
  handleMulterError,
  idValidation,
  updateMedicine
);

router.delete(
  '/:id',
  protect,
  authorize('admin'),
  idValidation,
  deleteMedicine
);

router.put(
  '/:id/stock',
  protect,
  authorize('admin'),
  idValidation,
  updateStock
);

router.get(
  '/admin/low-stock',
  protect,
  authorize('admin'),
  getLowStockMedicines
);

router.get(
  '/admin/expired',
  protect,
  authorize('admin'),
  getExpiredMedicines
);

export default router;
