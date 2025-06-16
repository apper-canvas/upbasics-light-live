import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { setLessons, setLoading, setError } from '@/store/slices/learningSlice';
import LessonCard from '@/components/molecules/LessonCard';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import { lessonService } from '@/services';

const LessonListPage = () => {
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [filteredLessons, setFilteredLessons] = useState([]);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { lessons, isLoading } = useSelector(state => state.learning);
  const { profile } = useSelector(state => state.user);

  useEffect(() => {
    loadLessons();
  }, []);

  useEffect(() => {
    filterLessons();
  }, [lessons, selectedDomain]);

  const loadLessons = async () => {
    try {
      dispatch(setLoading(true));
      const data = await lessonService.getAll();
      dispatch(setLessons(data));
    } catch (error) {
      dispatch(setError('Failed to load lessons'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const filterLessons = () => {
    if (selectedDomain === 'all') {
      setFilteredLessons(lessons);
    } else {
      setFilteredLessons(lessons.filter(lesson => lesson.domain === selectedDomain));
    }
  };

  const handleLessonClick = (lesson) => {
    navigate(`/app/lesson/${lesson.Id}`);
  };

  const getDomainConfig = (domain) => {
    const configs = {
      all: { name: 'All Lessons', icon: 'BookOpen', color: 'bg-gray-500' },
      agriculture: { name: 'Growing Food', icon: 'Wheat', color: 'bg-green-500' },
      health: { name: 'Staying Healthy', icon: 'Heart', color: 'bg-red-500' },
      finance: { name: 'Managing Money', icon: 'PiggyBank', color: 'bg-blue-500' }
    };
    return configs[domain] || configs.all;
  };

  const getProgress = (lessonId) => {
    return profile?.currentProgress?.[lessonId] || 0;
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600">Loading your lessons...</p>
        </div>
      </div>
    );
  }

  const availableDomains = ['all', ...(profile?.selectedDomains || ['agriculture', 'health', 'finance'])];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-surface shadow-sm p-6 border-b border-gray-200">
        <h1 className="font-display text-2xl text-gray-900 text-center mb-4">
          Your Learning Journey
        </h1>
        
        {/* Domain Filter */}
        <div className="flex space-x-2 overflow-x-auto pb-2 hide-scrollbar">
          {availableDomains.map((domain) => {
            const config = getDomainConfig(domain);
            return (
              <motion.button
                key={domain}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 whitespace-nowrap ${
                  selectedDomain === domain
                    ? `${config.color} text-white`
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedDomain(domain)}
                whileTap={{ scale: 0.95 }}
              >
                <ApperIcon name={config.icon} size={16} />
                <span className="text-sm font-medium">{config.name}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Lessons List */}
      <div className="flex-1 overflow-y-auto p-6">
        <AnimatePresence mode="wait">
          {filteredLessons.length > 0 ? (
            <motion.div
              key={selectedDomain}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {filteredLessons.map((lesson, index) => (
                <motion.div
                  key={lesson.Id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <LessonCard
                    lesson={lesson}
                    progress={getProgress(lesson.Id)}
                    onClick={() => handleLessonClick(lesson)}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="BookOpen" size={32} className="text-gray-400" />
              </div>
              <h3 className="font-display text-xl text-gray-900 mb-2">No Lessons Found</h3>
              <p className="text-gray-600 mb-6">
                There are no lessons available for the selected category.
              </p>
              <Button
                variant="primary"
                icon="RotateCcw"
                onClick={() => setSelectedDomain('all')}
              >
                Show All Lessons
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Stats Footer */}
      {filteredLessons.length > 0 && (
        <div className="bg-surface border-t border-gray-200 p-4">
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span>{filteredLessons.filter(l => l.completed).length} Completed</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span>{filteredLessons.filter(l => getProgress(l.Id) > 0 && !l.completed).length} In Progress</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <span>{filteredLessons.filter(l => !l.completed && getProgress(l.Id) === 0).length} Not Started</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonListPage;