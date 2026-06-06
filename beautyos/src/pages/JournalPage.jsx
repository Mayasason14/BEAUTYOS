import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { supabase } from '../lib/supabase';

const MOODS = [
  { value: 'great',    emoji: '😊', label: 'מעולה' },
  { value: 'good',     emoji: '🙂', label: 'טוב' },
  { value: 'okay',     emoji: '😐', label: 'בסדר' },
  { value: 'bad',      emoji: '😕', label: 'לא טוב' },
  { value: 'terrible', emoji: '😞', label: 'גרוע' },
];

const moodMap = Object.fromEntries(MOODS.map(m => [m.value, `${m.emoji} ${m.label}`]));

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Intl.DateTimeFormat('he-IL', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(dateStr));
};

const JournalPage = () => {
  const [entries,      setEntries]      = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [fetchError,   setFetchError]   = useState('');
  const [saving,       setSaving]       = useState(false);
  const [saveError,    setSaveError]    = useState('');
  const [saveSuccess,  setSaveSuccess]  = useState(false);

  const [mood,          setMood]          = useState('');
  const [note,          setNote]          = useState('');
  const [moistureLevel, setMoistureLevel] = useState(50);
  const [rednessLevel,  setRednessLevel]  = useState(0);

  const fetchEntries = async () => {
    setLoading(true);
    setFetchError('');
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setLoading(false); return; }

    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .eq('user_id', user.id)
      .order('entry_date', { ascending: false });

    if (error) {
      setFetchError('אירעה שגיאה בטעינת היומן. אנא נסי שוב.');
    } else {
      setEntries(data);
    }
    setLoading(false);
  };

  useEffect(() => { fetchEntries(); }, []);

  const handleSave = async () => {
    setSaveError('');
    setSaveSuccess(false);
    setSaving(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setSaving(false); return; }

    const { error } = await supabase.from('journal_entries').insert({
      user_id:        user.id,
      entry_date:     new Date().toISOString().slice(0, 10),
      mood:           mood || null,
      note:           note || null,
      moisture_level: moistureLevel,
      redness_level:  rednessLevel,
    });

    setSaving(false);

    if (error) {
      setSaveError('שגיאה בשמירת הרשומה. אנא נסי שוב.');
    } else {
      setSaveSuccess(true);
      setMood('');
      setNote('');
      setMoistureLevel(50);
      setRednessLevel(0);
      fetchEntries();
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-background text-text font-body pb-24">
      <Navbar />
      <main className="pt-24 px-6 max-w-3xl mx-auto space-y-10">

        {/* Header */}
        <div>
          <h1 className="font-heading text-3xl text-[#2C2C2A]">יומן העור שלי</h1>
          <p className="text-base text-[#5C5751] mt-1">מעקב יומי אחר מצב העור, הרגשה ולחות</p>
        </div>

        {/* New entry form */}
        <section className="bg-white border border-[#E8E0D8] rounded-3xl p-8 space-y-6">
          <h2 className="font-heading text-xl font-bold text-[#2C2C2A]">רשומה חדשה להיום</h2>

          {/* Mood */}
          <div>
            <label className="block text-sm font-medium text-[#5C5751] mb-3">איך העור שלך מרגיש היום?</label>
            <div className="flex gap-3 flex-wrap">
              {MOODS.map(m => (
                <button
                  key={m.value}
                  onClick={() => setMood(m.value)}
                  className={`flex flex-col items-center gap-1 px-4 py-3 rounded-2xl border transition-all ${
                    mood === m.value
                      ? 'bg-[#2C2C2A] border-[#2C2C2A] text-white'
                      : 'bg-[#F5EFE8] border-transparent text-[#3D3A35] hover:border-[#C9A882]'
                  }`}
                >
                  <span className="text-2xl">{m.emoji}</span>
                  <span className="text-xs font-medium">{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Moisture slider */}
          <div>
            <label className="block text-sm font-medium text-[#5C5751] mb-2">
              רמת לחות: <span className="text-[#2C2C2A] font-semibold">{moistureLevel}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={moistureLevel}
              onChange={(e) => setMoistureLevel(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-xs text-[#5C5751] mt-1">
              <span>יבש מאוד</span>
              <span>לח מאוד</span>
            </div>
          </div>

          {/* Redness slider */}
          <div>
            <label className="block text-sm font-medium text-[#5C5751] mb-2">
              רמת אדמומיות: <span className="text-[#2C2C2A] font-semibold">{rednessLevel} / 10</span>
            </label>
            <input
              type="range"
              min="0"
              max="10"
              value={rednessLevel}
              onChange={(e) => setRednessLevel(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-xs text-[#5C5751] mt-1">
              <span>ללא</span>
              <span>חמורה</span>
            </div>
          </div>

          {/* Note */}
          <div>
            <label className="block text-sm font-medium text-[#5C5751] mb-2">הערות</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              placeholder="מה שמת לב היום? שינויים, תגובות למוצרים..."
              className="w-full bg-transparent border border-[#E8E0D8] rounded-2xl p-4 outline-none text-[#1c1b1b] resize-none focus:border-[#C9A882] transition-colors text-base placeholder:text-[#9C9691]"
            />
          </div>

          {saveError   && <p className="text-sm text-red-500">{saveError}</p>}
          {saveSuccess && <p className="text-sm text-green-600">הרשומה נשמרה בהצלחה!</p>}

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-[#2C2C2A] text-white rounded-full py-4 font-medium hover:opacity-90 transition-all disabled:opacity-60"
          >
            {saving ? 'שומר...' : 'שמרי יומן יומי'}
          </button>
        </section>

        {/* Entries list */}
        <section className="space-y-4 pb-8">
          <h2 className="font-heading text-xl font-bold text-[#2C2C2A]">הרשומות שלי</h2>

          {loading ? (
            <div className="flex justify-center py-12">
              <span className="material-symbols-outlined animate-spin text-primary text-4xl">progress_activity</span>
            </div>
          ) : fetchError ? (
            <p className="text-center text-red-500 py-8">{fetchError}</p>
          ) : entries.length === 0 ? (
            <p className="text-center text-[#5C5751] py-8">עדיין אין רשומות. התחילי לתעד את מסע העור שלך!</p>
          ) : (
            entries.map(entry => (
              <div key={entry.id} className="bg-white border border-[#E8E0D8] rounded-2xl p-6 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#5C5751]">{formatDate(entry.entry_date)}</span>
                  {entry.mood && (
                    <span className="text-sm bg-[#F5EFE8] text-[#2C2C2A] px-3 py-1 rounded-full font-medium">
                      {moodMap[entry.mood] ?? entry.mood}
                    </span>
                  )}
                </div>
                {entry.note && (
                  <p className="text-sm text-[#3D3A35]">{entry.note}</p>
                )}
                <div className="flex gap-6 pt-2 border-t border-[#E8E0D8]">
                  {entry.moisture_level != null && (
                    <span className="flex items-center gap-1 text-xs text-[#5C5751]">
                      <span className="material-symbols-outlined text-base">opacity</span>
                      לחות: {entry.moisture_level}%
                    </span>
                  )}
                  {entry.redness_level != null && (
                    <span className="flex items-center gap-1 text-xs text-[#5C5751]">
                      <span className="material-symbols-outlined text-base">wb_sunny</span>
                      אדמומיות: {entry.redness_level}/10
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default JournalPage;
