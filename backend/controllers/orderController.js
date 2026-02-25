import Order from '../models/Order.js';
import Medicine from '../models/Medicine.js';
import { asyncHandler } from '../middleware/error.js';
import { ErrorHandler } from '../middleware/error.js';
import { uploadToCloudinary } from '../config/cloudinary.js';
import Razorpay from 'razorpay';
import crypto from 'crypto';

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

/**
 * @desc    Create new order
 * @route   POST /api/orders
 * @access  Private
 */
export const createOrder = asyncHandler(async (req, res, next) => {
  const { items, shippingAddress, payment } = req.body;

  // Validate and calculate pricing
  let itemsTotal = 0;
  let gstTotal = 0;
  const orderItems = [];
  let requiresPrescription = false;

  for (const item of items) {
    const medicine = await Medicine.findById(item.medicine);

    if (!medicine) {
      return next(new ErrorHandler(`Medicine not found: ${item.medicine}`, 404));
    }

    if (!medicine.isActive) {
      return next(new ErrorHandler(`Medicine is not available: ${medicine.name}`, 400));
    }

    if (medicine.stock < item.quantity) {
      return next(new ErrorHandler(`Insufficient stock for ${medicine.name}. Available: ${medicine.stock}`, 400));
    }

    const price = medicine.discountPrice || medicine.price;
    const gst = (price * medicine.gstPercentage) / 100;

    itemsTotal += price * item.quantity;
    gstTotal += gst * item.quantity;

    if (medicine.prescriptionRequired) {
      requiresPrescription = true;
    }

    orderItems.push({
      medicine: medicine._id,
      name: medicine.name,
      quantity: item.quantity,
      price: price,
      gst: gst,
      prescriptionRequired: medicine.prescriptionRequired
    });
  }

  // Calculate delivery charge (free above ₹500)
  const deliveryCharge = itemsTotal >= 500 ? 0 : 40;

  // Calculate total
  const totalAmount = itemsTotal + gstTotal + deliveryCharge;

  // Create order object
  const orderData = {
    user: req.user.id,
    items: orderItems,
    shippingAddress,
    payment: {
      method: payment.method,
      status: payment.method === 'cod' ? 'pending' : 'pending'
    },
    pricing: {
      itemsTotal,
      gstTotal,
      deliveryCharge,
      discount: 0,
      totalAmount
    }
  };

  // Handle Razorpay payment
  if (payment.method === 'razorpay') {
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(totalAmount * 100), // Convert to paise
      currency: 'INR',
      receipt: `order_${Date.now()}`
    });

    orderData.payment.razorpayOrderId = razorpayOrder.id;
  }

 // Generate order number manually
const date = new Date();
const year = date.getFullYear().toString().slice(-2);
const month = String(date.getMonth() + 1).padStart(2, '0');
const count = await Order.countDocuments();
const orderNumber = `SM${year}${month}${String(count + 1).padStart(5, '0')}`;

orderData.orderNumber = orderNumber;

const order = await Order.create(orderData);

  res.status(201).json({
    success: true,
    message: 'Order created successfully',
    order,
    requiresPrescription
  });
});

/**
 * @desc    Verify Razorpay payment
 * @route   POST /api/orders/:id/verify-payment
 * @access  Private
 */
export const verifyPayment = asyncHandler(async (req, res, next) => {
  const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler('Order not found', 404));
  }

  // Verify signature
  const sign = razorpayOrderId + '|' + razorpayPaymentId;
  const expectedSign = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(sign.toString())
    .digest('hex');

  if (razorpaySignature !== expectedSign) {
    order.payment.status = 'failed';
    await order.save();
    return next(new ErrorHandler('Invalid payment signature', 400));
  }

  // Update order
  order.payment.status = 'completed';
  order.payment.razorpayPaymentId = razorpayPaymentId;
  order.payment.razorpaySignature = razorpaySignature;
  order.payment.paidAt = Date.now();

  // Reduce stock
  for (const item of order.items) {
    await Medicine.findByIdAndUpdate(item.medicine, {
      $inc: { stock: -item.quantity }
    });
  }

  await order.save();

  res.status(200).json({
    success: true,
    message: 'Payment verified successfully',
    order
  });
});

/**
 * @desc    Upload prescription
 * @route   POST /api/orders/:id/prescription
 * @access  Private
 */
export const uploadPrescription = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler('Order not found', 404));
  }

  if (order.user.toString() !== req.user.id.toString()) {
    return next(new ErrorHandler('Not authorized to upload prescription for this order', 403));
  }

  if (!req.file) {
    return next(new ErrorHandler('Please upload a prescription file', 400));
  }

  // Upload to Cloudinary
  const result = await uploadToCloudinary(req.file.path, 'prescriptions');

  order.prescription = {
    url: result.url,
    publicId: result.publicId,
    status: 'pending'
  };

  await order.save();

  res.status(200).json({
    success: true,
    message: 'Prescription uploaded successfully',
    order
  });
});

/**
 * @desc    Verify prescription (Admin)
 * @route   PUT /api/orders/:id/verify-prescription
 * @access  Private/Admin
 */
export const verifyPrescription = asyncHandler(async (req, res, next) => {
  const { status, rejectionReason } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler('Order not found', 404));
  }

  if (!order.prescription || !order.prescription.url) {
    return next(new ErrorHandler('No prescription uploaded for this order', 400));
  }

  order.prescription.status = status;
  order.prescription.verifiedBy = req.user.id;
  order.prescription.verifiedAt = Date.now();

  if (status === 'rejected' && rejectionReason) {
    order.prescription.rejectionReason = rejectionReason;
  }

  // If approved and COD, reduce stock
  if (status === 'approved' && order.payment.method === 'cod') {
    for (const item of order.items) {
      await Medicine.findByIdAndUpdate(item.medicine, {
        $inc: { stock: -item.quantity }
      });
    }
  }

  await order.save();

  res.status(200).json({
    success: true,
    message: `Prescription ${status} successfully`,
    order
  });
});

/**
 * @desc    Get my orders
 * @route   GET /api/orders/my-orders
 * @access  Private
 */
export const getMyOrders = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const total = await Order.countDocuments({ user: req.user.id });
  const orders = await Order.find({ user: req.user.id })
    .populate('items.medicine', 'name images')
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: orders.length,
    total,
    page,
    pages: Math.ceil(total / limit),
    orders
  });
});

/**
 * @desc    Get order by ID
 * @route   GET /api/orders/:id
 * @access  Private
 */
export const getOrderById = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id)
    .populate('user', 'name email phone')
    .populate('items.medicine', 'name images manufacturer')
    .populate('prescription.verifiedBy', 'name');

  if (!order) {
    return next(new ErrorHandler('Order not found', 404));
  }

  // Check authorization
  if (order.user._id.toString() !== req.user.id.toString() && req.user.role !== 'admin') {
    return next(new ErrorHandler('Not authorized to view this order', 403));
  }

  res.status(200).json({
    success: true,
    order
  });
});

/**
 * @desc    Get all orders (Admin)
 * @route   GET /api/orders
 * @access  Private/Admin
 */
export const getAllOrders = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  // Build query
  let query = {};

  if (req.query.status) {
    query.orderStatus = req.query.status;
  }

  if (req.query.paymentStatus) {
    query['payment.status'] = req.query.paymentStatus;
  }

  if (req.query.prescriptionStatus) {
    query['prescription.status'] = req.query.prescriptionStatus;
  }

  const total = await Order.countDocuments(query);
  const orders = await Order.find(query)
    .populate('user', 'name email phone')
    .populate('items.medicine', 'name')
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: orders.length,
    total,
    page,
    pages: Math.ceil(total / limit),
    orders
  });
});

/**
 * @desc    Update order status (Admin)
 * @route   PUT /api/orders/:id/status
 * @access  Private/Admin
 */
export const updateOrderStatus = asyncHandler(async (req, res, next) => {
  const { status, comment } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler('Order not found', 404));
  }

  order.orderStatus = status;

  // Add to status history
  order.statusHistory.push({
    status,
    comment,
    updatedBy: req.user.id,
    timestamp: Date.now()
  });

  if (status === 'delivered') {
    order.deliveredAt = Date.now();
  }

  if (status === 'cancelled') {
    order.cancelledAt = Date.now();
    // Restore stock
    for (const item of order.items) {
      await Medicine.findByIdAndUpdate(item.medicine, {
        $inc: { stock: item.quantity }
      });
    }
  }

  await order.save();

  res.status(200).json({
    success: true,
    message: 'Order status updated successfully',
    order
  });
});

/**
 * @desc    Get dashboard stats (Admin)
 * @route   GET /api/orders/stats/dashboard
 * @access  Private/Admin
 */
export const getDashboardStats = asyncHandler(async (req, res, next) => {
  // Total revenue
  const revenueData = await Order.aggregate([
    { $match: { 'payment.status': 'completed' } },
    { $group: { _id: null, total: { $sum: '$pricing.totalAmount' } } }
  ]);
  const totalRevenue = revenueData[0]?.total || 0;

  // Total orders
  const totalOrders = await Order.countDocuments();

  // Pending orders
  const pendingOrders = await Order.countDocuments({ orderStatus: 'placed' });

  // Low stock medicines
  const lowStockCount = await Medicine.countDocuments({
    $expr: { $lte: ['$stock', '$lowStockThreshold'] }
  });

  // Recent orders
  const recentOrders = await Order.find()
    .populate('user', 'name')
    .limit(5)
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    stats: {
      totalRevenue,
      totalOrders,
      pendingOrders,
      lowStockCount,
      recentOrders
    }
  });
});
