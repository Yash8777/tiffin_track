import React from 'react';
import { motion } from 'framer-motion';
import { Store, User } from 'lucide-react';

interface RoleSelectionProps {
  onRoleSelect: (role: 'vendor' | 'customer') => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({ onRoleSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome to Tiffin Track</h2>
          <p className="text-gray-600">Choose your role to continue</p>
        </div>

        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onRoleSelect('vendor')}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-xl flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transition-shadow"
          >
            <Store size={24} />
            <span className="text-lg font-semibold">I'm a Vendor</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onRoleSelect('customer')}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transition-shadow"
          >
            <User size={24} />
            <span className="text-lg font-semibold">I'm a Customer</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default RoleSelection;