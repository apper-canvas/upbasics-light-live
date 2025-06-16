import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentExercise, setLoading, setError } from '@/store/slices/learningSlice';
import { updateProfile } from '@/store/slices/userSlice';
import ExerciseInterface from '@/components/organisms/ExerciseInterface';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import { exerciseService, userProfileService } from '@/services';
import { toast } from 'react-toastify';

const ExercisePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [exercise, setExercise] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadExercise();
  }, [id]);

  const loadExercise = async () => {
    try {
      setIsLoading(true);
      const exerciseData = await exerciseService.getById(id);
      
      if (exerciseData) {
        setExercise(exerciseData);
        dispatch(setCurrentExercise(exerciseData));
      } else {
        setError('Exercise not found');
      }
    } catch (error) {
      setError('Failed to load exercise');
      dispatch(setError('Failed to load exercise'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleExerciseComplete = async (isCorrect) => {
    try {
      if (isCorrect && exercise?.lessonId) {
        await userProfileService.markLessonCompleted(exercise.lessonId);
        dispatch(updateProfile({ completedLessons: [exercise.lessonId] }));
        toast.success('Exercise completed! You\'re doing great!');
      } else if (isCorrect) {
        toast.success('Well done! You got it right!');
      } else {
        toast.info('Keep practicing! You\'re learning!');
      }
      
      // Navigate back to lessons after a delay
      setTimeout(() => {
        navigate('/app/lessons');
      }, 1500);
    } catch (error) {
      toast.error('Failed to save progress');
      navigate('/app/lessons');
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
          <p className="text-gray-600">Loading exercise...</p>
        </div>
      </div>
    );
  }

  if (error || !exercise) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-6 max-w-sm mx-auto p-6">
          <div className="w-16 h-16 bg-error rounded-full flex items-center justify-center mx-auto">
            <ApperIcon name="AlertCircle" size={32} className="text-white" />
          </div>
          <div>
            <h2 className="font-display text-xl text-gray-900 mb-2">Exercise Not Found</h2>
            <p className="text-gray-600">
              The exercise you're looking for doesn't exist or couldn't be loaded.
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

      {/* Exercise Interface */}
      <ExerciseInterface
        exercise={exercise}
        onComplete={handleExerciseComplete}
      />
    </div>
  );
};

export default ExercisePage;