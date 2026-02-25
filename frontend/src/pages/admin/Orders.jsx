import { useState, useEffect } from 'react';
import { orderService } from '../../services/orderService';
import Sidebar from '../../components/admin/Sidebar';
import Table from '../../components/admin/Table';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await orderService.getAllOrders();
      setOrders(data.orders);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { header: 'Order #', accessor: 'orderNumber' },
    {
      header: 'Customer',
      render: (row) => row.user?.name || 'N/A'
    },
    {
      header: 'Amount',
      render: (row) => `₹${row.pricing?.totalAmount}`
    },
    {
      header: 'Status',
      render: (row) => (
        <span className={`badge ${
          row.orderStatus === 'delivered' ? 'badge-success' :
          row.orderStatus === 'cancelled' ? 'badge-danger' :
          'badge-warning'
        }`}>
          {row.orderStatus}
        </span>
      )
    },
    {
      header: 'Date',
      render: (row) => new Date(row.createdAt).toLocaleDateString()
    }
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-50">
        <h1 className="text-3xl font-bold mb-8">Orders</h1>
        <div className="card">
          {loading ? (
            <div className="flex justify-center py-20"><div className="spinner"></div></div>
          ) : (
            <Table columns={columns} data={orders} actions={false} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
