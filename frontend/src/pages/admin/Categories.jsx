import { useState, useEffect } from 'react';
import { categoryService } from '../../services/categoryService';
import Sidebar from '../../components/admin/Sidebar';
import Table from '../../components/admin/Table';
import { toast } from 'react-toastify';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await categoryService.getCategories();
      setCategories(data.categories);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (category) => {
    if (!window.confirm(`Delete ${category.name}?`)) return;
    try {
      await categoryService.deleteCategory(category._id);
      toast.success('Category deleted');
      fetchCategories();
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Description', accessor: 'description' },
    {
      header: 'Status',
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
        <h1 className="text-3xl font-bold mb-8">Categories</h1>
        <div className="card">
          {loading ? (
            <div className="flex justify-center py-20"><div className="spinner"></div></div>
          ) : (
            <Table columns={columns} data={categories} onDelete={handleDelete} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;