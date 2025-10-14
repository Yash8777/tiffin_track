import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ShoppingBag, LogOut, MapPin, Phone, Star } from 'lucide-react';
import TiffinDetail from './TiffinDetail';
import { useAuth } from '../contexts/AuthContext';

interface CustomerDashboardProps {
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
  vendorName: string;
}

interface Booking {
  id: number;
  tiffinName: string;
  subscriptionPlan: string;
  address: string;
  paymentStatus: string;
  freeTrial: boolean;
}

const CustomerDashboard: React.FC<CustomerDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'browse' | 'bookings'>('browse');
  const [tiffins, setTiffins] = useState<Tiffin[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedTiffin, setSelectedTiffin] = useState<Tiffin | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'ALL' | 'VEG' | 'NON_VEG'>('ALL');
  const { user } = useAuth();

  useEffect(() => {
    fetchTiffins();
    fetchBookings();
  }, []);

  const fetchTiffins = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/customer/tiffins', {
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
      const response = await fetch('http://localhost:8080/api/customer/bookings', {
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

  const filteredTiffins = tiffins.filter(tiffin => {
    const matchesSearch = tiffin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tiffin.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tiffin.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'ALL' || tiffin.vegNonveg === filter;
    return matchesSearch && matchesFilter && tiffin.availability;
  });

  const renderTiffins = () => (
    <div>
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search tiffins, location..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter size={20} className="text-gray-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'ALL' | 'VEG' | 'NON_VEG')}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="ALL">All</option>
            <option value="VEG">Vegetarian</option>
            <option value="NON_VEG">Non-Vegetarian</option>
          </select>
        </div>
      </div>

      {/* Tiffin Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTiffins.map((tiffin) => (
          <motion.div
            key={tiffin.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedTiffin(tiffin)}
            className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
          >
            <img
              src={tiffin.photoUrl || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'}
              alt={tiffin.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{tiffin.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs ${tiffin.vegNonveg === 'VEG' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {tiffin.vegNonveg}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-2">{tiffin.description}</p>
              <div className="flex items-center space-x-1 text-yellow-500 mb-2">
                <Star size={16} fill="currentColor" />
                <span className="text-sm text-gray-600">4.5 (123 reviews)</span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-green-600 font-semibold text-lg">₹{tiffin.price}</p>
                <div className="flex items-center text-gray-500 text-sm">
                  <MapPin size={14} />
                  <span className="ml-1">{tiffin.location}</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">by {tiffin.vendorName}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderBookings = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">My Bookings</h2>
        {bookings.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No bookings yet</p>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{booking.tiffinName}</h3>
                    <p className="text-sm text-gray-600">{booking.subscriptionPlan} plan</p>
                    <p className="text-sm text-gray-500">{booking.address}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs ${booking.paymentStatus === 'PAID' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {booking.paymentStatus}
                    </span>
                    {booking.freeTrial && (
                      <p className="text-xs text-blue-600 mt-1">Free Trial</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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
            <h1 className="text-xl font-bold text-green-600">Tiffin Track</h1>
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
            onClick={() => setActiveTab('browse')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium ${activeTab === 'browse' ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:text-green-600'}`}
          >
            <Search size={20} />
            <span>Browse Tiffins</span>
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium ${activeTab === 'bookings' ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:text-green-600'}`}
          >
            <ShoppingBag size={20} />
            <span>My Bookings</span>
          </button>
        </div>

        {/* Content */}
        <div>
          {activeTab === 'browse' && renderTiffins()}
          {activeTab === 'bookings' && renderBookings()}
        </div>
      </div>

      {/* Tiffin Detail Modal */}
      {selectedTiffin && (
        <TiffinDetail
          tiffin={selectedTiffin}
          onClose={() => setSelectedTiffin(null)}
          onBookingComplete={fetchBookings}
        />
      )}
    </motion.div>
  );
};

export default CustomerDashboard;