import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const LanguageSelector = ({ selectedLanguage, onLanguageSelect }) => {
  const languages = [
    { code: 'english', name: 'English', icon: 'Globe', flag: '🇺🇸' },
    { code: 'spanish', name: 'Español', icon: 'Globe', flag: '🇪🇸' },
    { code: 'french', name: 'Français', icon: 'Globe', flag: '🇫🇷' },
    { code: 'hindi', name: 'हिंदी', icon: 'Globe', flag: '🇮🇳' }
  ];

  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl text-center text-gray-900 mb-6">
        Choose Your Language
      </h2>
      
      <div className="grid grid-cols-2 gap-4">
        {languages.map((language) => (
          <motion.button
            key={language.code}
            className={`card text-center py-6 transition-all duration-300 ${
              selectedLanguage === language.code 
                ? 'ring-4 ring-primary ring-opacity-50 bg-primary bg-opacity-10' 
                : 'hover:shadow-elevated'
            }`}
            onClick={() => onLanguageSelect(language.code)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-4xl mb-2">{language.flag}</div>
            <div className="font-semibold text-lg text-gray-900">{language.name}</div>
            
            {selectedLanguage === language.code && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="mt-2 flex items-center justify-center"
              >
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <ApperIcon name="Check" size={14} className="text-white" />
                </div>
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;