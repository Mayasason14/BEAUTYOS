import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import RoutineStepCard from '../components/RoutineStepCard/RoutineStepCard';
import IngredientWarning from '../components/IngredientWarning/IngredientWarning';

const DashboardPage = () => {
  const [routineSteps, setRoutineSteps] = useState([
    {
      icon: 'water_drop',
      title: 'ניקוי עדין',
      product: 'CeraVe Hydrating Cleanser',
      status: 'completed',
      statusText: 'בוצע',
    },
    {
      icon: 'science',
      title: 'סרום ויטמין C',
      product: 'SkinCeuticals CE Ferulic',
      status: 'in-progress',
      statusText: 'בתהליך',
      action: 'בצעי',
    },
    {
      icon: 'wb_sunny',
      title: 'הגנה מהשמש',
      product: 'La Roche-Posay SPF 50',
      status: 'pending',
      statusText: 'טרם בוצע',
      action: 'סמני',
    },
  ]);

  const toggleStepStatus = (index) => {
    setRoutineSteps(prev => prev.map((step, i) => {
      if (i === index) {
        if (step.status === 'pending') {
          return { ...step, status: 'completed', statusText: 'בוצע', action: undefined };
        } else if (step.status === 'in-progress') {
          return { ...step, status: 'completed', statusText: 'בוצע', action: undefined };
        }
      }
      return step;
    }));
  };

  const warning = {
    message: 'שימי לב: הסרום שבו השתמשת אמש מכיל רטינול. אין לשלב אותו עם הפילינג המתוכנן להיום בערב.',
  };

  return (
    <div className="min-h-screen bg-background text-text font-body pb-24">
      <Navbar />
      <main className="pt-24 px-6 max-w-7xl mx-auto space-y-8">
        <section className="hero-gradient rounded-3xl p-8 text-white relative overflow-hidden shadow-sm">
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="space-y-2">
              <p className="font-body-md opacity-90">יום שני, 22 באוקטובר</p>
              <h2 className="font-heading text-h1 text-white leading-tight">שלום, נועה</h2>
              <p className="font-body-lg opacity-80">העור שלך נראה חיוני היום. מוכנה לשגרת הבוקר?</p>
            </div>
            <div className="w-full md:w-72 space-y-3">
              <div className="flex justify-between text-label-sm">
                <span>התקדמות יומית</span>
                <span>65%</span>
              </div>
              <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-accent w-[65%] rounded-full"></div>
              </div>
            </div>
          </div>
        </section>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-h3 text-h3 font-heading">שגרת בוקר</h3>
              <button className="text-secondary font-button flex items-center gap-1">
                עריכה <span className="material-symbols-outlined text-sm">edit</span>
              </button>
            </div>
            <div className="space-y-4">
              {routineSteps.map((step, index) => (
                <RoutineStepCard key={index} step={step} onActionClick={() => toggleStepStatus(index)} />
              ))}
            </div>
          </div>
          <div className="lg:col-span-5 space-y-8">
            <IngredientWarning warning={warning} />
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-container-low p-6 rounded-3xl border border-transparent">
                <span className="material-symbols-outlined text-secondary mb-4 block">opacity</span>
                <div className="text-h3 font-heading">78%</div>
                <div className="text-label-sm text-secondary">רמת לחות ממוצעת</div>
              </div>
              <div className="bg-surface-container-low p-6 rounded-3xl border border-transparent">
                <span className="material-symbols-outlined text-secondary mb-4 block">calendar_month</span>
                <div className="text-h3 font-heading">14</div>
                <div className="text-label-sm text-secondary">ימי רצף של שגרה</div>
              </div>
            </div>
          </div>
        </div>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
          <Link to="/inventory" className="bg-surface-container-high p-8 rounded-3xl flex items-center justify-between cursor-pointer group">
            <div className="space-y-1">
              <h5 className="font-h3 text-xl font-heading">המדף</h5>
              <p className="text-label-sm text-secondary">ניהול מוצרים וקוסמטיקה</p>
            </div>
            <span className="material-symbols-outlined text-4xl text-primary opacity-40 group-hover:opacity-100">shelves</span>
          </Link>
          <div className="bg-surface-container-high p-8 rounded-3xl flex items-center justify-between cursor-pointer group">
            <div className="space-y-1">
              <h5 className="font-h3 text-xl font-heading">יומן</h5>
              <p className="text-label-sm text-secondary">מעקב שינויים וצילומים</p>
            </div>
            <span className="material-symbols-outlined text-4xl text-primary opacity-40 group-hover:opacity-100">calendar_today</span>
          </div>
          <div className="bg-secondary-container p-8 rounded-3xl flex items-center justify-between cursor-pointer group">
            <div className="space-y-1">
              <h5 className="font-h3 text-xl font-heading text-on-secondary-container">הוסיפי מוצר</h5>
              <p className="text-label-sm text-on-secondary-container">סריקה או הזנה ידנית</p>
            </div>
            <span className="material-symbols-outlined text-4xl text-on-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>add_circle</span>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;