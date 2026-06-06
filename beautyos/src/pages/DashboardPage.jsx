import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import RoutineStepCard from '../components/RoutineStepCard/RoutineStepCard';
import IngredientWarning from '../components/IngredientWarning/IngredientWarning';
import { supabase } from '../lib/supabase';

const todayHebrew = new Intl.DateTimeFormat('he-IL', {
  weekday: 'long', day: 'numeric', month: 'long',
}).format(new Date());

const statusLabel = { completed: 'בוצע', 'in-progress': 'בתהליך', pending: 'טרם בוצע' };

const calculateStreak = (entries) => {
  if (!entries.length) return 0;
  const dates = [...new Set(entries.map(e => (e.created_at || '').slice(0, 10)))]
    .filter(Boolean)
    .sort()
    .reverse();
  let streak = 0;
  let cursor = new Date().toISOString().slice(0, 10);
  for (const date of dates) {
    if (date === cursor) {
      streak++;
      const d = new Date(cursor);
      d.setDate(d.getDate() - 1);
      cursor = d.toISOString().slice(0, 10);
    } else {
      break;
    }
  }
  return streak;
};

const warning = {
  message: 'שימי לב: הסרום שבו השתמשת אמש מכיל רטינול. אין לשלב אותו עם הפילינג המתוכנן להיום בערב.',
};

const DashboardPage = () => {
  const [routineSteps, setRoutineSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [avgMoisture, setAvgMoisture] = useState(null);
  const [streak, setStreak] = useState(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }

      setUserName(user.user_metadata?.full_name || user.email?.split('@')[0] || '');

      const [{ data: stepsData }, { data: journalData }] = await Promise.all([
        supabase
          .from('routine_steps')
          .select('*, products(name, brand)')
          .eq('user_id', user.id)
          .order('order', { ascending: true }),
        supabase
          .from('journal_entries')
          .select('created_at, moisture_level')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false }),
      ]);

      if (stepsData) {
        setRoutineSteps(stepsData.map(s => ({
          id: s.id,
          icon: s.icon || 'spa',
          title: s.title,
          product: s.products?.name || '',
          status: s.status || 'pending',
          statusText: statusLabel[s.status] || 'טרם בוצע',
          action: s.status !== 'completed' ? 'בצעי' : undefined,
        })));
      }

      if (journalData?.length) {
        const withMoisture = journalData.filter(e => e.moisture_level != null).slice(0, 7);
        if (withMoisture.length) {
          setAvgMoisture(Math.round(withMoisture.reduce((sum, e) => sum + e.moisture_level, 0) / withMoisture.length));
        }
        setStreak(calculateStreak(journalData));
      }

      setLoading(false);
    };
    fetchData();
  }, []);

  const toggleStepStatus = async (index) => {
    const step = routineSteps[index];
    if (step.status === 'completed') return;
    setRoutineSteps(prev => prev.map((s, i) =>
      i === index ? { ...s, status: 'completed', statusText: 'בוצע', action: undefined } : s
    ));
    if (step.id) {
      await supabase.from('routine_steps').update({ status: 'completed' }).eq('id', step.id);
    }
  };

  const completedCount = routineSteps.filter(s => s.status === 'completed').length;
  const progressPercent = routineSteps.length > 0
    ? Math.round((completedCount / routineSteps.length) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-background text-text font-body pb-24">
      <Navbar />
      <main className="pt-24 px-6 max-w-7xl mx-auto space-y-8">
        <section
          className="rounded-3xl p-8 relative overflow-hidden shadow-sm"
          style={{ background: 'linear-gradient(135deg, #3D3A35 0%, #2C2C2A 100%)' }}
        >
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="space-y-2">
              <p className="text-base text-white" style={{ opacity: 0.75 }}>{todayHebrew}</p>
              <h2 className="font-heading text-3xl text-white font-bold leading-tight">שלום, {userName}</h2>
              <p className="text-base text-white" style={{ opacity: 0.7 }}>העור שלך נראה חיוני היום. מוכנה לשגרת הבוקר?</p>
            </div>
            <div className="w-full md:w-72 space-y-3">
              <div className="flex justify-between text-sm text-white">
                <span>התקדמות יומית</span>
                <span>{progressPercent}%</span>
              </div>
              <div
                className="w-full h-2 rounded-full overflow-hidden"
                style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
              >
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${progressPercent}%`, backgroundColor: '#C9A882' }}
                />
              </div>
            </div>
          </div>
        </section>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-[#2C2C2A]">שגרת בוקר</h3>
              <button className="text-sm text-[#5C5751] flex items-center gap-1 hover:text-[#2C2C2A] transition-colors">
                עריכה <span className="material-symbols-outlined text-sm">edit</span>
              </button>
            </div>
            {loading ? (
              <div className="flex justify-center py-8">
                <span className="material-symbols-outlined animate-spin text-primary text-4xl">progress_activity</span>
              </div>
            ) : (
              <div className="space-y-4">
                {routineSteps.length > 0 ? (
                  routineSteps.map((step, index) => (
                    <RoutineStepCard
                      key={step.id ?? index}
                      step={step}
                      onActionClick={() => toggleStepStatus(index)}
                    />
                  ))
                ) : (
                  <p className="text-sm text-[#5C5751] text-center py-8">לא נמצאו שלבים בשגרה</p>
                )}
              </div>
            )}
          </div>
          <div className="lg:col-span-5 space-y-8">
            <IngredientWarning warning={warning} />
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#F5EFE8] p-6 rounded-3xl border border-[#E8E0D8]">
                <span className="material-symbols-outlined text-[#C9A882] mb-4 block">opacity</span>
                <div className="text-2xl font-bold text-[#2C2C2A]">
                  {loading ? '—' : avgMoisture != null ? `${avgMoisture}%` : '—'}
                </div>
                <div className="text-sm text-[#5C5751] mt-1">רמת לחות ממוצעת</div>
              </div>
              <div className="bg-[#F5EFE8] p-6 rounded-3xl border border-[#E8E0D8]">
                <span className="material-symbols-outlined text-[#C9A882] mb-4 block">calendar_month</span>
                <div className="text-2xl font-bold text-[#2C2C2A]">
                  {loading ? '—' : streak != null ? streak : '—'}
                </div>
                <div className="text-sm text-[#5C5751] mt-1">ימי רצף של שגרה</div>
              </div>
            </div>
          </div>
        </div>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
          <Link to="/inventory" className="bg-[#F5EFE8] p-8 rounded-3xl flex items-center justify-between group border border-[#E8E0D8] hover:border-[#C9A882] transition-colors">
            <div className="space-y-1">
              <h5 className="text-xl font-bold text-[#2C2C2A]">המדף</h5>
              <p className="text-sm text-[#5C5751]">ניהול מוצרים וקוסמטיקה</p>
            </div>
            <span className="material-symbols-outlined text-4xl text-[#2C2C2A] opacity-40 group-hover:opacity-100 transition-opacity">shelves</span>
          </Link>
          <Link to="/journal" className="bg-[#F5EFE8] p-8 rounded-3xl flex items-center justify-between group border border-[#E8E0D8] hover:border-[#C9A882] transition-colors">
            <div className="space-y-1">
              <h5 className="text-xl font-bold text-[#2C2C2A]">יומן</h5>
              <p className="text-sm text-[#5C5751]">מעקב שינויים וצילומים</p>
            </div>
            <span className="material-symbols-outlined text-4xl text-[#2C2C2A] opacity-40 group-hover:opacity-100 transition-opacity">calendar_today</span>
          </Link>
          <div className="p-8 rounded-3xl flex items-center justify-between cursor-pointer group border border-[#2C2C2A] hover:opacity-90 transition-opacity" style={{ backgroundColor: '#2C2C2A' }}>
            <div className="space-y-1">
              <h5 className="text-xl font-bold text-white">הוסיפי מוצר</h5>
              <p className="text-sm text-white" style={{ opacity: 0.7 }}>סריקה או הזנה ידנית</p>
            </div>
            <span className="material-symbols-outlined text-4xl text-white" style={{ fontVariationSettings: "'FILL' 1" }}>add_circle</span>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
