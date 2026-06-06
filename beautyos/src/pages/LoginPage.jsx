import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { supabase } from '../lib/supabase';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-background text-text font-body flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-surface-container rounded-3xl p-8 shadow-lg">
          <h1 className="font-heading text-h1 text-primary text-center mb-8">התחברות</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-label-sm text-on-surface-variant mb-2">אימייל</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-primary py-2 outline-none text-body-md"
                required
              />
            </div>
            <div>
              <label className="block font-label-sm text-on-surface-variant mb-2">סיסמה</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-primary py-2 outline-none text-body-md"
                required
              />
            </div>
            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-on-primary rounded-full py-4 font-button hover:opacity-90 transition-all disabled:opacity-60"
            >
              {loading ? 'טוען...' : 'התחברי'}
            </button>
          </form>
          <div className="text-center mt-6">
            <Link to="/onboarding" className="font-label-sm text-accent hover:underline">הרשמה</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;