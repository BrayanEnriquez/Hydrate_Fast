import React from 'react';
import { Link } from 'react-router-dom';

const BottomNavBar = () => {
  return (
    <nav className="md:hidden fixed bottom-0 w-full z-50 rounded-t-xl bg-[#f3f4f5] border-t border-[#c1c8c2] shadow-lg flex justify-around items-center h-20 px-1">
      <Link to="/dashboard" className="flex flex-col items-center justify-center text-[#414844] py-1 hover:bg-[#e7e8e9] transition-all active:scale-90 duration-150 rounded-xl px-3">
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>dashboard</span>
        <span className="text-xs font-semibold tracking-wider mt-1">Dashboard</span>
      </Link>

      <Link to="/cultivos" className="flex flex-col items-center justify-center bg-[#1b4332] text-[#86af99] rounded-full px-4 py-1 active:scale-90 transition-transform duration-150">
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>psychology_alt</span>
        <span className="text-xs font-semibold tracking-wider mt-1">Crops</span>
      </Link>

      <Link to="/alertas" className="flex flex-col items-center justify-center text-[#414844] py-1 hover:bg-[#e7e8e9] transition-all active:scale-90 duration-150 rounded-xl px-3">
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>notifications</span>
        <span className="text-xs font-semibold tracking-wider mt-1">Alerts</span>
      </Link>

      <Link to="/historial" className="flex flex-col items-center justify-center text-[#414844] py-1 hover:bg-[#e7e8e9] transition-all active:scale-90 duration-150 rounded-xl px-3">
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>history</span>
        <span className="text-xs font-semibold tracking-wider mt-1">History</span>
      </Link>
    </nav>
  );
};

export default BottomNavBar;
