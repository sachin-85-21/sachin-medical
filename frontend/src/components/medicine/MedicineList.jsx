import MedicineCard from './MedicineCard';
import { FaPills } from 'react-icons/fa';

const MedicineList = ({ medicines, loading, onAddToCart }) => {
  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!medicines || medicines.length === 0) {
    return (
      <div className="text-center py-20">
        <FaPills className="text-6xl text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 text-lg">No medicines found</p>
        <p className="text-gray-500 text-sm mt-2">Try adjusting your filters or search</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {medicines.map((medicine) => (
        <MedicineCard
          key={medicine._id}
          medicine={medicine}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default MedicineList;