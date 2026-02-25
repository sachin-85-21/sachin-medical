import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { medicineService } from '../../services/medicineService';
import Sidebar from '../../components/admin/Sidebar';
import Table from '../../components/admin/Table';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Medicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchMedicines();
  }, []);

  useEffect(() => {
    // Partial search - filter medicines based on search term
    if (searchTerm.trim() === '') {
      setFilteredMedicines(medicines);
    } else {
      const filtered = medicines.filter(medicine =>
        medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medicine.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medicine.composition?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMedicines(filtered);
    }
  }, [searchTerm, medicines]);

  const fetchMedicines = async () => {
    try {
      const { data } = await medicineService.getMedicines({ limit: 100 });
      setMedicines(data.medicines);
      setFilteredMedicines(data.medicines);
    } catch (error) {
      console.error('Error fetching medicines:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (medicine) => {
    if (!window.confirm(`Delete ${medicine.name}?`)) return;

    try {
      await medicineService.deleteMedicine(medicine._id);
      toast.success('Medicine deleted successfully');
      fetchMedicines();
    } catch (error) {
      console.error('Error deleting medicine:', error);
      toast.error('Failed to delete medicine');
    }
  };

  const columns = [
    {
      header: 'Name',
      accessor: 'name',
      render: (row) => (
        <div>
          <p className="font-medium">{row.name}</p>
          <p className="text-xs text-gray-500">{row.manufacturer}</p>
        </div>
      )
    },
    {
      header: 'Category',
      accessor: 'category',
      render: (row) => row.category?.name || 'N/A'
    },
    {
      header: 'Price',
      accessor: 'price',
      render: (row) => (
        <div>
          <p className="font-semibold">₹{row.discountPrice || row.price}</p>
          {row.discountPrice && (
            <p className="text-xs text-gray-500 line-through">₹{row.price}</p>
          )}
        </div>
      )
    },
    {
      header: 'Stock',
      accessor: 'stock',
      render: (row) => (
        <span className={`badge ${
          row.stock === 0 ? 'badge-danger' :
          row.stock <= row.lowStockThreshold ? 'badge-warning' :
          'badge-success'
        }`}>
          {row.stock}
        </span>
      )
    },
    {
      header: 'Status',
      accessor: 'isActive',
      render: (row) => (
        <span className={`badge ${row.isActive ? 'badge-success' : 'badge-danger'}`}>
          {row.isActive ? 'Active' : 'Inactive'}
        </span>
      )
    }
  ];

  return (
    <div className="flex">
      <Sidebar />
      
      <div className="flex-1 p-8 bg-gray-50">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Medicines</h1>
          
          {/* Search Box */}
          <div className="flex gap-4 items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search medicines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input w-80 pl-10"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            
            <Link to="/admin/medicines/add" className="btn btn-primary flex items-center gap-2">
              <FaPlus /> Add Medicine
            </Link>
          </div>
        </div>

        <div className="card">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="spinner"></div>
            </div>
          ) : (
            <>
              {searchTerm && (
                <p className="text-sm text-gray-600 mb-4">
                  Found {filteredMedicines.length} medicine(s) matching "{searchTerm}"
                </p>
              )}
              <Table
                columns={columns}
                data={filteredMedicines}
                onEdit={(medicine) => window.location.href = `/admin/medicines/edit/${medicine._id}`}
                onDelete={handleDelete}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Medicines;