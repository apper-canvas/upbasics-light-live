import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'normal', 
  icon, 
  iconPosition = 'left',
  onClick, 
  disabled = false,
  className = '',
  ...props 
}) => {
  const baseClasses = 'font-semibold rounded-xl shadow-card touch-target flex items-center justify-center gap-3 transition-all duration-200 active:scale-95';
  
  const variants = {
    primary: 'bg-primary hover:bg-green-700 text-white',
    secondary: 'bg-secondary hover:bg-orange-600 text-white',
    accent: 'bg-accent hover:bg-blue-700 text-white',
    outline: 'bg-surface border-2 border-primary text-primary hover:bg-primary hover:text-white',
    ghost: 'bg-transparent text-primary hover:bg-primary hover:bg-opacity-10'
  };

  const sizes = {
    small: 'py-2 px-4 text-sm min-h-[48px]',
    normal: 'py-4 px-6 text-base min-h-[64px]',
    large: 'py-6 px-8 text-lg min-h-[72px]'
  };

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed hover:scale-100 active:scale-100' : '';

  const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`;

  const buttonContent = (
    <>
      {icon && iconPosition === 'left' && (
        <ApperIcon name={icon} size={size === 'small' ? 16 : size === 'large' ? 24 : 20} />
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <ApperIcon name={icon} size={size === 'small' ? 16 : size === 'large' ? 24 : 20} />
      )}
    </>
  );

  return (
    <motion.button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      {...props}
    >
      {buttonContent}
    </motion.button>
  );
};

export default Button;