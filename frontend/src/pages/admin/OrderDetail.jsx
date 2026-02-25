import Sidebar from '../../components/admin/Sidebar';

const OrderDetail = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-50">
        <h1 className="text-3xl font-bold mb-8">Order Details</h1>
        <div className="card">
          <p>Order details coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;