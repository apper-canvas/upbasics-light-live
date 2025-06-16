import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const LiteracySelector = ({ selectedLevel, onLevelSelect }) => {
  const levels = [
    {
      code: 'beginner',
      name: 'Pictures + Simple Words',
      description: 'I like learning with pictures and very simple words',
      icon: 'ImageIcon',
      color: 'from-green-400 to-green-600'
    },
    {
      code: 'intermediate',
      name: 'Some Reading',
      description: 'I can read some words and like pictures too',
      icon: 'BookOpen',
      color: 'from-blue-400 to-blue-600'
    },
    {
      code: 'advanced',
      name: 'Good Reader',
      description: 'I can read well and like detailed information',
      icon: 'GraduationCap',
      color: 'from-purple-400 to-purple-600'
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl text-center text-gray-900 mb-6">
        How Do You Like to Learn?
      </h2>
      
      <div className="space-y-4">
        {levels.map((level) => (
          <motion.button
            key={level.code}
            className={`card w-full text-left p-6 transition-all duration-300 ${
              selectedLevel === level.code 
                ? 'ring-4 ring-primary ring-opacity-50 bg-primary bg-opacity-10' 
                : 'hover:shadow-elevated'
            }`}
            onClick={() => onLevelSelect(level.code)}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="flex items-start space-x-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${level.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <ApperIcon name={level.icon} size={24} className="text-white" />
              </div>
              
              <div className="flex-1">
                <h3 className="font-display text-lg text-gray-900 mb-1">{level.name}</h3>
                <p className="text-gray-600 text-base">{level.description}</p>
              </div>

              {selectedLevel === level.code && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex-shrink-0"
                >
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <ApperIcon name="Check" size={14} className="text-white" />
                  </div>
                </motion.div>
              )}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default LiteracySelector;