import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { updateProfile } from '@/store/slices/userSlice';
import Button from '@/components/atoms/Button';
import DomainCard from '@/components/molecules/DomainCard';
import { userProfileService } from '@/services';
import { toast } from 'react-toastify';

const DomainSelectionPage = () => {
  const [selectedDomains, setSelectedDomains] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const domains = ['agriculture', 'health', 'finance'];

  const handleDomainToggle = (domain) => {
    setSelectedDomains(prev => 
      prev.includes(domain)
        ? prev.filter(d => d !== domain)
        : [...prev, domain]
    );
  };

  const handleContinue = async () => {
    if (selectedDomains.length === 0) {
      toast.warning('Please select at least one learning area');
      return;
    }

    try {
      const profile = await userProfileService.updateProfile({
        selectedDomains
      });
      dispatch(updateProfile({ selectedDomains }));
      toast.success('Great! Let\'s start learning!');
      navigate('/app');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-8"
          >
            <div>
              <h1 className="font-display text-3xl text-gray-900 mb-4">
                What Would You Like to Learn?
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Choose one or more areas that interest you most
              </p>
            </div>

            <div className="space-y-4">
              {domains.map((domain) => (
                <motion.div
                  key={domain}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: domains.indexOf(domain) * 0.1 }}
                >
                  <DomainCard
                    domain={domain}
                    isSelected={selectedDomains.includes(domain)}
                    onClick={() => handleDomainToggle(domain)}
                  />
                </motion.div>
              ))}
            </div>

            {selectedDomains.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-primary bg-opacity-10 rounded-2xl p-4"
              >
                <p className="text-primary font-semibold">
                  You selected {selectedDomains.length} learning area{selectedDomains.length > 1 ? 's' : ''}
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-surface border-t border-gray-200 p-6">
        <div className="max-w-md mx-auto flex space-x-4">
          <Button
            variant="outline"
            icon="ArrowLeft"
            onClick={() => navigate('/')}
            className="flex-1"
          >
            Back
          </Button>
          
          <Button
            variant="primary"
            icon="ArrowRight"
            iconPosition="right"
            onClick={handleContinue}
            disabled={selectedDomains.length === 0}
            className="flex-1"
          >
            Start Learning
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DomainSelectionPage;