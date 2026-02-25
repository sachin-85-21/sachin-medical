import express from 'express';
import {
  createOrder,
  verifyPayment,
  uploadPrescription,
  verifyPrescription,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  getDashboardStats
} from '../controllers/orderController.js';
import { protect, authorize } from '../middleware/auth.js';
import { uploadPrescription as uploadPrescriptionMiddleware, handleMulterError } from '../middleware/upload.js';
import {
  orderValidation,
  idValidation,
  paginationValidation
} from '../middleware/validation.js';

const router = express.Router();

// Protected user routes
router.post('/', protect, orderValidation, createOrder);
router.post('/:id/verify-payment', protect, idValidation, verifyPayment);
router.post(
  '/:id/prescription',
  protect,
  uploadPrescriptionMiddleware,
  handleMulterError,
  idValidation,
  uploadPrescription
);
router.get('/my-orders', protect, paginationValidation, getMyOrders);
router.get('/:id', protect, idValidation, getOrderById);

// Admin routes
router.get('/', protect, authorize('admin'), paginationValidation, getAllOrders);
router.put('/:id/verify-prescription', protect, authorize('admin'), idValidation, verifyPrescription);
router.put('/:id/status', protect, authorize('admin'), idValidation, updateOrderStatus);
router.get('/stats/dashboard', protect, authorize('admin'), getDashboardStats);

export default router;
