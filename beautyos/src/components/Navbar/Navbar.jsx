import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const authedNavItems = [
  { label: 'דשבורד', to: '/dashboard' },
  { label: 'המדף', to: '/inventory' },
  { label: 'פרופיל', to: '/profile' },
];

const guestNavItems = [
  { label: 'התחברות', to: '/login' },
];

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setDrawerOpen(false);
    navigate('/');
  };

  const navItems = user ? authedNavItems : guestNavItems;

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
              className="rounded-2xl bg-[#F5EFE8] px-4 py-3 text-[#2C2C2A] font-medium hover:bg-[#EDE6DE] transition-colors"
            >
              {item.label}
            </Link>
          ))}
          {user && (
            <button
              onClick={handleLogout}
              className="rounded-2xl bg-[#F5EFE8] px-4 py-3 text-[#2C2C2A] font-medium hover:bg-[#EDE6DE] transition-colors text-right"
            >
              יציאה
            </button>
          )}
        </nav>
      </aside>
      <header className="bg-background text-primary font-serif text-lg tracking-tight border-b border-secondary flex flex-row-reverse justify-between items-center w-full px-6 py-4 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <span className="text-2xl font-heading text-primary">BeautyOS</span>
        </div>
        <div className="flex items-center gap-3">
          {user && (
            <button
              onClick={handleLogout}
              className="material-symbols-outlined text-primary"
              title="יציאה"
            >
              logout
            </button>
          )}
          <button className="material-symbols-outlined text-primary" onClick={() => setDrawerOpen(true)}>
            menu
          </button>
        </div>
      </header>
    </>
  );
};

export default Navbar;