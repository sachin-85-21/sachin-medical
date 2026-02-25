import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import { FaShoppingCart, FaUser, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout, isAdmin } = useContext(AuthContext);
  const { getTotalItems } = useContext(CartContext);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-primary-600">
            🏥 Sachin Medical
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link to="/" className="hover:text-primary-600 transition">Home</Link>
            <Link to="/medicines" className="hover:text-primary-600 transition">Medicines</Link>
            {isAdmin && (
              <Link to="/admin/dashboard" className="hover:text-primary-600 transition">
                Admin Panel
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/cart" className="relative hover:text-primary-600">
                  <FaShoppingCart size={24} />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {getTotalItems()}
                    </span>
                  )}
                </Link>
                <Link to="/profile" className="hover:text-primary-600">
                  <FaUser size={20} />
                </Link>
                <button onClick={logout} className="hover:text-red-600">
                  <FaSignOutAlt size={20} />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline">Login</Link>
                <Link to="/register" className="btn btn-primary">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;