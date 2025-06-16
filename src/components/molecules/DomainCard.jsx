import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import IllustrationPlaceholder from '@/components/atoms/IllustrationPlaceholder';

const DomainCard = ({ domain, isSelected = false, onClick }) => {
  const domainConfig = {
    agriculture: {
      icon: 'Wheat',
      title: 'Growing Food',
      description: 'Learn to plant and grow healthy crops',
      color: 'from-green-400 to-green-600'
    },
    health: {
      icon: 'Heart',
      title: 'Staying Healthy',
      description: 'Keep your body strong and clean',
      color: 'from-red-400 to-pink-500'
    },
    finance: {
      icon: 'PiggyBank',
      title: 'Managing Money',
      description: 'Save and spend money wisely',
      color: 'from-blue-400 to-indigo-500'
    }
  };

  const config = domainConfig[domain];

  return (
    <motion.div
      className={`card-elevated cursor-pointer transition-all duration-300 ${
        isSelected ? 'ring-4 ring-primary ring-opacity-50 bg-primary bg-opacity-5' : ''
      }`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="text-center space-y-4">
        <div className={`mx-auto w-20 h-20 bg-gradient-to-br ${config.color} rounded-2xl flex items-center justify-center shadow-lg`}>
          <ApperIcon name={config.icon} size={40} className="text-white" />
        </div>
        
        <div>
          <h3 className="font-display text-xl text-gray-900 mb-2">{config.title}</h3>
          <p className="text-gray-600 text-base leading-relaxed">{config.description}</p>
        </div>

        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center justify-center"
          >
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <ApperIcon name="Check" size={16} className="text-white" />
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default DomainCard;