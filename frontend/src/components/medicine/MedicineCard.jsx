import { Link } from 'react-router-dom';
import { FaPills, FaShoppingCart } from 'react-icons/fa';

const MedicineCard = ({ medicine, onAddToCart }) => {
  const effectivePrice = medicine.discountPrice || medicine.price;
  const discount = medicine.discountPrice 
    ? Math.round(((medicine.price - medicine.discountPrice) / medicine.price) * 100)
    : 0;

  return (
    <Link
      to={`/medicines/${medicine._id}`}
      className="card hover:shadow-lg transition group"
    >
      {/* Image */}
      <div className="relative h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
        {medicine.images?.[0]?.url ? (
          <img
            src={medicine.images[0].url}
            alt={medicine.name}
            className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
          />
        ) : (
          <FaPills className="text-6xl text-gray-400" />
        )}
        
        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {discount}% OFF
          </div>
        )}

        {/* Out of Stock Overlay */}
        {medicine.stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div>
        <h3 className="font-semibold text-lg mb-2 line-clamp-1 group-hover:text-primary-600">
          {medicine.name}
        </h3>

        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
          {medicine.description}
        </p>

        <p className="text-xs text-gray-500 mb-3">
          {medicine.manufacturer} • {medicine.packSize}
        </p>

        {/* Price and Actions */}
        <div className="flex justify-between items-center">
          <div>
            {medicine.discountPrice ? (
              <>
                <span className="text-lg font-bold text-primary-600">
                  ₹{medicine.discountPrice}
                </span>
                <span className="text-sm text-gray-500 line-through ml-2">
                  ₹{medicine.price}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-primary-600">
                ₹{medicine.price}
              </span>
            )}
          </div>

          {medicine.prescriptionRequired && (
            <span className="badge badge-warning text-xs">Rx</span>
          )}
        </div>

        {/* Stock Status */}
        <div className="mt-2">
          {medicine.stock > 0 ? (
            <p className="text-xs text-green-600">In Stock ({medicine.stock})</p>
          ) : (
            <p className="text-xs text-red-600">Out of Stock</p>
          )}
        </div>

        {/* Add to Cart Button */}
        {onAddToCart && medicine.stock > 0 && (
          <button
            onClick={(e) => {
              e.preventDefault();
              onAddToCart(medicine);
            }}
            className="w-full mt-3 btn btn-primary flex items-center justify-center gap-2 text-sm"
          >
            <FaShoppingCart /> Add to Cart
          </button>
        )}
      </div>
    </Link>
  );
};

export default MedicineCard;