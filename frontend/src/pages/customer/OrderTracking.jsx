import { useState, useEffect } from 'react';
import { orderService } from '../../services/orderService';
import { Link } from 'react-router-dom';

const OrderTracking = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await orderService.getMyOrders();
      setOrders(data.orders);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      placed: 'badge-info',
      processing: 'badge-warning',
      out_for_delivery: 'badge-warning',
      delivered: 'badge-success',
      cancelled: 'badge-danger'
    };
    return badges[status] || 'badge-info';
  };

  if (loading) return <div className="flex justify-center py-20"><div className="spinner"></div></div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      
      {orders.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-600 mb-4">No orders yet</p>
          <Link to="/medicines" className="btn btn-primary">Start Shopping</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order._id} className="card">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold">Order #{order.orderNumber}</h3>
                  <p className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <span className={`badge ${getStatusBadge(order.orderStatus)}`}>
                  {order.orderStatus.replace('_', ' ').toUpperCase()}
                </span>
              </div>
              
              <div className="mb-4">
                {order.items.map(item => (
                  <p key={item._id} className="text-sm">{item.name} × {item.quantity}</p>
                ))}
              </div>
              
              <div className="flex justify-between items-center">
                <span className="font-bold">₹{order.pricing.totalAmount}</span>
                <Link to={`/orders/${order._id}`} className="btn btn-outline btn-sm">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderTracking;