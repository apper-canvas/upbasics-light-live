import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { setGlossaryTerms, setLoading, setError } from '@/store/slices/learningSlice';
import GlossaryTermCard from '@/components/molecules/GlossaryTermCard';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import { glossaryService } from '@/services';

const GlossaryPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [filteredTerms, setFilteredTerms] = useState([]);
  const [selectedTerm, setSelectedTerm] = useState(null);
  
  const dispatch = useDispatch();
  const { glossaryTerms, isLoading } = useSelector(state => state.learning);
  const { profile } = useSelector(state => state.user);

  useEffect(() => {
    loadGlossaryTerms();
  }, []);

  useEffect(() => {
    filterTerms();
  }, [glossaryTerms, searchQuery, selectedDomain]);

  const loadGlossaryTerms = async () => {
    try {
      dispatch(setLoading(true));
      const data = await glossaryService.getAll();
      dispatch(setGlossaryTerms(data));
    } catch (error) {
      dispatch(setError('Failed to load glossary'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const filterTerms = () => {
    let filtered = glossaryTerms;

    // Filter by domain
    if (selectedDomain !== 'all') {
      filtered = filtered.filter(term => term.domain === selectedDomain);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(term =>
        term.term.toLowerCase().includes(query) ||
        term.simpleDefinition.toLowerCase().includes(query)
      );
    }

    setFilteredTerms(filtered);
  };

  const handleTermClick = (term) => {
    setSelectedTerm(term);
  };

  const handleCloseDetail = () => {
    setSelectedTerm(null);
  };

  const playTermAudio = (term) => {
    console.log(`Playing audio for term: ${term.term}`);
  };

  const getDomainConfig = (domain) => {
    const configs = {
      all: { name: 'All Terms', icon: 'BookOpen', color: 'bg-gray-500' },
      agriculture: { name: 'Growing Food', icon: 'Wheat', color: 'bg-green-500' },
      health: { name: 'Staying Healthy', icon: 'Heart', color: 'bg-red-500' },
      finance: { name: 'Managing Money', icon: 'PiggyBank', color: 'bg-blue-500' }
    };
    return configs[domain] || configs.all;
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600">Loading glossary...</p>
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
          Learning Dictionary
        </h1>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <ApperIcon name="Search" size={20} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search for words..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary text-base"
          />
        </div>

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

      {/* Terms List */}
      <div className="flex-1 overflow-y-auto p-6">
        <AnimatePresence mode="wait">
          {filteredTerms.length > 0 ? (
            <motion.div
              key={`${selectedDomain}-${searchQuery}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {filteredTerms.map((term, index) => (
                <motion.div
                  key={term.Id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <GlossaryTermCard
                    term={term}
                    onClick={() => handleTermClick(term)}
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
                <ApperIcon name="Search" size={32} className="text-gray-400" />
              </div>
              <h3 className="font-display text-xl text-gray-900 mb-2">No Words Found</h3>
              <p className="text-gray-600 mb-6">
                {searchQuery 
                  ? `No words match "${searchQuery}"`
                  : 'No words available for the selected category.'
                }
              </p>
              {searchQuery && (
                <Button
                  variant="primary"
                  icon="X"
                  onClick={() => setSearchQuery('')}
                >
                  Clear Search
                </Button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Term Detail Modal */}
      <AnimatePresence>
        {selectedTerm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50"
            onClick={handleCloseDetail}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-surface rounded-2xl p-6 max-w-sm w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-2xl text-gray-900">{selectedTerm.term}</h3>
                  <div className="flex space-x-2">
                    <motion.button
                      className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white"
                      onClick={() => playTermAudio(selectedTerm)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ApperIcon name="Volume2" size={20} />
                    </motion.button>
                    <motion.button
                      className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600"
                      onClick={handleCloseDetail}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ApperIcon name="X" size={20} />
                    </motion.button>
                  </div>
                </div>

                <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto">
                  <ApperIcon name="BookOpen" size={40} className="text-white" />
                </div>

                <p className="text-lg text-gray-700 leading-relaxed">
                  {selectedTerm.simpleDefinition}
                </p>

                <div className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-600 capitalize">
                  {selectedTerm.domain}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GlossaryPage;