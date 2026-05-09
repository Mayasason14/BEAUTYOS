import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const isActive = (path) => {
    if (path === '/inventory') {
      return location.pathname === '/inventory' || location.pathname.startsWith('/inventory/');
    }
    return location.pathname === path;
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md text-primary fixed bottom-0 left-0 w-full z-50 flex flex-row-reverse justify-around items-center px-4 pb-6 pt-3 border-t border-secondary">
      <Link
        to="/inventory"
        className={`flex flex-col items-center justify-center ${isActive('/inventory') ? 'text-primary font-bold' : 'text-stone-400 opacity-70'}`}
      >
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>shelves</span>
        <span className="text-[11px] mt-1">המדף</span>
      </Link>
      <Link
        to="/dashboard"
        className={`flex flex-col items-center justify-center ${isActive('/dashboard') ? 'text-primary font-bold' : 'text-stone-400 opacity-70'}`}
      >
        <span className="material-symbols-outlined">calendar_today</span>
        <span className="text-[11px] mt-1">יומן</span>
      </Link>
      <Link
        to="/profile"
        className={`flex flex-col items-center justify-center ${isActive('/profile') ? 'text-primary font-bold' : 'text-stone-400 opacity-70'}`}
      >
        <span className="material-symbols-outlined">person</span>
        <span className="text-[11px] mt-1">פרופיל</span>
      </Link>
    </nav>
  );
};

export default Footer;