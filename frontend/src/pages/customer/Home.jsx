import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { medicineService } from '../../services/medicineService';
import { FaPills, FaTruck, FaShieldAlt, FaCheckCircle } from 'react-icons/fa';

const Home = () => {
  const [featuredMedicines, setFeaturedMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedMedicines();
  }, []);

  const fetchFeaturedMedicines = async () => {
    try {
      const { data } = await medicineService.getMedicines({ limit: 8 });
      setFeaturedMedicines(data.medicines);
    } catch (error) {
      console.error('Error fetching medicines:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Welcome to Sachin Medical
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Your trusted online pharmacy for quality medicines and healthcare products
          </p>
          <Link to="/medicines" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <FaPills className="text-5xl text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quality Medicines</h3>
              <p className="text-gray-600">100% authentic products</p>
            </div>
            <div className="text-center">
              <FaTruck className="text-5xl text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick doorstep delivery</p>
            </div>
            <div className="text-center">
              <FaShieldAlt className="text-5xl text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600">100% safe transactions</p>
            </div>
            <div className="text-center">
              <FaCheckCircle className="text-5xl text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Genuine Products</h3>
              <p className="text-gray-600">FDA approved medicines</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Medicines */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Medicines</h2>

          {loading ? (
            <div className="flex justify-center">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {featuredMedicines.map((medicine) => (
                <Link
                  key={medicine._id}
                  to={`/medicines/${medicine._id}`}
                  className="card hover:shadow-lg transition"
                >
                  <div className="h-48 bg-white border rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                    {medicine.images?.[0]?.url ? (
                      <img
                        src={medicine.images[0].url}
                        alt={medicine.name}
                        className="h-full w-full object-contain p-3 rounded-lg"
                      />
                    ) : (
                      <FaPills className="text-6xl text-gray-400" />
                    )}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{medicine.name}</h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                    {medicine.description}
                  </p>
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
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Link to="/medicines" className="btn btn-primary">
              View All Medicines
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;