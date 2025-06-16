import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const BottomNavigation = () => {
  const navItems = [
    {
      path: '/app/lessons',
      icon: 'BookOpen',
      label: 'Learn',
      color: 'text-primary'
    },
    {
      path: '/app/glossary',
      icon: 'Search',
      label: 'Glossary',
      color: 'text-secondary'
    },
    {
      path: '/app/help',
      icon: 'HelpCircle',
      label: 'Help',
      color: 'text-accent'
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-gray-200 px-4 py-2 z-40">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center py-2 px-4 rounded-xl transition-all duration-200 min-w-[80px] ${
                isActive ? 'bg-primary bg-opacity-10' : 'hover:bg-gray-50'
              }`
            }
          >
            {({ isActive }) => (
              <motion.div
                className="flex flex-col items-center space-y-1"
                whileTap={{ scale: 0.95 }}
              >
                <div className={`p-2 rounded-lg ${isActive ? item.color : 'text-gray-400'}`}>
                  <ApperIcon name={item.icon} size={24} />
                </div>
                <span className={`text-xs font-medium ${isActive ? item.color : 'text-gray-400'}`}>
                  {item.label}
                </span>
              </motion.div>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;