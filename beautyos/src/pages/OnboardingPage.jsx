import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const OnboardingPage = () => {
  const navigate = useNavigate();
  const [skinType, setSkinType] = useState('');
  const [sensitivities, setSensitivities] = useState([]);
  const [goal, setGoal] = useState('');

  const skinTypes = [
    { key: 'oily', label: 'שמן', icon: 'opacity' },
    { key: 'dry', label: 'יבש', icon: 'water_drop' },
    { key: 'combination', label: 'מעורב', icon: 'routine' },
    { key: 'normal', label: 'רגיל', icon: 'health_and_safety' },
  ];

  const sensitivityOptions = [
    'אדמומיות', 'אקנה', 'פיגמנטציה', 'קמטוטים', 'יובש קיצוני'
  ];

  const goals = [
    { value: 'glow', label: 'מראה זוהר ובריא (Glow)' },
    { value: 'anti-aging', label: 'עיכוב תהליכי הזדקנות' },
    { value: 'clearing', label: 'טיפול בפצעונים ונקבוביות' },
    { value: 'hydration', label: 'שיקום מחסום הלחות' },
  ];

  const toggleSensitivity = (sens) => {
    setSensitivities(prev => prev.includes(sens) ? prev.filter(s => s !== sens) : [...prev, sens]);
  };

  return (
    <div className="min-h-screen bg-background text-text font-body overflow-x-hidden">
      <Navbar />
      <main className="max-w-[600px] mx-auto px-6 py-xl flex flex-col gap-xl">
        <div className="flex flex-col items-center gap-sm">
          <div className="w-full h-[2px] bg-surface-container relative">
            <div className="absolute right-0 top-0 h-full w-1/3 bg-accent"></div>
          </div>
          <div className="flex flex-row-reverse gap-3 mt-2">
            <div className="w-2 h-2 rounded-full bg-accent"></div>
            <div className="w-2 h-2 rounded-full bg-surface-variant"></div>
            <div className="w-2 h-2 rounded-full bg-surface-variant"></div>
          </div>
        </div>
        <section className="text-center">
          <h1 className="font-heading text-h1 text-primary mb-sm">בואי נכיר את העור שלך</h1>
          <p className="font-body-md text-on-surface-variant max-w-[400px] mx-auto">כדי להתאים לך את השגרה המדויקת ביותר, נשמח לדעת קצת יותר על סוג העור והמטרות שלך.</p>
        </section>
        <section>
          <label className="font-label-sm text-on-surface-variant block mb-md">סוג העור העיקרי שלך</label>
          <div className="grid grid-cols-2 gap-gutter">
            {skinTypes.map((type) => (
              <button
                key={type.key}
                className={`p-lg rounded-xl flex flex-col items-center gap-sm border transition-all ${
                  skinType === type.key
                    ? 'bg-secondary-container text-on-primary border-secondary-container'
                    : 'bg-surface-container-low text-on-surface border-secondary hover:border-outline-variant'
                }`}
                onClick={() => setSkinType(type.key)}
              >
                <span className="material-symbols-outlined text-3xl">{type.icon}</span>
                <span className="font-body-md font-semibold">{type.label}</span>
              </button>
            ))}
          </div>
        </section>
        <section>
          <label className="font-label-sm text-on-surface-variant block mb-md">רגישויות מיוחדות (ניתן לבחור כמה)</label>
          <div className="flex flex-wrap gap-sm">
            {sensitivityOptions.map((sens) => (
              <button
                key={sens}
                className={`px-md py-sm rounded-full font-label-sm ${
                  sensitivities.includes(sens)
                    ? 'bg-secondary-container text-on-secondary-container'
                    : 'bg-surface-container-high text-on-surface-variant'
                }`}
                onClick={() => toggleSensitivity(sens)}
              >
                {sens}
              </button>
            ))}
          </div>
        </section>
        <section>
          <label className="font-label-sm text-on-surface-variant block mb-sm">מה המטרה העיקרית שלך?</label>
          <div className="relative">
            <select
              className="w-full bg-transparent border-b border-primary text-body-md py-md appearance-none focus:outline-none cursor-pointer"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            >
              <option disabled value="">בחרי מטרה מרכזית</option>
              {goals.map((g) => (
                <option key={g.value} value={g.value}>{g.label}</option>
              ))}
            </select>
          </div>
        </section>
        <section className="flex flex-col gap-lg mt-xl">
          <div className="flex gap-md w-full">
            <button className="flex-1 py-md bg-primary text-on-primary rounded-full font-button shadow-sm hover:opacity-90 transition-all" onClick={() => navigate('/dashboard')}>
              המשך לשלב הבא
            </button>
            <button className="flex-1 py-md bg-transparent border border-outline text-primary rounded-full font-button hover:bg-surface-container-low transition-all">
              חזרה
            </button>
          </div>
          <div className="text-center">
            <button className="font-label-sm text-accent hover:underline" onClick={() => navigate('/dashboard')}>דלגי לעת עתה</button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default OnboardingPage;