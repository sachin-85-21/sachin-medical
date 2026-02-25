import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || {}
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put('/auth/profile', formData);
      toast.success('Profile updated!');
      setEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      
      <div className="max-w-2xl card">
        {editing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="input"
              placeholder="Name"
            />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="input"
              placeholder="Phone"
            />
            <div className="flex gap-2">
              <button type="submit" className="btn btn-primary">Save</button>
              <button type="button" onClick={() => setEditing(false)} className="btn btn-secondary">Cancel</button>
            </div>
          </form>
        ) : (
          <div>
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Phone:</strong> {user?.phone}</p>
            <button onClick={() => setEditing(true)} className="btn btn-primary mt-4">Edit Profile</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;