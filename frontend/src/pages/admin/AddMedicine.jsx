import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { medicineService } from '../../services/medicineService';
import { categoryService } from '../../services/categoryService';
import Sidebar from '../../components/admin/Sidebar';
import { toast } from 'react-toastify';

const AddMedicine = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
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
    lowStockThreshold: '10',
    manufacturer: '',
    packSize: '',
    prescriptionRequired: false,
    expiryDate: '',
    batchNumber: '',
    gstPercentage: '12',
    tags: ''
  });
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

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
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      
      // Append all form fields
      Object.keys(formData).forEach(key => {
        if (key === 'tags') {
          data.append(key, JSON.stringify(formData[key].split(',').map(t => t.trim())));
        } else {
          data.append(key, formData[key]);
        }
      });

      // Append images
      images.forEach(image => {
        data.append('images', image);
      });

      await medicineService.createMedicine(data);
      toast.success('Medicine added successfully!');
      navigate('/admin/medicines');
    } catch (error) {
      console.error('Error adding medicine:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      
      <div className="flex-1 p-8 bg-gray-50">
        <h1 className="text-3xl font-bold mb-8">Add Medicine</h1>

        <form onSubmit={handleSubmit} className="card max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Info */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Medicine Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Manufacturer *</label>
              <input
                type="text"
                name="manufacturer"
                value={formData.manufacturer}
                onChange={handleChange}
                required
                className="input"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="3"
                className="input"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Composition *</label>
              <input
                type="text"
                name="composition"
                value={formData.composition}
                onChange={handleChange}
                required
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Pack Size *</label>
              <input
                type="text"
                name="packSize"
                value={formData.packSize}
                onChange={handleChange}
                required
                placeholder="e.g., 10 Tablets"
                className="input"
              />
            </div>

            {/* Medical Info */}
            <div className="md:col-span-2 mt-4">
              <h3 className="text-lg font-semibold mb-4">Medical Information</h3>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Uses *</label>
              <textarea
                name="uses"
                value={formData.uses}
                onChange={handleChange}
                required
                rows="2"
                className="input"
              ></textarea>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Side Effects</label>
              <textarea
                name="sideEffects"
                value={formData.sideEffects}
                onChange={handleChange}
                rows="2"
                className="input"
              ></textarea>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Dosage</label>
              <input
                type="text"
                name="dosage"
                value={formData.dosage}
                onChange={handleChange}
                className="input"
              />
            </div>

            {/* Pricing & Inventory */}
            <div className="md:col-span-2 mt-4">
              <h3 className="text-lg font-semibold mb-4">Pricing & Inventory</h3>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="input"
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Price (₹) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Discount Price (₹)</label>
              <input
                type="number"
                name="discountPrice"
                value={formData.discountPrice}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Stock *</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                min="0"
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">GST (%)</label>
              <input
                type="number"
                name="gstPercentage"
                value={formData.gstPercentage}
                onChange={handleChange}
                min="0"
                max="100"
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Low Stock Alert</label>
              <input
                type="number"
                name="lowStockThreshold"
                value={formData.lowStockThreshold}
                onChange={handleChange}
                min="0"
                className="input"
              />
            </div>

            {/* Additional Info */}
            <div className="md:col-span-2 mt-4">
              <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Expiry Date *</label>
              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                required
                className="input"
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

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Tags (comma separated)</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="fever, pain, headache"
                className="input"
              />
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="prescriptionRequired"
                  checked={formData.prescriptionRequired}
                  onChange={handleChange}
                />
                <span className="text-sm font-medium">Prescription Required</span>
              </label>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="input"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <button type="submit" disabled={loading} className="btn btn-primary">
              {loading ? 'Adding...' : 'Add Medicine'}
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

export default AddMedicine;