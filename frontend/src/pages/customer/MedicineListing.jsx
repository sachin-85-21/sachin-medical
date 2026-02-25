import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { medicineService } from '../../services/medicineService';
import { categoryService } from '../../services/categoryService';
import { FaPills, FaSearch, FaFilter } from 'react-icons/fa';

const MedicineListing = () => {
  const [medicines, setMedicines] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    prescriptionRequired: '',
    inStock: 'true'
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchMedicines();
  }, [filters, page]);

  const fetchCategories = async () => {
    try {
      const { data } = await categoryService.getCategories();
      setCategories(data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchMedicines = async () => {
    setLoading(true);
    try {
      const params = {
        page,
        limit: 9,
        ...filters
      };
      const { data } = await medicineService.getMedicines(params);
      setMedicines(data.medicines);
      setTotalPages(data.pages);
    } catch (error) {
      console.error('Error fetching medicines:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
    setPage(1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMedicines();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Browse Medicines</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <div className="card sticky top-20">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FaFilter className="mr-2" /> Filters
            </h2>

            {/* Search */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Search</label>
              <form onSubmit={handleSearch}>
                <div className="flex">
                  <input
                    type="text"
                    name="search"
                    value={filters.search}
                    onChange={handleFilterChange}
                    placeholder="Search medicines..."
                    className="input flex-1"
                  />
                  <button type="submit" className="btn btn-primary ml-2">
                    <FaSearch />
                  </button>
                </div>
              </form>
            </div>

            {/* Category Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="input"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Price Range</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                  placeholder="Min"
                  className="input w-1/2"
                />
                <input
                  type="number"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  placeholder="Max"
                  className="input w-1/2"
                />
              </div>
            </div>

            {/* Prescription Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Prescription</label>
              <select
                name="prescriptionRequired"
                value={filters.prescriptionRequired}
                onChange={handleFilterChange}
                className="input"
              >
                <option value="">All</option>
                <option value="true">Required</option>
                <option value="false">Not Required</option>
              </select>
            </div>

            {/* Reset Filters */}
            <button
              onClick={() => {
                setFilters({
                  search: '',
                  category: '',
                  minPrice: '',
                  maxPrice: '',
                  prescriptionRequired: '',
                  inStock: 'true'
                });
                setPage(1);
              }}
              className="btn btn-secondary w-full"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Medicine Grid */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="spinner"></div>
            </div>
          ) : medicines.length === 0 ? (
            <div className="text-center py-20">
              <FaPills className="text-6xl text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No medicines found</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {medicines.map((medicine) => (
                  <Link
                    key={medicine._id}
                    to={`/medicines/${medicine._id}`}
                    className="card hover:shadow-lg transition"
                  >
                    <div className="h-48 bg-white border rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                      {medicine.images?.[0]?.url ? (
                        <img
                          src={medicine.images[0].url}
                          alt={medicine.name}
                          className="h-48 w-full object-contain p-3 rounded-lg"
                        />
                      ) : (
                        <FaPills className="text-6xl text-gray-400" />
                      )}
                      {medicine.stock === 0 && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                          <span className="text-white font-bold">Out of Stock</span>
                        </div>
                      )}
                    </div>

                    <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                      {medicine.name}
                    </h3>

                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                      {medicine.description}
                    </p>

                    <div className="flex justify-between items-center mb-2">
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

                    <p className="text-sm text-gray-500">
                      Stock: {medicine.stock > 0 ? medicine.stock : 'Out of stock'}
                    </p>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8 gap-2">
                  <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className="btn btn-secondary disabled:opacity-50"
                  >
                    Previous
                  </button>

                  <span className="px-4 py-2">
                    Page {page} of {totalPages}
                  </span>

                  <button
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                    className="btn btn-secondary disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicineListing;