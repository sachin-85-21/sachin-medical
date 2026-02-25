import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const DashboardCard = ({ title, value, icon: Icon, color, trend, trendValue }) => {
  return (
    <div className="card hover:shadow-lg transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm mb-1">{title}</p>
          <h3 className="text-3xl font-bold">{value}</h3>
          
          {trend && (
            <div className={`flex items-center gap-1 mt-2 text-sm ${
              trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {trend === 'up' ? <FaArrowUp /> : <FaArrowDown />}
              <span>{trendValue}</span>
            </div>
          )}
        </div>
        
        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${color}`}>
          <Icon className="text-2xl text-white" />
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;