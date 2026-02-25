import { useState, useEffect } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import Table from '../../components/admin/Table';
import api from '../../services/api';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const { data } = await api.get('/auth/users');
      setCustomers(data.users);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Phone', accessor: 'phone' },
    {
      header: 'Status',
      render: (row) => (
        <span className={`badge ${row.isActive ? 'badge-success' : 'badge-danger'}`}>
          {row.isActive ? 'Active' : 'Inactive'}
        </span>
      )
    },
    {
      header: 'Joined',
      render: (row) => new Date(row.createdAt).toLocaleDateString()
    }
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-50">
        <h1 className="text-3xl font-bold mb-8">Customers</h1>
        <div className="card">
          {loading ? (
            <div className="flex justify-center py-20"><div className="spinner"></div></div>
          ) : (
            <Table columns={columns} data={customers} actions={false} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Customers;