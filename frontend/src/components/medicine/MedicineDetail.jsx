import { FaCheck, FaTimes } from 'react-icons/fa';

const MedicineDetail = ({ medicine }) => {
  return (
    <div className="space-y-6">
      {/* Medicine Info Card */}
      <div className="card">
        <h3 className="font-semibold text-lg mb-4">Medicine Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600 mb-1">Manufacturer</p>
            <p className="font-medium">{medicine.manufacturer}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Pack Size</p>
            <p className="font-medium">{medicine.packSize}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Composition</p>
            <p className="font-medium">{medicine.composition}</p>
          </div>
          {medicine.batchNumber && (
            <div>
              <p className="text-gray-600 mb-1">Batch Number</p>
              <p className="font-medium">{medicine.batchNumber}</p>
            </div>
          )}
          <div>
            <p className="text-gray-600 mb-1">Expiry Date</p>
            <p className="font-medium">
              {new Date(medicine.expiryDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Prescription Required</p>
            <p className="font-medium flex items-center gap-2">
              {medicine.prescriptionRequired ? (
                <>
                  <FaCheck className="text-green-600" /> Yes
                </>
              ) : (
                <>
                  <FaTimes className="text-red-600" /> No
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Uses */}
      <div className="card">
        <h3 className="font-semibold text-lg mb-3">Uses</h3>
        <p className="text-gray-700 leading-relaxed">{medicine.uses}</p>
      </div>

      {/* Side Effects */}
      {medicine.sideEffects && (
        <div className="card bg-yellow-50 border border-yellow-200">
          <h3 className="font-semibold text-lg mb-3 text-yellow-800">Side Effects</h3>
          <p className="text-gray-700 leading-relaxed">{medicine.sideEffects}</p>
        </div>
      )}

      {/* Dosage */}
      {medicine.dosage && (
        <div className="card bg-blue-50 border border-blue-200">
          <h3 className="font-semibold text-lg mb-3 text-blue-800">Dosage Instructions</h3>
          <p className="text-gray-700 leading-relaxed">{medicine.dosage}</p>
        </div>
      )}

      {/* Safety Information */}
      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-semibold text-lg mb-3 text-red-800">⚠️ Safety Information</h3>
        <ul className="text-sm text-gray-700 space-y-2">
          <li>• Read the label carefully before use</li>
          <li>• Keep out of reach of children</li>
          <li>• Store in a cool and dry place</li>
          <li>• Do not exceed the recommended dosage</li>
          <li>• Consult a doctor if symptoms persist</li>
        </ul>
      </div>
    </div>
  );
};

export default MedicineDetail;