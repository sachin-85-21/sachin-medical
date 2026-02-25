import { useState } from 'react';
import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa';

const SearchFilter = ({ categories, onFilterChange, initialFilters = {} }) => {
  const [filters, setFilters] = useState({
    search: initialFilters.search || '',
    category: initialFilters.category || '',
    minPrice: initialFilters.minPrice || '',
    maxPrice: initialFilters.maxPrice || '',
    prescriptionRequired: initialFilters.prescriptionRequired || '',
    inStock: initialFilters.inStock || 'true'
  });
  const [showFilters, setShowFilters] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  const resetFilters = () => {
    const resetFilters = {
      search: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      prescriptionRequired: '',
      inStock: 'true'
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="card mb-6">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <div className="flex-1 relative">
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleChange}
            placeholder="Search medicines by name, composition..."
            className="input pl-10"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <button type="submit" className="btn btn-primary">
          Search
        </button>
        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className="btn btn-secondary flex items-center gap-2"
        >
          <FaFilter /> Filters
        </button>
      </form>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t">
          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              name="category"
              value={filters.category}
              onChange={handleChange}
              className="input"
            >
              <option value="">All Categories</option>
              {categories?.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Min Price */}
          <div>
            <label className="block text-sm font-medium mb-2">Min Price (₹)</label>
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleChange}
              placeholder="0"
              min="0"
              className="input"
            />
          </div>

          {/* Max Price */}
          <div>
            <label className="block text-sm font-medium mb-2">Max Price (₹)</label>
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleChange}
              placeholder="1000"
              min="0"
              className="input"
            />
          </div>

          {/* Prescription */}
          <div>
            <label className="block text-sm font-medium mb-2">Prescription</label>
            <select
              name="prescriptionRequired"
              value={filters.prescriptionRequired}
              onChange={handleChange}
              className="input"
            >
              <option value="">All</option>
              <option value="false">No Prescription Needed</option>
              <option value="true">Prescription Required</option>
            </select>
          </div>

          {/* Reset Button */}
          <div className="md:col-span-4">
            <button
              type="button"
              onClick={resetFilters}
              className="btn btn-secondary flex items-center gap-2"
            >
              <FaTimes /> Reset Filters
            </button>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      <div className="flex flex-wrap gap-2 mt-4">
        {filters.search && (
          <span className="badge badge-info">
            Search: {filters.search}
          </span>
        )}
        {filters.category && (
          <span className="badge badge-info">
            Category: {categories?.find(c => c._id === filters.category)?.name}
          </span>
        )}
        {filters.minPrice && (
          <span className="badge badge-info">Min: ₹{filters.minPrice}</span>
        )}
        {filters.maxPrice && (
          <span className="badge badge-info">Max: ₹{filters.maxPrice}</span>
        )}
        {filters.prescriptionRequired && (
          <span className="badge badge-info">
            {filters.prescriptionRequired === 'true' ? 'Rx Required' : 'No Rx'}
          </span>
        )}
      </div>
    </div>
  );
};

export default SearchFilter;