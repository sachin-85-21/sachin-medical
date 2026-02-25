import { Link } from 'react-router-dom';
import { FaTrash, FaMinus, FaPlus, FaPills } from 'react-icons/fa';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const effectivePrice = item.discountPrice || item.price;

  return (
    <div className="card flex flex-col md:flex-row gap-4">
      {/* Image */}
      <div className="w-full md:w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
        {item.images?.[0]?.url ? (
          <img
            src={item.images[0].url}
            alt={item.name}
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <FaPills className="text-4xl text-gray-400" />
        )}
      </div>

      {/* Details */}
      <div className="flex-1">
        <Link
          to={`/medicines/${item._id}`}
          className="text-lg font-semibold hover:text-primary-600 block"
        >
          {item.name}
        </Link>
        
        <p className="text-sm text-gray-600 mt-1">{item.manufacturer}</p>
        <p className="text-sm text-gray-600">Pack: {item.packSize}</p>
        
        {item.prescriptionRequired && (
          <span className="badge badge-warning text-xs mt-2 inline-block">
            Prescription Required
          </span>
        )}

        <div className="mt-4 flex items-center justify-between">
          {/* Quantity Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onUpdateQuantity(item._id, item.quantity - 1)}
              className="btn btn-secondary w-8 h-8 p-0 flex items-center justify-center text-sm"
              disabled={item.quantity <= 1}
            >
              <FaMinus />
            </button>
            <span className="font-semibold w-8 text-center">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}
              disabled={item.quantity >= item.stock}
              className="btn btn-secondary w-8 h-8 p-0 flex items-center justify-center text-sm disabled:opacity-50"
            >
              <FaPlus />
            </button>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="text-lg font-bold text-primary-600">
              ₹{(effectivePrice * item.quantity).toFixed(2)}
            </p>
            <p className="text-xs text-gray-500">
              ₹{effectivePrice} × {item.quantity}
            </p>
          </div>
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => onRemove(item._id)}
        className="text-red-500 hover:text-red-700 self-start md:self-center"
        title="Remove from cart"
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default CartItem;