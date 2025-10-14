import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Package, ShoppingBag, LogOut, CreditCard as Edit, Trash2 } from 'lucide-react';
import AddTiffin from './AddTiffin';
import { useAuth } from '../contexts/AuthContext';

interface VendorDashboardProps {
  onLogout: () => void;
}

interface Tiffin {
  id: number;
  name: string;
  description: string;
  photoUrl: string;
  location: string;
  price: number;
  vegNonveg: string;
  subscriptionType: string;
  availability: boolean;
  contactNumber: string;
}

interface Booking {
  id: number;
  customerName: string;
  tiffinName: string;
  subscriptionPlan: string;
  address: string;
  contactNumber: string;
  paymentStatus: string;
  freeTrial: boolean;
}

const VendorDashboard: React.FC<VendorDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'tiffins' | 'add' | 'bookings'>('tiffins');
  const [tiffins, setTiffins] = useState<Tiffin[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    fetchTiffins();
    fetchBookings();
  }, []);

  const fetchTiffins = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/vendor/tiffins', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setTiffins(data);
      }
    } catch (error) {
      console.error('Error fetching tiffins:', error);
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/vendor/bookings', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const deleteTiffin = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8080/api/vendor/tiffins/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        fetchTiffins();
      }
    } catch (error) {
      console.error('Error deleting tiffin:', error);
    }
  };

  const renderTiffins = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tiffins.map((tiffin) => (
        <motion.div
          key={tiffin.id}
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <img
            src={tiffin.photoUrl || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'}
            alt={tiffin.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold">{tiffin.name}</h3>
              <span className={`px-2 py-1 rounded-full text-xs ${tiffin.availability ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {tiffin.availability ? 'Available' : 'Unavailable'}
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-2">{tiffin.description}</p>
            <p className="text-orange-600 font-semibold">₹{tiffin.price}</p>
            <p className="text-xs text-gray-500">{tiffin.location}</p>
            <div className="flex justify-between items-center mt-4">
              <span className={`px-2 py-1 rounded-full text-xs ${tiffin.vegNonveg === 'VEG' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {tiffin.vegNonveg}
              </span>
              <div className="flex space-x-2">
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => deleteTiffin(tiffin.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderBookings = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tiffin</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trial</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{booking.customerName}</div>
                    <div className="text-sm text-gray-500">{booking.address}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.tiffinName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.subscriptionPlan}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.contactNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs ${booking.paymentStatus === 'PAID' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {booking.paymentStatus}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs ${booking.freeTrial ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                    {booking.freeTrial ? 'Yes' : 'No'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-orange-600">Vendor Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.name}</span>
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-600"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex space-x-6 mb-8">
          <button
            onClick={() => setActiveTab('tiffins')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium ${activeTab === 'tiffins' ? 'bg-orange-100 text-orange-700' : 'text-gray-600 hover:text-orange-600'}`}
          >
            <Package size={20} />
            <span>My Tiffins</span>
          </button>
          <button
            onClick={() => setActiveTab('add')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium ${activeTab === 'add' ? 'bg-orange-100 text-orange-700' : 'text-gray-600 hover:text-orange-600'}`}
          >
            <Plus size={20} />
            <span>Add Tiffin</span>
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium ${activeTab === 'bookings' ? 'bg-orange-100 text-orange-700' : 'text-gray-600 hover:text-orange-600'}`}
          >
            <ShoppingBag size={20} />
            <span>Bookings</span>
          </button>
        </div>

        {/* Content */}
        <div>
          {activeTab === 'tiffins' && renderTiffins()}
          {activeTab === 'add' && <AddTiffin onTiffinAdded={fetchTiffins} />}
          {activeTab === 'bookings' && renderBookings()}
        </div>
      </div>
    </motion.div>
  );
};

export default VendorDashboard;