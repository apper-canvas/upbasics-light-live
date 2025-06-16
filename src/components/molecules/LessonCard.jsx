import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import ProgressBar from '@/components/atoms/ProgressBar';
import IllustrationPlaceholder from '@/components/atoms/IllustrationPlaceholder';

const LessonCard = ({ lesson, progress = 0, onClick }) => {
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

  return (
    <motion.div
      className="card cursor-pointer transition-all duration-300 hover:shadow-elevated"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start space-x-4">
        <div className={`w-16 h-16 bg-gradient-to-br ${getDomainColor(lesson.domain)} rounded-xl flex items-center justify-center flex-shrink-0`}>
          <ApperIcon name={getDomainIcon(lesson.domain)} size={28} className="text-white" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-display text-lg text-gray-900 truncate">{lesson.title}</h3>
            {lesson.completed && (
              <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                <ApperIcon name="Check" size={14} className="text-white" />
              </div>
            )}
          </div>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{lesson.description}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 text-gray-500 text-sm">
              <ApperIcon name="Clock" size={14} />
              <span>{lesson.duration} min</span>
            </div>

            {progress > 0 && !lesson.completed && (
              <div className="w-20">
                <ProgressBar progress={progress} showPercentage={false} />
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LessonCard;