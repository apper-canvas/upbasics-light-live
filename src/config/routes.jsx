import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '@/Layout';
import WelcomePage from '@/components/pages/WelcomePage';
import DomainSelectionPage from '@/components/pages/DomainSelectionPage';
import LessonListPage from '@/components/pages/LessonListPage';
import LessonPlayerPage from '@/components/pages/LessonPlayerPage';
import ExercisePage from '@/components/pages/ExercisePage';
import GlossaryPage from '@/components/pages/GlossaryPage';
import HelpPage from '@/components/pages/HelpPage';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/domains" element={<DomainSelectionPage />} />
      <Route path="/app" element={<Layout />}>
        <Route index element={<LessonListPage />} />
        <Route path="lessons" element={<LessonListPage />} />
        <Route path="lesson/:id" element={<LessonPlayerPage />} />
        <Route path="exercise/:id" element={<ExercisePage />} />
        <Route path="glossary" element={<GlossaryPage />} />
        <Route path="help" element={<HelpPage />} />
      </Route>
    </Routes>
  );
};

export default Router;