import api from './api';

export const orderService = {
  createOrder: (orderData) => api.post('/orders', orderData),
  verifyPayment: (data) => api.post(`/orders/${data.orderId}/verify-payment`, data),
  uploadPrescription: (orderId, formData) => api.post(
    `/orders/${orderId}/prescription`,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  ),
  getMyOrders: (params) => api.get('/orders/my-orders', { params }),
  getOrderById: (id) => api.get(`/orders/${id}`),
  getAllOrders: (params) => api.get('/orders', { params }),
  verifyPrescription: (id, data) => api.put(`/orders/${id}/verify-prescription`, data),
  updateOrderStatus: (id, data) => api.put(`/orders/${id}/status`, data),
  getDashboardStats: () => api.get('/orders/stats/dashboard')
};