import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentLesson, setLoading, setError } from '@/store/slices/learningSlice';
import { updateProfile } from '@/store/slices/userSlice';
import LessonPlayer from '@/components/organisms/LessonPlayer';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import { lessonService, userProfileService } from '@/services';
import { toast } from 'react-toastify';

const LessonPlayerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [lesson, setLesson] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadLesson();
  }, [id]);

  const loadLesson = async () => {
    try {
      setIsLoading(true);
      const lessonData = await lessonService.getById(id);
      
      if (lessonData) {
        setLesson(lessonData);
        dispatch(setCurrentLesson(lessonData));
      } else {
        setError('Lesson not found');
      }
    } catch (error) {
      setError('Failed to load lesson');
      dispatch(setError('Failed to load lesson'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleLessonComplete = async () => {
    try {
      await userProfileService.markLessonCompleted(parseInt(id));
      dispatch(updateProfile({ completedLessons: [parseInt(id)] }));
      toast.success('Lesson completed! Great job!');
      navigate('/app/lessons');
    } catch (error) {
      toast.error('Failed to save progress');
    }
  };

  const handleStartExercise = () => {
    if (lesson?.exercises?.length > 0) {
      navigate(`/app/exercise/${lesson.exercises[0]}`);
    } else {
      toast.info('No exercises available for this lesson');
      handleLessonComplete();
    }
  };

  const handleBack = () => {
    navigate('/app/lessons');
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600">Loading lesson...</p>
        </div>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-6 max-w-sm mx-auto p-6">
          <div className="w-16 h-16 bg-error rounded-full flex items-center justify-center mx-auto">
            <ApperIcon name="AlertCircle" size={32} className="text-white" />
          </div>
          <div>
            <h2 className="font-display text-xl text-gray-900 mb-2">Lesson Not Found</h2>
            <p className="text-gray-600">
              The lesson you're looking for doesn't exist or couldn't be loaded.
            </p>
          </div>
          <Button
            variant="primary"
            icon="ArrowLeft"
            onClick={handleBack}
          >
            Back to Lessons
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-10">
        <Button
          variant="ghost"
          icon="ArrowLeft"
          onClick={handleBack}
          size="small"
          className="bg-surface shadow-card"
        />
      </div>

      {/* Lesson Player */}
      <LessonPlayer
        lesson={lesson}
        onComplete={handleLessonComplete}
        onExercise={handleStartExercise}
      />
    </div>
  );
};

export default LessonPlayerPage;