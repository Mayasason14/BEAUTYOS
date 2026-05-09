import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const navItems = [
  { label: 'דשבורד', to: '/dashboard' },
  { label: 'המדף', to: '/inventory' },
  { label: 'פרופיל', to: '/profile' },
  { label: 'התחברות', to: '/login' },
];

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setDrawerOpen(false)}
      />
      <aside className={`fixed top-0 right-0 h-full w-72 bg-background shadow-2xl z-50 transform transition-transform duration-300 ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-secondary">
          <span className="font-heading text-xl text-primary">תפריט</span>
          <button className="material-symbols-outlined text-primary" onClick={() => setDrawerOpen(false)}>
            close
          </button>
        </div>
        <nav className="flex flex-col gap-3 p-6">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setDrawerOpen(false)}
              className="rounded-2xl bg-surface-container-high px-4 py-3 text-primary font-medium hover:bg-secondary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <header className="bg-background text-primary font-serif text-lg tracking-tight border-b border-secondary flex flex-row-reverse justify-between items-center w-full px-6 py-4 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <span className="text-2xl font-heading text-primary">BeautyOS</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="material-symbols-outlined text-primary" onClick={() => setDrawerOpen(true)}>
            menu
          </button>
        </div>
      </header>
    </>
  );
};

export default Navbar;