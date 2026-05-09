import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import ProductCard from '../components/ProductCard/ProductCard';
import FilterChips from '../components/FilterChips/FilterChips';

const InventoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { key: 'all', label: 'הכל' },
    { key: 'open', label: 'פתוחים' },
    { key: 'expired', label: 'פגי תוקף' },
    { key: 'serum', label: 'סרום' },
    { key: 'moisturizer', label: 'לחות' },
  ];

  const products = [
    {
      id: 1,
      emoji: '🧴',
      name: 'Hyaluronic Acid 2%',
      brand: 'The Ordinary',
      category: 'moisturizer',
      status: 'expired',
      statusText: 'פג תוקף',
      openDate: '12/01/2024',
      expiryStatus: 'expired',
      expiryText: 'עבר לפני שבוע',
    },
    {
      id: 2,
      emoji: '✨',
      name: 'C-Firma Fresh Day',
      brand: 'Drunk Elephant',
      category: 'serum',
      status: 'open',
      statusText: 'פתוח - 6 חודשים',
      openDate: '05/03/2024',
      expiryStatus: 'valid',
      expiryText: 'נותרו 122 ימים',
    },
    {
      id: 3,
      emoji: '🧪',
      name: 'Retinol 0.5% in Squalane',
      brand: 'The Ordinary',
      category: 'serum',
      status: 'open',
      statusText: 'פתוח - 12 חודשים',
      openDate: '20/11/2023',
      expiryStatus: 'valid',
      expiryText: 'נותרו 45 ימים',
    },
    {
      id: 4,
      emoji: '☀️',
      name: 'Anthelios SPF 50+',
      brand: 'La Roche-Posay',
      category: 'sunscreen',
      status: 'new',
      statusText: 'חדש',
      openDate: 'טרם נפתח',
      expiryStatus: 'valid',
      expiryText: '01/2026',
    },
  ];

  const filteredProducts = products.filter(product => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'expired') return product.status === 'expired';
    if (activeFilter === 'open') return product.status === 'open' || product.status === 'new';
    if (activeFilter === 'serum') return product.category === 'serum';
    if (activeFilter === 'moisturizer') return product.category === 'moisturizer';
    return true;
  });

  return (
    <div className="bg-background text-text font-body">
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 pt-8 pb-32">
        <section className="mb-xl">
          <div className="flex justify-between items-end mb-md">
            <div>
              <h2 className="font-h1 text-h1 text-primary">המדף שלי</h2>
              <p className="font-body-md text-secondary mt-xs">ניהול מלאי מוצרי הטיפוח שלך</p>
            </div>
            <div className="flex gap-4">
              <div className="text-center px-4 py-2 bg-surface-container-high rounded-xl">
                <span className="block font-h3 text-h3 text-primary">24</span>
                <span className="font-label-sm text-on-surface-variant uppercase tracking-wider">מוצרים</span>
              </div>
              <div className="text-center px-4 py-2 bg-error-container rounded-xl">
                <span className="block font-h3 text-h3 text-error">3</span>
                <span className="font-label-sm text-error uppercase tracking-wider">פגי תוקף</span>
              </div>
            </div>
          </div>
        </section>
        <section className="mb-xl">
          <div className="relative mb-lg">
            <input
              className="w-full bg-transparent border-b border-primary py-4 px-2 outline-none placeholder:text-outline text-body-lg"
              placeholder="חיפוש מוצר..."
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-primary">search</span>
          </div>
          <FilterChips filters={filters} activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        </section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {filteredProducts.map((product, index) => (
            <Link key={index} to={`/inventory/${product.id}`}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      </main>
      <button className="fixed bottom-28 left-6 w-16 h-16 bg-accent text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 z-40">
        <span className="material-symbols-outlined text-3xl">add</span>
      </button>
      <Footer />
    </div>
  );
};

export default InventoryPage;