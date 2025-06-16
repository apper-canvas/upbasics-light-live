import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import IllustrationPlaceholder from '@/components/atoms/IllustrationPlaceholder';

const GlossaryTermCard = ({ term, onClick }) => {
  const getDomainIcon = (domain) => {
    const icons = {
      agriculture: 'Wheat',
      health: 'Heart',
      finance: 'PiggyBank'
    };
    return icons[domain] || 'BookOpen';
  };

  const getDomainColor = (domain) => {
    const colors = {
      agriculture: 'from-green-400 to-green-600',
      health: 'from-red-400 to-pink-500',
      finance: 'from-blue-400 to-indigo-500'
    };
    return colors[domain] || 'from-primary to-secondary';
  };

  const playAudio = (e) => {
    e.stopPropagation();
    // Simulate audio playback
    console.log(`Playing audio for term: ${term.term}`);
  };

  return (
    <motion.div
      className="card cursor-pointer transition-all duration-300 hover:shadow-elevated"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start space-x-4">
        <div className={`w-16 h-16 bg-gradient-to-br ${getDomainColor(term.domain)} rounded-xl flex items-center justify-center flex-shrink-0`}>
          <ApperIcon name={getDomainIcon(term.domain)} size={28} className="text-white" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-display text-lg text-gray-900">{term.term}</h3>
            <motion.button
              className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white"
              onClick={playAudio}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ApperIcon name="Volume2" size={16} />
            </motion.button>
          </div>

          <p className="text-gray-600 text-base leading-relaxed">{term.simpleDefinition}</p>

          <div className="mt-3 inline-flex items-center px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600 capitalize">
            {term.domain}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GlossaryTermCard;