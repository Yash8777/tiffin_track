import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Utensils } from 'lucide-react';

interface SplashProps {
  onComplete: () => void;
}

const Splash: React.FC<SplashProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center text-white"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, ease: "linear", repeat: Infinity }}
          className="inline-block mb-6"
        >
          <Utensils size={80} />
        </motion.div>
        <h1 className="text-5xl font-bold mb-4">Tiffin Track</h1>
        <p className="text-xl opacity-90">Delicious home food, delivered fresh</p>
      </motion.div>
    </motion.div>
  );
};

export default Splash;