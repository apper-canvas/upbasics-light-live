import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const HelpPage = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    {
      id: 1,
      question: 'How do I start learning?',
      answer: 'Tap on the "Learn" tab at the bottom, then choose a lesson from your selected topics. Each lesson has pictures and sounds to help you learn.',
      icon: 'PlayCircle'
    },
    {
      id: 2,
      question: 'How do I use voice commands?',
      answer: 'Tap the microphone button on the right side of your screen. Say things like "Go to lessons", "Open glossary", or "Help me" and UpBasics will understand.',
      icon: 'Mic'
    },
    {
      id: 3,
      question: 'What if I can\'t read well?',
      answer: 'UpBasics is made for you! Every lesson uses pictures and sounds. You can learn by listening and looking, no reading required.',
      icon: 'Heart'
    },
    {
      id: 4,
      question: 'How do I change my language?',
      answer: 'Currently, you set your language when you first start UpBasics. We\'re working on letting you change it later.',
      icon: 'Globe'
    },
    {
      id: 5,
      question: 'What if I make mistakes in exercises?',
      answer: 'Don\'t worry! Making mistakes helps you learn. UpBasics will show you the right answer and let you try again.',
      icon: 'RotateCcw'
    },
    {
      id: 6,
      question: 'How do I find word meanings?',
      answer: 'Tap on "Glossary" at the bottom. You can search for words or browse by topic. Each word has a picture and sound to help you understand.',
      icon: 'Search'
    }
  ];

  const quickActions = [
    {
      title: 'Start Learning',
      description: 'Go to your lessons',
      icon: 'BookOpen',
      color: 'bg-primary',
      action: () => window.location.href = '/app/lessons'
    },
    {
      title: 'Look Up Words',
      description: 'Search the glossary',
      icon: 'Search',
      color: 'bg-secondary',
      action: () => window.location.href = '/app/glossary'
    },
    {
      title: 'Practice Speaking',
      description: 'Try voice commands',
      icon: 'Mic',
      color: 'bg-accent',
      action: () => console.log('Voice activated')
    }
  ];

  const toggleFaq = (faqId) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  return (
    <div className="h-full overflow-y-auto bg-background">
      {/* Header */}
      <div className="bg-surface shadow-sm p-6 border-b border-gray-200">
        <h1 className="font-display text-2xl text-gray-900 text-center mb-2">
          How Can We Help?
        </h1>
        <p className="text-gray-600 text-center">
          Find answers and get support
        </p>
      </div>

      <div className="p-6 space-y-8">
        {/* Quick Actions */}
        <section>
          <h2 className="font-display text-xl text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4">
            {quickActions.map((action) => (
              <motion.button
                key={action.title}
                className="card p-4 text-left hover:shadow-elevated transition-all duration-300"
                onClick={action.action}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center`}>
                    <ApperIcon name={action.icon} size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                  <ApperIcon name="ChevronRight" size={20} className="text-gray-400 ml-auto" />
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <h2 className="font-display text-xl text-gray-900 mb-4">Common Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <motion.div
                key={faq.id}
                className="card overflow-hidden"
                initial={false}
              >
                <motion.button
                  className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => toggleFaq(faq.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center">
                      <ApperIcon name={faq.icon} size={16} className="text-primary" />
                    </div>
                    <span className="font-semibold text-gray-900">{faq.question}</span>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedFaq === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ApperIcon name="ChevronDown" size={20} className="text-gray-400" />
                  </motion.div>
                </motion.button>
                
                <AnimatePresence>
                  {expandedFaq === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pl-15">
                        <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Tips Section */}
        <section>
          <h2 className="font-display text-xl text-gray-900 mb-4">Learning Tips</h2>
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <ApperIcon name="Lightbulb" size={16} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">Learn at Your Own Speed</h3>
                  <p className="text-green-800 text-sm">
                    Take your time with each lesson. You can pause, replay, and practice as much as you want.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <ApperIcon name="Volume2" size={16} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">Use Sound to Learn</h3>
                  <p className="text-blue-800 text-sm">
                    Listen to the audio in lessons and glossary. Hearing words helps you remember them better.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <ApperIcon name="RefreshCw" size={16} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-orange-900 mb-1">Practice Every Day</h3>
                  <p className="text-orange-800 text-sm">
                    Even 5 minutes a day helps you learn. Come back often to practice what you've learned.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="pb-6">
          <h2 className="font-display text-xl text-gray-900 mb-4">Still Need Help?</h2>
          <div className="card p-6 text-center">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="MessageCircle" size={32} className="text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">We're Here to Help</h3>
            <p className="text-gray-600 mb-4">
              Our team is ready to help you learn and succeed with UpBasics.
            </p>
            <Button
              variant="primary"
              icon="Mail"
            >
              Contact Support
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HelpPage;