import React from 'react';
import TopAppBar from '../organisms/TopAppBar';
import BottomNavBar from '../organisms/BottomNavBar';

const MainLayout = ({ children }) => {
  return (
    <div className="bg-[#f8f9fa] text-[#191c1d] min-h-screen font-['Inter',sans-serif]">
      {/* ── TopAppBar ── */}
      <TopAppBar />

      {/* ── Page content ── */}
      <main className="pt-24 pb-32 px-4 max-w-7xl mx-auto">
        {children}
      </main>

      {/* ── BottomNavBar (mobile only) ── */}
      <BottomNavBar />
    </div>
  );
};

export default MainLayout;
