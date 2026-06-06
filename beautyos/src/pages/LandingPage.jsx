import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const LandingPage = () => {
  const navigate = useNavigate();
  const [skinType, setSkinType] = useState('');
  const [sensitivities, setSensitivities] = useState([]);
  const [goal, setGoal] = useState('');

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

        {/* Hero */}
        <section className="text-center">
          <h1 className="font-heading text-3xl text-[#2C2C2A] mb-2">בואי נכיר את העור שלך</h1>
          <p className="text-base text-[#5C5751] max-w-[400px] mx-auto">
            כדי להתאים לך את השגרה המדויקת ביותר, נשמח לדעת קצת יותר על סוג העור והמטרות שלך.
          </p>
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

        {/* CTA */}
        <section className="flex flex-col gap-4 mt-4">
          <div className="flex gap-4 w-full">
            <button
              onClick={() => navigate('/onboarding')}
              className="flex-1 py-3 bg-[#2C2C2A] text-white rounded-full font-medium hover:opacity-90 transition-all"
            >
              המשך לשלב הבא
            </button>
            <button
              onClick={() => navigate('/login')}
              className="flex-1 py-3 border-2 border-[#2C2C2A] text-[#2C2C2A] rounded-full font-medium hover:bg-[#F5EFE8] transition-all"
            >
              כבר רשומה? התחברי
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

export default LandingPage;
