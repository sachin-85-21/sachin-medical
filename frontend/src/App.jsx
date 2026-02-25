import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Layout Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';
import AdminRoute from './components/common/AdminRoute';

// Customer Pages
import Home from './pages/customer/Home';
import Login from './pages/customer/Login';
import Register from './pages/customer/Register';
import MedicineListing from './pages/customer/MedicineListing';
import MedicineDetails from './pages/customer/MedicineDetails';
import Cart from './pages/customer/Cart';
import Checkout from './pages/customer/Checkout';
import OrderTracking from './pages/customer/OrderTracking';
import Profile from './pages/customer/Profile';

// Info Pages
import About from './pages/info/About';
import Contact from './pages/info/Contact';
import FAQ from './pages/info/FAQ';
import Returns from './pages/info/Returns';
import Privacy from './pages/info/Privacy';
import Terms from './pages/info/Terms';
import Cookies from './pages/info/Cookies';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import Medicines from './pages/admin/Medicines';
import AddMedicine from './pages/admin/AddMedicine';
import EditMedicine from './pages/admin/EditMedicine';
import Orders from './pages/admin/Orders';
import OrderDetail from './pages/admin/OrderDetail';
import Categories from './pages/admin/Categories';
import Customers from './pages/admin/Customers';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/medicines" element={<MedicineListing />} />
                <Route path="/medicines/:id" element={<MedicineDetails />} />
                
                {/* Info Pages */}
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/returns" element={<Returns />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/cookies" element={<Cookies />} />

                {/* Protected Customer Routes */}
                <Route
                  path="/cart"
                  element={
                    <ProtectedRoute>
                      <Cart />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/checkout"
                  element={
                    <ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/orders"
                  element={
                    <ProtectedRoute>
                      <OrderTracking />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                {/* Admin Routes */}
                <Route
                  path="/admin/dashboard"
                  element={
                    <AdminRoute>
                      <Dashboard />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/medicines"
                  element={
                    <AdminRoute>
                      <Medicines />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/medicines/add"
                  element={
                    <AdminRoute>
                      <AddMedicine />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/medicines/edit/:id"
                  element={
                    <AdminRoute>
                      <EditMedicine />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/orders"
                  element={
                    <AdminRoute>
                      <Orders />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/orders/:id"
                  element={
                    <AdminRoute>
                      <OrderDetail />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/categories"
                  element={
                    <AdminRoute>
                      <Categories />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/customers"
                  element={
                    <AdminRoute>
                      <Customers />
                    </AdminRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
          <ToastContainer position="top-right" autoClose={3000} />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;