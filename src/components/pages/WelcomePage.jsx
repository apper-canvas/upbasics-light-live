import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { setProfile } from '@/store/slices/userSlice';
import Button from '@/components/atoms/Button';
import LanguageSelector from '@/components/molecules/LanguageSelector';
import LiteracySelector from '@/components/molecules/LiteracySelector';
import IllustrationPlaceholder from '@/components/atoms/IllustrationPlaceholder';
import { userProfileService } from '@/services';

const WelcomePage = () => {
  const [step, setStep] = useState('welcome');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
  };

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
  };

  const handleContinue = async () => {
    if (step === 'welcome') {
      setStep('language');
    } else if (step === 'language' && selectedLanguage) {
      setStep('literacy');
    } else if (step === 'literacy' && selectedLevel) {
      // Save user preferences
      const profile = await userProfileService.updateProfile({
        language: selectedLanguage,
        literacyLevel: selectedLevel
      });
      dispatch(setProfile(profile));
      navigate('/domains');
    }
  };

  const handleBack = () => {
    if (step === 'language') {
      setStep('welcome');
    } else if (step === 'literacy') {
      setStep('language');
    }
  };

  const canContinue = () => {
    if (step === 'welcome') return true;
    if (step === 'language') return selectedLanguage !== '';
    if (step === 'literacy') return selectedLevel !== '';
    return false;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {step === 'welcome' && (
              <div className="text-center space-y-8">
                <IllustrationPlaceholder
                  icon="GraduationCap"
                  size="xlarge"
                  className="mx-auto"
                />
                
                <div>
                  <h1 className="font-display text-4xl text-gray-900 mb-4">
                    Welcome to UpBasics
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Learn essential skills through pictures, simple words, and voice guidance
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-left">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">✓</span>
                    </div>
                    <span className="text-gray-700">Learn with pictures and audio</span>
                  </div>
                  <div className="flex items-center space-x-3 text-left">
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">✓</span>
                    </div>
                    <span className="text-gray-700">Practice with fun exercises</span>
                  </div>
                  <div className="flex items-center space-x-3 text-left">
                    <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">✓</span>
                    </div>
                    <span className="text-gray-700">Use voice commands</span>
                  </div>
                </div>
              </div>
            )}

            {step === 'language' && (
              <LanguageSelector
                selectedLanguage={selectedLanguage}
                onLanguageSelect={handleLanguageSelect}
              />
            )}

            {step === 'literacy' && (
              <LiteracySelector
                selectedLevel={selectedLevel}
                onLevelSelect={handleLevelSelect}
              />
            )}
          </motion.div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-surface border-t border-gray-200 p-6">
        <div className="max-w-md mx-auto flex space-x-4">
          {step !== 'welcome' && (
            <Button
              variant="outline"
              icon="ArrowLeft"
              onClick={handleBack}
              className="flex-1"
            >
              Back
            </Button>
          )}
          
          <Button
            variant="primary"
            icon="ArrowRight"
            iconPosition="right"
            onClick={handleContinue}
            disabled={!canContinue()}
            className="flex-1"
          >
            {step === 'welcome' ? 'Get Started' : 
             step === 'language' ? 'Continue' : 
             'Start Learning'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;