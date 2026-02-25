import api from './api';

export const medicineService = {
  getMedicines: (params) => api.get('/medicines', { params }),
  getMedicineById: (id) => api.get(`/medicines/${id}`),
  createMedicine: (formData) => api.post('/medicines', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  updateMedicine: (id, formData) => api.put(`/medicines/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteMedicine: (id) => api.delete(`/medicines/${id}`),
  updateStock: (id, stock) => api.put(`/medicines/${id}/stock`, { stock }),
  getLowStockMedicines: () => api.get('/medicines/admin/low-stock'),
  addReview: (id, review) => api.post(`/medicines/${id}/reviews`, review)
};