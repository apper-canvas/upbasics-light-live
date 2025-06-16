import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import IllustrationPlaceholder from '@/components/atoms/IllustrationPlaceholder';
import { toast } from 'react-toastify';

const ExerciseInterface = ({ exercise, onComplete }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [draggedItems, setDraggedItems] = useState([]);
  const [tappedSequence, setTappedSequence] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = () => {
    let answer;
    let correct = false;

    switch (exercise.type) {
      case 'multiple-choice':
        answer = selectedAnswer;
        correct = answer === exercise.correctAnswer;
        break;
      case 'drag-drop':
        answer = draggedItems;
        correct = JSON.stringify(answer.sort()) === JSON.stringify(exercise.correctAnswer.sort());
        break;
      case 'tap-sequence':
        answer = tappedSequence;
        correct = JSON.stringify(answer) === JSON.stringify(exercise.correctAnswer);
        break;
    }

    setIsCorrect(correct);
    setShowFeedback(true);
    setAttempts(prev => prev + 1);

    if (correct) {
      toast.success('Excellent work!');
      setTimeout(() => {
        onComplete(true);
      }, 2000);
    } else if (attempts >= 2) {
      toast.info('Let\'s try a different approach');
      setTimeout(() => {
        onComplete(false);
      }, 2000);
    }
  };

  const handleTryAgain = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);
    setDraggedItems([]);
    setTappedSequence([]);
  };

  const playAudio = () => {
    console.log(`Playing audio: ${exercise.audioPrompt}`);
    toast.info('Playing question audio...');
  };

  const renderMultipleChoice = () => (
    <div className="space-y-4">
      {exercise.options.map((option) => (
        <motion.button
          key={option.id}
          className={`card w-full p-4 text-left transition-all duration-300 ${
            selectedAnswer === option.id
              ? 'ring-4 ring-primary ring-opacity-50 bg-primary bg-opacity-10'
              : 'hover:shadow-elevated'
          }`}
          onClick={() => setSelectedAnswer(option.id)}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <div className="flex items-center space-x-4">
            <IllustrationPlaceholder
              src={option.illustration}
              size="small"
              className="flex-shrink-0"
            />
            <span className="font-semibold text-lg">{option.text}</span>
            {selectedAnswer === option.id && (
              <ApperIcon name="Check" size={20} className="text-primary ml-auto" />
            )}
          </div>
        </motion.button>
      ))}
    </div>
  );

  const renderDragDrop = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3">
        {exercise.items.map((item) => (
          <motion.button
            key={item.id}
            className={`card p-4 text-center transition-all duration-300 ${
              draggedItems.includes(item.id)
                ? 'ring-4 ring-primary ring-opacity-50 bg-primary bg-opacity-10'
                : 'hover:shadow-elevated'
            }`}
            onClick={() => {
              if (draggedItems.includes(item.id)) {
                setDraggedItems(prev => prev.filter(id => id !== item.id));
              } else {
                setDraggedItems(prev => [...prev, item.id]);
              }
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <IllustrationPlaceholder
              src={item.illustration}
              size="medium"
              className="mx-auto mb-2"
            />
            <span className="font-semibold">{item.text}</span>
          </motion.button>
        ))}
      </div>

      {draggedItems.length > 0 && (
        <div className="bg-gray-50 rounded-2xl p-4">
          <h4 className="font-semibold text-gray-900 mb-2">Selected Items:</h4>
          <div className="flex flex-wrap gap-2">
            {draggedItems.map((itemId) => {
              const item = exercise.items.find(i => i.id === itemId);
              return (
                <span
                  key={itemId}
                  className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium"
                >
                  {item?.text}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );

  const renderTapSequence = () => (
    <div className="space-y-6">
      <div className="relative bg-gray-100 rounded-2xl h-64 overflow-hidden">
        <IllustrationPlaceholder
          src={exercise.visualPrompt}
          size="xlarge"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {exercise.tapTargets.map((target, index) => (
          <motion.button
            key={target.id}
            className={`absolute w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shadow-lg ${
              tappedSequence.includes(target.id)
                ? 'bg-primary'
                : 'bg-accent hover:bg-blue-700'
            }`}
            style={{
              left: `${target.x}%`,
              top: `${target.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            onClick={() => {
              if (!tappedSequence.includes(target.id)) {
                setTappedSequence(prev => [...prev, target.id]);
              }
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {tappedSequence.includes(target.id) ? 
              tappedSequence.indexOf(target.id) + 1 : 
              '?'
            }
          </motion.button>
        ))}
      </div>

      {tappedSequence.length > 0 && (
        <div className="bg-gray-50 rounded-2xl p-4">
          <h4 className="font-semibold text-gray-900 mb-2">Your Sequence:</h4>
          <div className="flex space-x-2">
            {tappedSequence.map((targetId, index) => (
              <div key={index} className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                {index + 1}
              </div>
            ))}
          </div>
          <Button
            variant="outline"
            size="small"
            onClick={() => setTappedSequence([])}
            className="mt-2"
          >
            Clear Sequence
          </Button>
        </div>
      )}
    </div>
  );

  const canSubmit = () => {
    switch (exercise.type) {
      case 'multiple-choice':
        return selectedAnswer !== null;
      case 'drag-drop':
        return draggedItems.length > 0;
      case 'tap-sequence':
        return tappedSequence.length > 0;
      default:
        return false;
    }
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="bg-surface shadow-sm p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-lg text-gray-900">Practice Exercise</h1>
          <Button
            variant="ghost"
            icon="Volume2"
            size="small"
            onClick={playAudio}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-surface p-6 border-b border-gray-200">
        <div className="text-center space-y-4">
          <IllustrationPlaceholder
            src={exercise.question.illustration}
            size="large"
            className="mx-auto"
          />
          <h2 className="font-display text-xl text-gray-900">
            {exercise.question.text}
          </h2>
        </div>
      </div>

      {/* Exercise Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <AnimatePresence mode="wait">
          {!showFeedback ? (
            <motion.div
              key="exercise"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {exercise.type === 'multiple-choice' && renderMultipleChoice()}
              {exercise.type === 'drag-drop' && renderDragDrop()}
              {exercise.type === 'tap-sequence' && renderTapSequence()}
            </motion.div>
          ) : (
            <motion.div
              key="feedback"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-6"
            >
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto ${
                isCorrect ? 'bg-success' : 'bg-warning'
              }`}>
                <ApperIcon 
                  name={isCorrect ? 'Check' : 'AlertCircle'} 
                  size={40} 
                  className="text-white" 
                />
              </div>
              
              <div>
                <IllustrationPlaceholder
                  src={isCorrect ? exercise.feedback.correct.illustration : exercise.feedback.incorrect.illustration}
                  size="large"
                  className="mx-auto mb-4"
                />
                <p className="text-lg text-gray-700 leading-relaxed">
                  {isCorrect ? exercise.feedback.correct.text : exercise.feedback.incorrect.text}
                </p>
              </div>

              {!isCorrect && attempts < 3 && (
                <Button
                  variant="primary"
                  icon="RotateCcw"
                  onClick={handleTryAgain}
                >
                  Try Again
                </Button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Submit Button */}
      {!showFeedback && (
        <div className="bg-surface border-t border-gray-200 p-6">
          <Button
            variant="primary"
            icon="Check"
            onClick={handleSubmit}
            disabled={!canSubmit()}
            className="w-full"
          >
            Submit Answer
          </Button>
        </div>
      )}
    </div>
  );
};

export default ExerciseInterface;