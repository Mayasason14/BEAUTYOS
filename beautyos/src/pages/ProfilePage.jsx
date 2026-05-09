import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-background text-text font-body pb-24">
      <Navbar />
      <main className="pt-24 px-6 max-w-4xl mx-auto space-y-8">
        <section className="bg-white p-6 rounded-3xl shadow-sm border border-secondary">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="font-heading text-3xl text-primary mb-2">נועה כהן</h1>
              <p className="text-body-md text-secondary">סוג עור: שמן</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="rounded-3xl bg-surface-container-high px-4 py-3">
                <p className="text-label-sm text-secondary">רצף</p>
                <p className="font-bold text-primary">14 ימים</p>
              </div>
              <div className="rounded-3xl bg-surface-container-high px-4 py-3">
                <p className="text-label-sm text-secondary">מוצרים</p>
                <p className="font-bold text-primary">24</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-3xl shadow-sm border border-secondary">
          <h2 className="font-heading text-2xl text-primary mb-4">הגדרות</h2>
          <div className="space-y-3">
            <button className="w-full text-right rounded-2xl border border-secondary px-4 py-4 bg-surface-container-high text-primary hover:bg-secondary transition-all">
              התראות
            </button>
            <button className="w-full text-right rounded-2xl border border-secondary px-4 py-4 bg-surface-container-high text-primary hover:bg-secondary transition-all">
              שפה
            </button>
            <button className="w-full text-right rounded-2xl border border-secondary px-4 py-4 bg-surface-container-high text-primary hover:bg-secondary transition-all">
              יציאה
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
