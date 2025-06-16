import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lessons: [],
  currentLesson: null,
  exercises: [],
  currentExercise: null,
  glossaryTerms: [],
  isLoading: false,
  error: null,
};

const learningSlice = createSlice({
  name: 'learning',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setLessons: (state, action) => {
      state.lessons = action.payload;
      state.error = null;
    },
    setCurrentLesson: (state, action) => {
      state.currentLesson = action.payload;
    },
    setExercises: (state, action) => {
      state.exercises = action.payload;
    },
    setCurrentExercise: (state, action) => {
      state.currentExercise = action.payload;
    },
    setGlossaryTerms: (state, action) => {
      state.glossaryTerms = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { 
  setLoading, 
  setLessons, 
  setCurrentLesson, 
  setExercises, 
  setCurrentExercise, 
  setGlossaryTerms, 
  setError, 
  clearError 
} = learningSlice.actions;
export default learningSlice.reducer;