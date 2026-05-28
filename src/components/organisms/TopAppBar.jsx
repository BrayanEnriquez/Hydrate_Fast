import React from 'react';
import { Link } from 'react-router-dom';

const TopAppBar = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-[#f8f9fa] border-b border-[#c1c8c2] shadow-sm flex items-center justify-between px-4 h-16">
      <div className="flex items-center gap-4">
        <button className="text-[#012d1d] hover:bg-[#e7e8e9] transition-colors p-2 rounded-full active:scale-95 duration-200">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>menu</span>
        </button>
        <h1 className="text-[22px] font-bold text-[#012d1d]" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
          Hydrate Fast
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6 mr-6">
          <Link to="/dashboard" className="text-[#414844] hover:text-[#012d1d] text-xs font-semibold uppercase tracking-widest transition-colors">
            Dashboard
          </Link>
          <Link to="/cultivos" className="text-[#012d1d] font-bold text-xs uppercase tracking-widest">
            Crops
          </Link>
          <Link to="/alertas" className="text-[#414844] hover:text-[#012d1d] text-xs font-semibold uppercase tracking-widest transition-colors">
            Alerts
          </Link>
        </nav>

        {/* Avatar placeholder */}
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#a5d0b9] cursor-pointer active:scale-95 transition-transform">
          <div className="w-full h-full bg-[#1b4332] flex items-center justify-center">
            <span className="material-symbols-outlined text-[#c1ecd4] text-xl" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>person</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopAppBar;
