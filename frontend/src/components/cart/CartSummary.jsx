import { Link } from 'react-router-dom';

const CartSummary = ({ 
  subtotal, 
  deliveryCharge, 
  discount = 0, 
  total, 
  onCheckout,
  checkoutDisabled = false 
}) => {
  return (
    <div className="card sticky top-20">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

      <div className="space-y-3 mb-4">
        {/* Subtotal */}
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
        </div>

        {/* Discount */}
        {discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Discount</span>
            <span className="font-semibold text-green-600">-₹{discount.toFixed(2)}</span>
          </div>
        )}

        {/* Delivery Charge */}
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

        {/* Free delivery progress */}
        {subtotal < 500 && deliveryCharge > 0 && (
          <div className="p-2 bg-green-50 rounded text-xs text-green-700">
            Add ₹{(500 - subtotal).toFixed(2)} more for FREE delivery! 🎉
          </div>
        )}

        {/* Total */}
        <div className="border-t pt-3 flex justify-between font-bold text-lg">
          <span>Total</span>
          <span className="text-primary-600">₹{total.toFixed(2)}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={onCheckout}
        disabled={checkoutDisabled}
        className="btn btn-primary w-full mb-3 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Proceed to Checkout
      </button>

      {/* Continue Shopping */}
      <Link to="/medicines" className="btn btn-outline w-full">
        Continue Shopping
      </Link>

      {/* Info */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm">
        <p className="text-gray-700 mb-2">
          <strong>Note:</strong> Upload prescription for Rx medicines during checkout
        </p>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>✓ 100% Secure Payment</li>
          <li>✓ Easy Returns</li>
          <li>✓ Genuine Products</li>
        </ul>
      </div>
    </div>
  );
};

export default CartSummary;