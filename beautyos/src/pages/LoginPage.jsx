import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy login
    console.log('Login:', email, password);
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
            <button
              type="submit"
              className="w-full bg-primary text-on-primary rounded-full py-4 font-button hover:opacity-90 transition-all"
            >
              התחברי
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