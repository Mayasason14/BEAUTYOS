import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { supabase } from '../lib/supabase';

const toHebrewError = (message) => {
  if (message.includes('Invalid login credentials') || message.includes('invalid_credentials')) return 'האימייל או הסיסמה שגויים';
  if (message.includes('Email not confirmed')) return 'האימייל טרם אומת. בדקי את תיבת הדואר שלך';
  if (message.includes('Too many requests') || message.includes('rate limit')) return 'יותר מדי ניסיונות. נסי שוב מאוחר יותר';
  if (message.includes('User not found')) return 'משתמש לא נמצא';
  return 'אירעה שגיאה. אנא נסי שוב';
};

const LoginPage = () => {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(toHebrewError(error.message));
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-background text-text font-body flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-sm border border-[#E8E0D8]">
          <h1 className="font-heading text-3xl text-[#2C2C2A] text-center mb-8">התחברות</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#3D3A35] mb-2">אימייל</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b-2 border-[#C9A882] py-2 outline-none text-[#1c1b1b] placeholder:text-[#9C9691] text-base"
                placeholder="your@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#3D3A35] mb-2">סיסמה</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b-2 border-[#C9A882] py-2 outline-none text-[#1c1b1b] text-base"
                required
              />
            </div>
            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2C2C2A] text-white rounded-full py-4 font-medium hover:opacity-90 transition-all disabled:opacity-60"
            >
              {loading ? 'טוען...' : 'התחברי'}
            </button>
          </form>
          <div className="text-center mt-6">
            <Link to="/onboarding" className="text-sm text-[#C9A882] hover:underline">הרשמה</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
