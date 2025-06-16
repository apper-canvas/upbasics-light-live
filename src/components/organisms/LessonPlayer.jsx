import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import ProgressBar from '@/components/atoms/ProgressBar';
import Button from '@/components/atoms/Button';
import IllustrationPlaceholder from '@/components/atoms/IllustrationPlaceholder';

const LessonPlayer = ({ lesson, onComplete, onExercise }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    let interval;
    if (isPlaying && !isCompleted) {
      interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + (100 / (lesson.duration * 10));
          if (newProgress >= 100) {
            setIsCompleted(true);
            setIsPlaying(false);
            return 100;
          }
          return newProgress;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isCompleted, lesson.duration]);

  useEffect(() => {
    if (isPlaying) {
      const animationInterval = setInterval(() => {
        setCurrentAnimation(prev => 
          prev < lesson.animations.length - 1 ? prev + 1 : 0
        );
      }, lesson.animations[0]?.duration || 2000);
      
      return () => clearInterval(animationInterval);
    }
  }, [isPlaying, lesson.animations]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    setProgress(0);
    setCurrentAnimation(0);
    setIsCompleted(false);
    setIsPlaying(true);
  };

  const getDomainIcon = (domain) => {
    const icons = {
      agriculture: 'Wheat',
      health: 'Heart',
      finance: 'PiggyBank'
    };
    return icons[domain] || 'BookOpen';
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="bg-surface shadow-sm p-4 border-b border-gray-200">
        <h1 className="font-display text-xl text-gray-900 text-center">{lesson.title}</h1>
        <ProgressBar progress={progress} className="mt-3" />
      </div>

      {/* Animation Area */}
      <div className="flex-1 flex items-center justify-center p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentAnimation}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <IllustrationPlaceholder
              src={lesson.animations[currentAnimation]?.src}
              icon={getDomainIcon(lesson.domain)}
              size="xlarge"
              className="mx-auto mb-6"
            />
            
            <div className="max-w-sm mx-auto">
              <p className="text-lg text-gray-700 leading-relaxed">
                {lesson.description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="bg-surface border-t border-gray-200 p-6">
        <div className="flex items-center justify-center space-x-4 mb-6">
          <Button
            variant="accent"
            icon={isPlaying ? 'Pause' : 'Play'}
            onClick={handlePlayPause}
            disabled={isCompleted}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </Button>

          <Button
            variant="outline"
            icon="RotateCcw"
            onClick={handleRestart}
          >
            Restart
          </Button>
        </div>

        <AnimatePresence>
          {isCompleted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name="Check" size={32} className="text-white" />
                </div>
                <h3 className="font-display text-xl text-gray-900 mb-2">Lesson Complete!</h3>
                <p className="text-gray-600">Great job learning about {lesson.title.toLowerCase()}!</p>
              </div>

              <div className="flex flex-col space-y-3">
                <Button
                  variant="primary"
                  icon="PlayCircle"
                  onClick={onExercise}
                >
                  Try Practice Exercise
                </Button>

                <Button
                  variant="outline"
                  icon="ArrowRight"
                  onClick={onComplete}
                >
                  Continue Learning
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LessonPlayer;