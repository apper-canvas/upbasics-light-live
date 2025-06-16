import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNavigation from '@/components/organisms/BottomNavigation';
import VoiceControl from '@/components/molecules/VoiceControl';

const Layout = () => {
  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </main>

      {/* Voice Control Button - Always Visible */}
      <VoiceControl />

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Layout;