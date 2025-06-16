import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ progress = 0, showPercentage = true, className = '' }) => {
  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <div className={`w-full ${className}`}>
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${clampedProgress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
      {showPercentage && (
        <div className="text-center mt-2 text-sm font-semibold text-gray-600">
          {Math.round(clampedProgress)}%
        </div>
      )}
    </div>
  );
};

export default ProgressBar;