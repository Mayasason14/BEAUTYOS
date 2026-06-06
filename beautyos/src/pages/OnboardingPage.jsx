import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { supabase } from '../lib/supabase';

const toHebrewError = (message) => {
  if (message.includes('already registered') || message.includes('already been registered')) return 'כתובת האימייל כבר רשומה במערכת';
  if (message.includes('Password should be at least')) return 'הסיסמה חייבת להכיל לפחות 6 תווים';
  if (message.includes('Invalid email')) return 'כתובת האימייל אינה תקינה';
  if (message.includes('rate limit')) return 'יותר מדי ניסיונות. נסי שוב מאוחר יותר';
  return 'אירעה שגיאה. אנא נסי שוב';
};

const OnboardingPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [skinType, setSkinType] = useState('');
  const [sensitivities, setSensitivities] = useState([]);
  const [goal, setGoal] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmationSent, setConfirmationSent] = useState(false);

  const skinTypes = [
    { key: 'oily',        label: 'שמן',   icon: 'opacity' },
    { key: 'dry',         label: 'יבש',   icon: 'water_drop' },
    { key: 'combination', label: 'מעורב', icon: 'routine' },
    { key: 'normal',      label: 'רגיל',  icon: 'health_and_safety' },
  ];

  const sensitivityOptions = ['אדמומיות', 'אקנה', 'פיגמנטציה', 'קמטוטים', 'יובש קיצוני'];

  const goals = [
    { value: 'glow',       label: 'מראה זוהר ובריא (Glow)' },
    { value: 'anti-aging', label: 'עיכוב תהליכי הזדקנות' },
    { value: 'clearing',   label: 'טיפול בפצעונים ונקבוביות' },
    { value: 'hydration',  label: 'שיקום מחסום הלחות' },
  ];

  const toggleSensitivity = (sens) => {
    setSensitivities(prev => prev.includes(sens) ? prev.filter(s => s !== sens) : [...prev, sens]);
  };

  const handleSubmit = async () => {
    setError('');
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) {
      setError(toHebrewError(error.message));
    } else if (data?.session) {
      navigate('/dashboard');
    } else {
      setConfirmationSent(true);
    }
  };

  if (confirmationSent) {
    return (
      <div className="min-h-screen bg-background text-text font-body flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-6">
          <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-sm border border-[#E8E0D8] text-center space-y-4">
            <span className="material-symbols-outlined text-5xl text-[#C9A882] block">mark_email_read</span>
            <h2 className="font-heading text-2xl text-[#2C2C2A]">בדקי את האימייל שלך!</h2>
            <p className="text-base text-[#5C5751]">
              שלחנו לך קישור לאימות לכתובת <strong className="text-[#2C2C2A]">{email}</strong>.
              לחצי על הקישור כדי להשלים את ההרשמה.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="w-full bg-[#2C2C2A] text-white rounded-full py-3 font-medium hover:opacity-90 transition-all"
            >
              לדף ההתחברות
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-text font-body overflow-x-hidden">
      <Navbar />
      <main className="max-w-[600px] mx-auto px-6 py-12 flex flex-col gap-8">
        {/* Progress indicator */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-full h-[2px] bg-[#E8E0D8] relative">
            <div className="absolute right-0 top-0 h-full w-1/3 bg-accent" />
          </div>
          <div className="flex flex-row-reverse gap-3 mt-2">
            <div className="w-2 h-2 rounded-full bg-accent" />
            <div className="w-2 h-2 rounded-full bg-[#E8E0D8]" />
            <div className="w-2 h-2 rounded-full bg-[#E8E0D8]" />
          </div>
        </div>

        {/* Heading */}
        <section className="text-center">
          <h1 className="font-heading text-3xl text-[#2C2C2A] mb-2">בואי נכיר את העור שלך</h1>
          <p className="text-base text-[#5C5751] max-w-[400px] mx-auto">
            כדי להתאים לך את השגרה המדויקת ביותר, נשמח לדעת קצת יותר על סוג העור והמטרות שלך.
          </p>
        </section>

        {/* Email & password */}
        <section className="flex flex-col gap-6">
          <div>
            <label className="block text-sm font-medium text-[#3D3A35] mb-2">אימייל</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b-2 border-[#C9A882] py-2 outline-none text-[#1c1b1b] placeholder:text-[#9C9691] text-base"
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
        </section>

        {/* Skin type */}
        <section>
          <label className="block text-sm font-medium text-[#3D3A35] mb-4">סוג העור העיקרי שלך</label>
          <div className="grid grid-cols-2 gap-4">
            {skinTypes.map((type) => (
              <button
                key={type.key}
                onClick={() => setSkinType(type.key)}
                className={`p-6 rounded-xl flex flex-col items-center gap-2 border transition-all ${
                  skinType === type.key
                    ? 'bg-[#2C2C2A] text-white border-[#2C2C2A]'
                    : 'bg-[#F5EFE8] text-[#2C2C2A] border-[#E8E0D8] hover:border-[#C9A882]'
                }`}
              >
                <span className="material-symbols-outlined text-3xl">{type.icon}</span>
                <span className="text-sm font-semibold">{type.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Sensitivities */}
        <section>
          <label className="block text-sm font-medium text-[#3D3A35] mb-4">
            רגישויות מיוחדות (ניתן לבחור כמה)
          </label>
          <div className="flex flex-wrap gap-2">
            {sensitivityOptions.map((sens) => (
              <button
                key={sens}
                onClick={() => toggleSensitivity(sens)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                  sensitivities.includes(sens)
                    ? 'bg-[#2C2C2A] text-white border-[#2C2C2A]'
                    : 'bg-[#F5EFE8] text-[#3D3A35] border-[#E8E0D8] hover:border-[#C9A882]'
                }`}
              >
                {sens}
              </button>
            ))}
          </div>
        </section>

        {/* Goal */}
        <section>
          <label className="block text-sm font-medium text-[#3D3A35] mb-2">מה המטרה העיקרית שלך?</label>
          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full bg-[#F5EFE8] border-2 border-[#E8E0D8] rounded-xl px-4 py-3 text-[#1c1b1b] outline-none focus:border-[#C9A882] transition-colors cursor-pointer text-base"
          >
            <option disabled value="">בחרי מטרה מרכזית</option>
            {goals.map((g) => (
              <option key={g.value} value={g.value}>{g.label}</option>
            ))}
          </select>
        </section>

        {/* Actions */}
        <section className="flex flex-col gap-6 mt-8">
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
          <div className="flex gap-4 w-full">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 py-3 bg-[#2C2C2A] text-white rounded-full font-medium hover:opacity-90 transition-all disabled:opacity-60"
            >
              {loading ? 'טוען...' : 'המשך לשלב הבא'}
            </button>
            <button
              onClick={() => navigate(-1)}
              className="flex-1 py-3 border-2 border-[#2C2C2A] text-[#2C2C2A] rounded-full font-medium hover:bg-[#F5EFE8] transition-all"
            >
              חזרה
            </button>
          </div>
          <div className="text-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-sm text-[#C9A882] hover:underline"
            >
              דלגי לעת עתה
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default OnboardingPage;
