import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { FaTrash, FaMinus, FaPlus, FaPills } from 'react-icons/fa';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useContext(CartContext);

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <FaPills className="text-6xl text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-6">Add some medicines to get started</p>
        <Link to="/medicines" className="btn btn-primary">
          Browse Medicines
        </Link>
      </div>
    );
  }

  const deliveryCharge = getTotalPrice() >= 500 ? 0 : 40;
  const totalAmount = getTotalPrice() + deliveryCharge;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => {
            const effectivePrice = item.discountPrice || item.price;
            
            return (
              <div key={item._id} className="card flex flex-col md:flex-row gap-4">
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
                    className="text-lg font-semibold hover:text-primary-600"
                  >
                    {item.name}
                  </Link>
                  
                  <p className="text-sm text-gray-600 mt-1">{item.manufacturer}</p>
                  
                  {item.prescriptionRequired && (
                    <span className="badge badge-warning text-xs mt-2">
                      Prescription Required
                    </span>
                  )}

                  <div className="mt-4 flex items-center justify-between">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="btn btn-secondary w-8 h-8 p-0 flex items-center justify-center text-sm"
                      >
                        <FaMinus />
                      </button>
                      <span className="font-semibold w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
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
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 hover:text-red-700 self-start md:self-center"
                  title="Remove from cart"
                >
                  <FaTrash />
                </button>
              </div>
            );
          })}

          {/* Clear Cart */}
          <button
            onClick={clearCart}
            className="btn btn-secondary w-full"
          >
            Clear Cart
          </button>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card sticky top-20">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">₹{getTotalPrice().toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Delivery Charge</span>
                <span className="font-semibold">
                  {deliveryCharge === 0 ? (
                    <span className="text-green-600">FREE</span>
                  ) : (
                    `₹${deliveryCharge.toFixed(2)}`
                  )}
                </span>
              </div>

              {getTotalPrice() < 500 && (
                <p className="text-xs text-green-600">
                  Add ₹{(500 - getTotalPrice()).toFixed(2)} more for FREE delivery
                </p>
              )}

              <div className="border-t pt-3 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-primary-600">₹{totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="btn btn-primary w-full mb-3"
            >
              Proceed to Checkout
            </button>

            <Link to="/medicines" className="btn btn-outline w-full">
              Continue Shopping
            </Link>

            {/* Info */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm">
              <p className="text-gray-700">
                <strong>Note:</strong> Upload prescription for Rx medicines during checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;