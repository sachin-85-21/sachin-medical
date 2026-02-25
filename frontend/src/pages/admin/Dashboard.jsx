import { useState, useEffect } from 'react';
import { orderService } from '../../services/orderService';
import { medicineService } from '../../services/medicineService';
import DashboardCard from '../../components/admin/DashboardCard';
import Sidebar from '../../components/admin/Sidebar';
import { FaMoneyBillWave, FaShoppingCart, FaExclamationTriangle, FaUsers } from 'react-icons/fa';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    pendingOrders: 0,
    lowStockCount: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const { data } = await orderService.getDashboardStats();
      setStats(data.stats);
      setRecentOrders(data.stats.recentOrders || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex justify-center items-center h-screen">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      
      <div className="flex-1 p-8 bg-gray-50">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard
            title="Total Revenue"
            value={`₹${stats.totalRevenue.toLocaleString()}`}
            icon={FaMoneyBillWave}
            color="bg-green-500"
            trend="up"
            trendValue="+12%"
          />
          
          <DashboardCard
            title="Total Orders"
            value={stats.totalOrders}
            icon={FaShoppingCart}
            color="bg-blue-500"
            trend="up"
            trendValue="+8%"
          />
          
          <DashboardCard
            title="Pending Orders"
            value={stats.pendingOrders}
            icon={FaShoppingCart}
            color="bg-yellow-500"
          />
          
          <DashboardCard
            title="Low Stock Items"
            value={stats.lowStockCount}
            icon={FaExclamationTriangle}
            color="bg-red-500"
          />
        </div>

        {/* Recent Orders */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
          
          {recentOrders.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No recent orders</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Order #
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {order.orderNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {order.user?.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        ₹{order.pricing?.totalAmount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`badge ${
                          order.orderStatus === 'delivered' ? 'badge-success' :
                          order.orderStatus === 'cancelled' ? 'badge-danger' :
                          'badge-warning'
                        }`}>
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;