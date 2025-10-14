import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, MapPin, Phone, Star, CreditCard, Clock } from 'lucide-react';

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

interface TiffinDetailProps {
  tiffin: Tiffin;
  onClose: () => void;
  onBookingComplete: () => void;
}

const TiffinDetail: React.FC<TiffinDetailProps> = ({ tiffin, onClose, onBookingComplete }) => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    subscriptionPlan: 'DAILY',
    address: '',
    contactNumber: '',
    paymentMethod: 'UPI',
    freeTrial: false
  });
  const [loading, setLoading] = useState(false);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/customer/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          tiffinId: tiffin.id,
          ...bookingData
        })
      });

      if (response.ok) {
        alert('Booking successful!');
        onBookingComplete();
        onClose();
      } else {
        alert('Booking failed. Please try again.');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="relative">
          <img
            src={tiffin.photoUrl || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'}
            alt={tiffin.name}
            className="w-full h-64 object-cover rounded-t-xl"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg"
          >
            <X size={20} />
          </button>
          <div className="absolute bottom-4 left-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${tiffin.vegNonveg === 'VEG' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {tiffin.vegNonveg}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{tiffin.name}</h2>
              <p className="text-gray-600">by {tiffin.vendorName}</p>
            </div>
            <p className="text-2xl font-bold text-green-600">₹{tiffin.price}</p>
          </div>

          <div className="flex items-center space-x-1 text-yellow-500 mb-4">
            <Star size={20} fill="currentColor" />
            <Star size={20} fill="currentColor" />
            <Star size={20} fill="currentColor" />
            <Star size={20} fill="currentColor" />
            <Star size={20} />
            <span className="text-gray-600 ml-2">4.5 (123 reviews)</span>
          </div>

          <p className="text-gray-700 mb-6">{tiffin.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center space-x-3">
              <MapPin className="text-gray-500" size={20} />
              <span className="text-gray-700">{tiffin.location}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="text-gray-500" size={20} />
              <span className="text-gray-700">{tiffin.contactNumber}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="text-gray-500" size={20} />
              <span className="text-gray-700">{tiffin.subscriptionType} delivery</span>
            </div>
            <div className="flex items-center space-x-3">
              <CreditCard className="text-gray-500" size={20} />
              <span className="text-gray-700">Multiple payment options</span>
            </div>
          </div>

          {!showBookingForm ? (
            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setBookingData({ ...bookingData, freeTrial: true });
                  setShowBookingForm(true);
                }}
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-semibold shadow-lg"
              >
                Try 2-Day Free Trial
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowBookingForm(true)}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold shadow-lg"
              >
                Book Now
              </motion.button>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subscription Plan</label>
                <select
                  value={bookingData.subscriptionPlan}
                  onChange={(e) => setBookingData({ ...bookingData, subscriptionPlan: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option value="DAILY">Daily</option>
                  <option value="WEEKLY">Weekly</option>
                  <option value="MONTHLY">Monthly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Address</label>
                <textarea
                  value={bookingData.address}
                  onChange={(e) => setBookingData({ ...bookingData, address: e.target.value })}
                  required
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your complete address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                <input
                  type="tel"
                  value={bookingData.contactNumber}
                  onChange={(e) => setBookingData({ ...bookingData, contactNumber: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your contact number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                <select
                  value={bookingData.paymentMethod}
                  onChange={(e) => setBookingData({ ...bookingData, paymentMethod: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option value="UPI">UPI</option>
                  <option value="CARD">Credit/Debit Card</option>
                  <option value="CASH">Cash on Delivery</option>
                </select>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowBookingForm(false)}
                  className="flex-1 bg-gray-500 text-white py-3 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold shadow-lg disabled:opacity-50"
                >
                  {loading ? 'Booking...' : 'Confirm Booking'}
                </motion.button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TiffinDetail;