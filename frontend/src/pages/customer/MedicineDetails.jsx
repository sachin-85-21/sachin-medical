import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { medicineService } from '../../services/medicineService';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import { FaPills, FaMinus, FaPlus, FaShoppingCart } from 'react-icons/fa';
import { toast } from 'react-toastify';

const MedicineDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { isAuthenticated } = useContext(AuthContext);
  const [medicine, setMedicine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchMedicine();
  }, [id]);

  const fetchMedicine = async () => {
    try {
      const { data } = await medicineService.getMedicineById(id);
      setMedicine(data.medicine);
    } catch (error) {
      console.error('Error fetching medicine:', error);
      toast.error('Medicine not found');
      navigate('/medicines');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.info('Please login to add items to cart');
      navigate('/login');
      return;
    }

    if (medicine.stock === 0) {
      toast.error('Medicine is out of stock');
      return;
    }

    addToCart(medicine, quantity);
  };

  const incrementQuantity = () => {
    if (quantity < medicine.stock) {
      setQuantity(quantity + 1);
    } else {
      toast.warning('Cannot exceed available stock');
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!medicine) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-xl text-gray-600">Medicine not found</p>
      </div>
    );
  }

  const effectivePrice = medicine.discountPrice || medicine.price;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Section */}
        <div>
          <div className="bg-gray-200 rounded-lg p-8 flex items-center justify-center h-96">
            {medicine.images?.[0]?.url ? (
              <img
                src={medicine.images[0].url}
                alt={medicine.name}
                className="max-h-full max-w-full object-contain"
              />
            ) : (
              <FaPills className="text-9xl text-gray-400" />
            )}
          </div>

          {/* Additional Images */}
          {medicine.images?.length > 1 && (
            <div className="grid grid-cols-4 gap-2 mt-4">
              {medicine.images.slice(1).map((img, index) => (
                <div key={index} className="bg-gray-200 rounded p-2 h-20">
                  <img
                    src={img.url}
                    alt={`${medicine.name} ${index + 2}`}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details Section */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{medicine.name}</h1>
          
          {medicine.prescriptionRequired && (
            <span className="badge badge-warning mb-4">Prescription Required</span>
          )}

          <div className="mb-6">
            {medicine.discountPrice ? (
              <div>
                <span className="text-3xl font-bold text-primary-600">
                  ₹{medicine.discountPrice}
                </span>
                <span className="text-xl text-gray-500 line-through ml-3">
                  ₹{medicine.price}
                </span>
                <span className="ml-2 badge badge-success">
                  {Math.round(((medicine.price - medicine.discountPrice) / medicine.price) * 100)}% OFF
                </span>
              </div>
            ) : (
              <span className="text-3xl font-bold text-primary-600">
                ₹{medicine.price}
              </span>
            )}
          </div>

          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed">{medicine.description}</p>
          </div>

          {/* Stock Status */}
          <div className="mb-6">
            <p className="text-sm font-medium">
              Availability:{' '}
              {medicine.stock > 0 ? (
                <span className="text-green-600">In Stock ({medicine.stock} available)</span>
              ) : (
                <span className="text-red-600">Out of Stock</span>
              )}
            </p>
          </div>

          {/* Quantity Selector */}
          {medicine.stock > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Quantity:</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={decrementQuantity}
                  className="btn btn-secondary w-10 h-10 p-0 flex items-center justify-center"
                >
                  <FaMinus />
                </button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <button
                  onClick={incrementQuantity}
                  className="btn btn-secondary w-10 h-10 p-0 flex items-center justify-center"
                >
                  <FaPlus />
                </button>
              </div>
            </div>
          )}

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={medicine.stock === 0}
            className="btn btn-primary w-full mb-4 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <FaShoppingCart />
            {medicine.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>

          {/* Medicine Info */}
          <div className="card bg-gray-50 mt-6">
            <h3 className="font-semibold mb-3">Medicine Information</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Manufacturer:</strong> {medicine.manufacturer}</p>
              <p><strong>Pack Size:</strong> {medicine.packSize}</p>
              <p><strong>Composition:</strong> {medicine.composition}</p>
              {medicine.batchNumber && (
                <p><strong>Batch Number:</strong> {medicine.batchNumber}</p>
              )}
              <p><strong>Expiry Date:</strong> {new Date(medicine.expiryDate).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Information Tabs */}
      <div className="mt-12">
        <div className="border-b border-gray-200 mb-6">
          <div className="flex gap-8">
            <button className="pb-4 border-b-2 border-primary-600 font-semibold text-primary-600">
              Uses
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Uses */}
          <div className="card">
            <h3 className="font-semibold text-lg mb-3">Uses</h3>
            <p className="text-gray-700 text-sm leading-relaxed">{medicine.uses}</p>
          </div>

          {/* Side Effects */}
          {medicine.sideEffects && (
            <div className="card">
              <h3 className="font-semibold text-lg mb-3">Side Effects</h3>
              <p className="text-gray-700 text-sm leading-relaxed">{medicine.sideEffects}</p>
            </div>
          )}

          {/* Dosage */}
          {medicine.dosage && (
            <div className="card">
              <h3 className="font-semibold text-lg mb-3">Dosage</h3>
              <p className="text-gray-700 text-sm leading-relaxed">{medicine.dosage}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicineDetails;