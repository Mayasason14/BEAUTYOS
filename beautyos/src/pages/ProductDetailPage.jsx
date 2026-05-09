import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const ProductDetailPage = () => {
  const { id } = useParams();

  // Dummy data for product
  const product = {
    name: 'סרום רטינול 0.5%',
    description: 'סרום לחידוש העור וטשטוש קמטוטים, מבוסס על רטינול טהור בשחרור מושהה.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk2_o6zG5zK4bAKZvryRChTopu2wzHmsC8cYbH_HO7gaZu6w-SBc_WDhjy5nYmzNY5pdBDskxAt1hIU0vUZsQAijN5LnAnpTmShIcT-k5b_7-Y8ylqEayKS-gjpCvZHG2IPpHT8hlPJ-KkUc3UQtZ-JvayHRzeB9JHRjP5EvIq6OqsVDf0tHDI-qw7zjbSmHIW-n3XSeBU1oFKMTO_9tK-AHbLSyxfa59BhXf5x5CYgRKA6tWL67YXAzGrsZHOqzu8mE401MGBCYg',
    tags: ['מומלץ ללילה', 'עור שמן'],
    ingredients: ['רטינול 0.5%', 'סקואלן', 'שמן רוז היפ', 'ויטמין E'],
    features: [
      { icon: 'eco', label: 'טבעוני לחלוטין' },
      { icon: 'science', label: 'ללא פראבנים' },
      { icon: 'water_drop', label: 'היפואלרגני' },
      { icon: 'verified', label: 'נבדק דרמטולוגית' },
    ],
    warning: {
      message: 'אין להשתמש במוצר זה יחד עם ה-Vitamin C Suspension בשגרה הנוכחית שלך.',
    },
  };

  return (
    <div className="bg-background text-text font-body">
      <Navbar />
      <main className="pt-24 pb-32 px-6 max-w-screen-md mx-auto">
        <nav className="flex items-center gap-2 mb-8 text-label-sm text-secondary">
          <Link to="/inventory" className="hover:text-primary">המדף</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_left</span>
          <span className="text-primary font-semibold">{product.name}</span>
        </nav>
        <section className="relative mb-xl aspect-[4/5] rounded-xl overflow-hidden bg-gradient-to-br from-secondary-container to-surface-container-high flex items-center justify-center p-xl">
          <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
            {product.tags.map((tag, index) => (
              <span key={index} className="bg-secondary-container text-on-secondary-container rounded-full px-3 py-1 text-label-sm">
                {tag}
              </span>
            ))}
          </div>
          <img alt="Product bottle" className="w-full h-full object-contain mix-blend-multiply" src={product.image} />
        </section>
        <section className="space-y-xl">
          <header>
            <h2 className="font-h1 text-h1 text-primary mb-2">{product.name}</h2>
            <p className="font-body-lg text-secondary">{product.description}</p>
          </header>
          <div className="bg-error-container border border-error rounded-xl p-lg flex gap-4">
            <span className="material-symbols-outlined text-error" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
            <div>
              <h4 className="font-bold text-error text-body-md mb-1">התנגשות חומרים פעילים</h4>
              <p className="text-on-surface text-body-md">{product.warning.message}</p>
            </div>
          </div>
          <div className="border-t border-outline-variant pt-lg">
            <h3 className="font-h3 text-h3 mb-md">רכיבים עיקריים</h3>
            <div className="flex flex-wrap gap-2">
              {product.ingredients.map((ing, index) => (
                <span key={index} className="bg-secondary-container text-on-secondary-container px-4 py-2 rounded-full font-label-sm">
                  {ing}
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {product.features.map((feat, index) => (
              <div key={index} className="bg-surface-container rounded-xl p-md flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">{feat.icon}</span>
                <span className="font-label-sm">{feat.label}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4 mt-xxl">
            <button className="bg-primary text-on-primary rounded-full py-4 px-8 font-button hover:opacity-90">
              הוסיפי לשגרה
            </button>
            <button className="bg-transparent border border-primary text-primary rounded-full py-4 px-8 font-button hover:bg-surface-container">
              ערכי פרטים
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;