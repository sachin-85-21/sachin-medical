import { body, param, query, validationResult } from 'express-validator';
import { ErrorHandler } from './error.js';

/**
 * Validate request and return errors if any
 */
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(err => err.msg).join(', ');
    return next(new ErrorHandler(errorMessages, 400));
  }
  
  next();
};

/**
 * User Registration Validation
 */
export const registerValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2-50 characters'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  
  body('phone')
    .trim()
    .notEmpty().withMessage('Phone number is required')
    .matches(/^[0-9]{10}$/).withMessage('Please provide a valid 10-digit phone number'),
  
  validate
];

/**
 * User Login Validation
 */
export const loginValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('password')
    .notEmpty().withMessage('Password is required'),
  
  validate
];

/**
 * Medicine Creation Validation
 */
export const medicineValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Medicine name is required')
    .isLength({ max: 200 }).withMessage('Name cannot exceed 200 characters'),
  
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .isLength({ max: 2000 }).withMessage('Description cannot exceed 2000 characters'),
  
  body('composition')
    .trim()
    .notEmpty().withMessage('Composition is required'),
  
  body('uses')
    .trim()
    .notEmpty().withMessage('Uses are required'),
  
  body('category')
    .notEmpty().withMessage('Category is required')
    .isMongoId().withMessage('Invalid category ID'),
  
  body('price')
    .notEmpty().withMessage('Price is required')
    .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  
  body('stock')
    .notEmpty().withMessage('Stock is required')
    .isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
  
  body('manufacturer')
    .trim()
    .notEmpty().withMessage('Manufacturer is required'),
  
  body('packSize')
    .trim()
    .notEmpty().withMessage('Pack size is required'),
  
  body('expiryDate')
    .notEmpty().withMessage('Expiry date is required')
    .isISO8601().withMessage('Invalid expiry date')
    .custom((value) => {
      if (new Date(value) <= new Date()) {
        throw new Error('Expiry date must be in the future');
      }
      return true;
    }),
  
  validate
];

/**
 * Order Creation Validation
 */
export const orderValidation = [
  body('items')
    .isArray({ min: 1 }).withMessage('Order must contain at least one item'),
  
  body('items.*.medicine')
    .notEmpty().withMessage('Medicine ID is required')
    .isMongoId().withMessage('Invalid medicine ID'),
  
  body('items.*.quantity')
    .notEmpty().withMessage('Quantity is required')
    .isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  
  body('shippingAddress.name')
    .trim()
    .notEmpty().withMessage('Shipping name is required'),
  
  body('shippingAddress.phone')
    .trim()
    .notEmpty().withMessage('Phone number is required')
    .matches(/^[0-9]{10}$/).withMessage('Invalid phone number'),
  
  body('shippingAddress.street')
    .trim()
    .notEmpty().withMessage('Street address is required'),
  
  body('shippingAddress.city')
    .trim()
    .notEmpty().withMessage('City is required'),
  
  body('shippingAddress.state')
    .trim()
    .notEmpty().withMessage('State is required'),
  
  body('shippingAddress.pincode')
    .trim()
    .notEmpty().withMessage('Pincode is required')
    .matches(/^[0-9]{6}$/).withMessage('Invalid pincode'),
  
  body('payment.method')
    .notEmpty().withMessage('Payment method is required')
    .isIn(['razorpay', 'cod', 'upi']).withMessage('Invalid payment method'),
  
  validate
];

/**
 * Category Validation
 */
export const categoryValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Category name is required')
    .isLength({ max: 50 }).withMessage('Name cannot exceed 50 characters'),
  
  validate
];

/**
 * MongoDB ID Validation
 */
export const idValidation = [
  param('id')
    .isMongoId().withMessage('Invalid ID format'),
  
  validate
];

/**
 * Pagination Validation
 */
export const paginationValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  
  validate
];
