import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import { toast } from 'react-toastify';

const VoiceControl = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported] = useState(true); // Assuming voice support for demo

  const handleVoiceToggle = () => {
    if (!isSupported) {
      toast.error('Voice control not supported on this device');
      return;
    }

    setIsListening(!isListening);
    
    if (!isListening) {
      toast.info('Listening... Say "Go to lessons", "Open glossary", or "Help"');
      // Simulate voice recognition
      setTimeout(() => {
        setIsListening(false);
        toast.success('Voice command recognized!');
      }, 3000);
    } else {
      toast.info('Voice control stopped');
    }
  };

  return (
    <motion.div
      className="fixed bottom-24 right-4 z-50"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.5 }}
    >
      <motion.button
        className={`w-16 h-16 rounded-full shadow-elevated flex items-center justify-center transition-all duration-300 ${
          isListening 
            ? 'bg-error text-white animate-pulse' 
            : 'bg-accent text-white hover:bg-blue-700'
        }`}
        onClick={handleVoiceToggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ApperIcon name={isListening ? 'MicOff' : 'Mic'} size={24} />
      </motion.button>

      <AnimatePresence>
        {isListening && (
          <motion.div
            className="absolute bottom-full right-0 mb-2 bg-gray-900 text-white text-sm py-2 px-3 rounded-lg whitespace-nowrap"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            Listening...
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default VoiceControl;