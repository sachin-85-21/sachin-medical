import { Link, useLocation } from 'react-router-dom';
import { 
  FaHome, 
  FaPills, 
  FaShoppingCart, 
  FaUsers, 
  FaList, 
  FaSignOutAlt 
} from 'react-icons/fa';
import { useContext } from 'react';
// import { AuthContext } from '../../../context/AuthContext';
import { AuthContext } from '../../context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useContext(AuthContext);

  const menuItems = [
    { path: '/admin/dashboard', icon: FaHome, label: 'Dashboard' },
    { path: '/admin/medicines', icon: FaPills, label: 'Medicines' },
    { path: '/admin/orders', icon: FaShoppingCart, label: 'Orders' },
    { path: '/admin/categories', icon: FaList, label: 'Categories' },
    { path: '/admin/customers', icon: FaUsers, label: 'Customers' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
      {/* Logo */}
      <div className="mb-8 pb-4 border-b border-gray-700">
        <h2 className="text-2xl font-bold">🏥 Admin Panel</h2>
      </div>

      {/* Menu Items */}
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              isActive(item.path)
                ? 'bg-primary-600 text-white'
                : 'hover:bg-gray-700'
            }`}
          >
            <item.icon className="text-lg" />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <button
        onClick={logout}
        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-600 transition w-full mt-8"
      >
        <FaSignOutAlt className="text-lg" />
        <span className="font-medium">Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;