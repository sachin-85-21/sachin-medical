export const formatCurrency = (amount) => {
  return `₹${parseFloat(amount).toFixed(2)}`;
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatDateTime = (date) => {
  return new Date(date).toLocaleString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const calculateDiscount = (price, discountPrice) => {
  if (!discountPrice) return 0;
  return Math.round(((price - discountPrice) / price) * 100);
};

export const getOrderStatusBadge = (status) => {
  const badges = {
    placed: 'badge-info',
    processing: 'badge-warning',
    out_for_delivery: 'badge-warning',
    delivered: 'badge-success',
    cancelled: 'badge-danger'
  };
  return badges[status] || 'badge-info';
};

export const getOrderStatusText = (status) => {
  const texts = {
    placed: 'Order Placed',
    processing: 'Processing',
    out_for_delivery: 'Out for Delivery',
    delivered: 'Delivered',
    cancelled: 'Cancelled'
  };
  return texts[status] || status;
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  const re = /^[0-9]{10}$/;
  return re.test(phone);
};

export const validatePincode = (pincode) => {
  const re = /^[0-9]{6}$/;
  return re.test(pincode);
};

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const getFileExtension = (filename) => {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
};

export const isValidImageFile = (file) => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
  return validTypes.includes(file.type);
};

export const isValidPdfFile = (file) => {
  return file.type === 'application/pdf';
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const calculateGST = (price, gstPercentage) => {
  return (price * gstPercentage) / 100;
};

export const calculateDeliveryCharge = (subtotal) => {
  return subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_CHARGE;
};

export const getStockStatus = (stock, lowStockThreshold = 10) => {
  if (stock === 0) return { status: 'out_of_stock', color: 'text-red-600', badge: 'badge-danger' };
  if (stock <= lowStockThreshold) return { status: 'low_stock', color: 'text-yellow-600', badge: 'badge-warning' };
  return { status: 'in_stock', color: 'text-green-600', badge: 'badge-success' };
};

export const isExpired = (expiryDate) => {
  return new Date(expiryDate) < new Date();
};

export const getDaysUntilExpiry = (expiryDate) => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const diffTime = expiry - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export default {
  formatCurrency,
  formatDate,
  formatDateTime,
  calculateDiscount,
  getOrderStatusBadge,
  getOrderStatusText,
  validateEmail,
  validatePhone,
  validatePincode,
  truncateText,
  getFileExtension,
  isValidImageFile,
  isValidPdfFile,
  formatFileSize,
  debounce,
  calculateGST,
  calculateDeliveryCharge,
  getStockStatus,
  isExpired,
  getDaysUntilExpiry
};
