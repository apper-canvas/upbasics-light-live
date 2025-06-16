import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const IllustrationPlaceholder = ({ 
  src, 
  alt = 'Illustration', 
  icon = 'ImageIcon',
  className = '',
  size = 'medium'
}) => {
  const sizes = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-32 h-32',
    xlarge: 'w-48 h-48'
  };

  const iconSizes = {
    small: 32,
    medium: 48,
    large: 64,
    xlarge: 96
  };

  return (
    <div className={`${sizes[size]} bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center ${className}`}>
      <ApperIcon 
        name={icon} 
        size={iconSizes[size]} 
        className="text-white drop-shadow-sm" 
      />
    </div>
  );
};

export default IllustrationPlaceholder;