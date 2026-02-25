export const ORDER_STATUS = {
  PLACED: 'placed',
  PROCESSING: 'processing',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
};

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded'
};

export const PAYMENT_METHODS = {
  COD: 'cod',
  RAZORPAY: 'razorpay',
  UPI: 'upi'
};

export const PRESCRIPTION_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected'
};

export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin'
};

export const FREE_DELIVERY_THRESHOLD = 500;
export const DELIVERY_CHARGE = 40;
