import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Sidebar from '../../components/admin/Sidebar';
import { medicineService } from '../../services/medicineService';
import { categoryService } from '../../services/categoryService';

const EditMedicine = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    composition: '',
    uses: '',
    sideEffects: '',
    dosage: '',
    category: '',
    price: '',
    discountPrice: '',
    stock: '',
    manufacturer: '',
    packSize: '',
    prescriptionRequired: false,
    expiryDate: '',
    batchNumber: '',
    tags: ''
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  useEffect(() => {
    fetchMedicine();
    fetchCategories();
  }, [id]);

  const fetchMedicine = async () => {
    try {
      setFetchingData(true);
      const { data } = await medicineService.getMedicineById(id);
      const medicine = data.medicine;
      
      setFormData({
        name: medicine.name || '',
        description: medicine.description || '',
        composition: medicine.composition || '',
        uses: medicine.uses || '',
        sideEffects: medicine.sideEffects || '',
        dosage: medicine.dosage || '',
        category: medicine.category?._id || '',
        price: medicine.price || '',
        discountPrice: medicine.discountPrice || '',
        stock: medicine.stock || '',
        manufacturer: medicine.manufacturer || '',
        packSize: medicine.packSize || '',
        prescriptionRequired: medicine.prescriptionRequired || false,
        expiryDate: medicine.expiryDate ? new Date(medicine.expiryDate).toISOString().split('T')[0] : '',
        batchNumber: medicine.batchNumber || '',
        tags: medicine.tags?.join(', ') || ''
      });
      
      setExistingImages(medicine.images || []);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch medicine');
      navigate('/admin/medicines');
    } finally {
      setFetchingData(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await categoryService.getCategories();
      setCategories(data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleImageChange = (e) => {
    setImageFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      
      Object.keys(formData).forEach(key => {
        if (key === 'tags') {
          data.append(key, formData[key].split(',').map(tag => tag.trim()).filter(Boolean).join(','));
        } else {
          data.append(key, formData[key]);
        }
      });

      if (imageFiles.length > 0) {
        imageFiles.forEach(file => {
          data.append('images', file);
        });
      }

      await medicineService.updateMedicine(id, data);
      toast.success('Medicine updated successfully!');
      navigate('/admin/medicines');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update medicine');
    } finally {
      setLoading(false);
    }
  };

  if (fetchingData) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-8 bg-gray-50 flex items-center justify-center">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-50">
        <h1 className="text-3xl font-bold mb-8">Edit Medicine</h1>

        <form onSubmit={handleSubmit} className="card">
          {/* Basic Information */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Medicine Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Manufacturer *</label>
                <input
                  type="text"
                  name="manufacturer"
                  value={formData.manufacturer}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className="input"
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="input"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Pack Size</label>
                <input
                  type="text"
                  name="packSize"
                  value={formData.packSize}
                  onChange={handleChange}
                  className="input"
                  placeholder="e.g., 10 Tablets"
                />
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Medical Information</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Composition</label>
                <input
                  type="text"
                  name="composition"
                  value={formData.composition}
                  onChange={handleChange}
                  className="input"
                  placeholder="e.g., Paracetamol 650mg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Uses</label>
                <textarea
                  name="uses"
                  value={formData.uses}
                  onChange={handleChange}
                  rows="2"
                  className="input"
                  placeholder="What is this medicine used for?"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Side Effects</label>
                <textarea
                  name="sideEffects"
                  value={formData.sideEffects}
                  onChange={handleChange}
                  rows="2"
                  className="input"
                  placeholder="Common side effects"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Dosage Instructions</label>
                <textarea
                  name="dosage"
                  value={formData.dosage}
                  onChange={handleChange}
                  rows="2"
                  className="input"
                  placeholder="How to take this medicine?"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Pricing & Inventory */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Pricing & Inventory</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Price (₹) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="input"
                  required
                  min="0"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Discount Price (₹)</label>
                <input
                  type="number"
                  name="discountPrice"
                  value={formData.discountPrice}
                  onChange={handleChange}
                  className="input"
                  min="0"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Stock Quantity *</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="input"
                  required
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Batch Number</label>
                <input
                  type="text"
                  name="batchNumber"
                  value={formData.batchNumber}
                  onChange={handleChange}
                  className="input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Expiry Date</label>
                <input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  className="input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tags (comma separated)</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="input"
                  placeholder="fever, pain, cold"
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Images</h2>
            
            {existingImages.length > 0 && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Current Images</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {existingImages.map((img, index) => (
                    <div key={index} className="border rounded-lg p-2">
                      <img src={img.url} alt="Medicine" className="w-full h-32 object-cover rounded" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Upload New Images (Optional)</label>
              <input
                type="file"
                onChange={handleImageChange}
                className="input"
                multiple
                accept="image/*"
              />
              <p className="text-sm text-gray-500 mt-1">Upload new images to replace existing ones</p>
            </div>
          </div>

          {/* Additional Options */}
          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="prescriptionRequired"
                checked={formData.prescriptionRequired}
                onChange={handleChange}
                className="mr-2"
              />
              <span className="text-sm font-medium">Prescription Required</span>
            </label>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? 'Updating...' : 'Update Medicine'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/medicines')}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMedicine;