import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { supabase } from '../lib/supabase';

const SKIN_TYPES = [
  { value: 'oily',        label: 'שמן' },
  { value: 'dry',         label: 'יבש' },
  { value: 'combination', label: 'מעורב' },
  { value: 'normal',      label: 'רגיל' },
];

const GOALS = [
  { value: 'glow',       label: 'מראה זוהר ובריא' },
  { value: 'anti-aging', label: 'עיכוב תהליכי הזדקנות' },
  { value: 'clearing',   label: 'טיפול בפצעונים ונקבוביות' },
  { value: 'hydration',  label: 'שיקום מחסום הלחות' },
];

// Maps both English DB keys and Hebrew DB values to display labels
const skinTypeLabel = {
  oily:        'שמן',
  dry:         'יבש',
  combination: 'מעורב',
  normal:      'רגיל',
  'שמן':   'שמן',
  'יבש':   'יבש',
  'מעורב': 'מעורב',
  'רגיל': 'רגיל',
};

const goalLabel = {
  glow:        'מראה זוהר ובריא',
  'anti-aging':'עיכוב תהליכי הזדקנות',
  clearing:    'טיפול בפצעונים ונקבוביות',
  hydration:   'שיקום מחסום הלחות',
};

const ProfilePage = () => {
  const [profile,      setProfile]      = useState(null);
  const [loading,      setLoading]      = useState(true);
  const [fetchError,   setFetchError]   = useState('');
  const [editing,      setEditing]      = useState(false);
  const [saving,       setSaving]       = useState(false);
  const [saveError,    setSaveError]    = useState('');
  const [saveSuccess,  setSaveSuccess]  = useState(false);
  const [userId,       setUserId]       = useState(null);

  const [fullName, setFullName] = useState('');
  const [skinType, setSkinType] = useState('');
  const [goal,     setGoal]     = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setFetchError('');
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        setFetchError('לא ניתן לטעון את פרטי המשתמש.');
        setLoading(false);
        return;
      }
      setUserId(user.id);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      if (error) {
        setFetchError('אירעה שגיאה בטעינת הפרופיל. אנא נסי שוב.');
      } else if (data) {
        setProfile(data);
        setFullName(data.full_name || '');
        setSkinType(data.skin_type || '');
        setGoal(data.goal          || '');
      } else {
        setEditing(true);
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaveError('');
    setSaveSuccess(false);
    setSaving(true);
    const { data, error } = await supabase
      .from('profiles')
      .upsert(
        { user_id: userId, full_name: fullName, skin_type: skinType, goal },
        { onConflict: 'user_id' }
      )
      .select()
      .single();
    setSaving(false);
    if (error) {
      setSaveError('שגיאה בשמירת הפרופיל. אנא נסי שוב.');
    } else {
      setProfile(data);
      setEditing(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const startEditing = () => {
    setFullName(profile?.full_name || '');
    setSkinType(profile?.skin_type || '');
    setGoal(profile?.goal          || '');
    setSaveError('');
    setEditing(true);
  };

  const cancelEditing = () => {
    setSaveError('');
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-background text-text font-body pb-24">
      <Navbar />
      <main className="pt-24 px-6 max-w-4xl mx-auto space-y-8">

        {loading && (
          <div className="flex justify-center py-24">
            <span className="material-symbols-outlined animate-spin text-primary text-4xl">progress_activity</span>
          </div>
        )}

        {!loading && fetchError && (
          <p className="text-center text-red-500 py-12">{fetchError}</p>
        )}

        {/* Profile view */}
        {!loading && !fetchError && profile && !editing && (
          <section className="bg-white p-6 rounded-3xl shadow-sm border border-[#E8E0D8]">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="space-y-1">
                <h1 className="font-heading text-3xl text-[#2C2C2A]">{profile.full_name || '—'}</h1>
                <p className="text-sm text-[#5C5751]">
                  סוג עור: {skinTypeLabel[profile.skin_type] || profile.skin_type || '—'}
                </p>
                <p className="text-sm text-[#5C5751]">
                  מטרה: {goalLabel[profile.goal] || profile.goal || '—'}
                </p>
              </div>
              <button
                onClick={startEditing}
                className="flex items-center gap-2 px-5 py-2 rounded-full border border-primary text-primary font-medium hover:bg-[#F5EFE8] transition-all self-start"
              >
                <span className="material-symbols-outlined text-sm">edit</span>
                עריכה
              </button>
            </div>
            {saveSuccess && (
              <p className="text-sm text-green-600 mt-4">הפרופיל נשמר בהצלחה!</p>
            )}
          </section>
        )}

        {/* Create / edit form */}
        {!loading && !fetchError && editing && (
          <section className="bg-white p-6 rounded-3xl shadow-sm border border-[#E8E0D8]">
            <h2 className="font-heading text-2xl text-[#2C2C2A] mb-6">
              {profile ? 'עריכת פ��ופיל' : 'יצירת פרופיל'}
            </h2>
            <form onSubmit={handleSave} className="space-y-6">

              <div>
                <label className="block text-sm font-medium text-[#3D3A35] mb-2">שם מלא</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  placeholder="השם שלך"
                  className="w-full bg-transparent border-b-2 border-[#C9A882] py-2 outline-none text-[#1c1b1b] placeholder:text-[#9C9691] text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#3D3A35] mb-3">סוג עור</label>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {SKIN_TYPES.map(s => (
                    <button
                      key={s.value}
                      type="button"
                      onClick={() => setSkinType(s.value)}
                      className={`py-3 rounded-xl border font-medium text-sm transition-all ${
                        skinType === s.value
                          ? 'bg-[#2C2C2A] text-white border-[#2C2C2A]'
                          : 'bg-[#F5EFE8] text-[#2C2C2A] border-[#E8E0D8] hover:border-[#2C2C2A]'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#3D3A35] mb-2">מטרה עיקרית</label>
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full bg-white border-2 border-[#E8E0D8] rounded-xl text-[#1c1b1b] px-3 py-3 focus:outline-none focus:border-[#C9A882] cursor-pointer transition-colors text-base"
                >
                  <option value="">בחרי מטרה מרכזית</option>
                  {GOALS.map(g => (
                    <option key={g.value} value={g.value}>{g.label}</option>
                  ))}
                </select>
              </div>

              {saveError && <p className="text-sm text-red-500">{saveError}</p>}

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-primary text-white rounded-full py-4 font-medium hover:opacity-90 transition-all disabled:opacity-60"
                >
                  {saving ? 'שומר...' : 'שמירה'}
                </button>
                {profile && (
                  <button
                    type="button"
                    onClick={cancelEditing}
                    className="flex-1 border-2 border-[#2C2C2A] text-[#2C2C2A] rounded-full py-4 font-medium hover:bg-[#F5EFE8] transition-all"
                  >
                    ביטול
                  </button>
                )}
              </div>
            </form>
          </section>
        )}

        {/* Settings */}
        {!loading && !fetchError && (
          <section className="bg-white p-6 rounded-3xl shadow-sm border border-[#E8E0D8]">
            <h2 className="font-heading text-2xl text-[#2C2C2A] mb-4">הגדרות</h2>
            <div className="space-y-3">
              <button className="w-full text-right rounded-2xl border border-[#E8E0D8] px-4 py-4 bg-[#F5EFE8] text-[#2C2C2A] font-medium hover:bg-[#EDE6DE] transition-all">
                התראות
              </button>
              <button className="w-full text-right rounded-2xl border border-[#E8E0D8] px-4 py-4 bg-[#F5EFE8] text-[#2C2C2A] font-medium hover:bg-[#EDE6DE] transition-all">
                שפה
              </button>
            </div>
          </section>
        )}

      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
