import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import ProductCard from '../components/ProductCard/ProductCard';
import FilterChips from '../components/FilterChips/FilterChips';
import { supabase } from '../lib/supabase';

const CATEGORIES = [
  { value: 'serum',      label: 'סרום' },
  { value: 'moisturizer',label: 'לחות' },
  { value: 'cleanser',   label: 'ניקוי' },
  { value: 'sunscreen',  label: 'הגנה' },
  { value: 'toner',      label: 'טונר' },
  { value: 'eye-cream',  label: 'קרם עיניים' },
  { value: 'mask',       label: 'מסכה' },
  { value: 'oil',        label: 'שמן' },
];

const PAO_OPTIONS = [3, 6, 9, 12, 18, 24, 36]; // months

const AddProductModal = ({ onClose, onSaved }) => {
  const [name,      setName]      = useState('');
  const [brand,     setBrand]     = useState('');
  const [category,  setCategory]  = useState('');
  const [openDate,  setOpenDate]  = useState('');
  const [paoMonths, setPaoMonths] = useState(null); // stored as number
  const [saving,    setSaving]    = useState(false);
  const [saveError, setSaveError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveError('');
    setSaving(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setSaving(false); return; }

    const { error } = await supabase.from('products').insert({
      user_id:    user.id,
      name,
      brand:      brand      || null,
      category:   category   || null,
      open_date:  openDate   || null,
      pao_months: paoMonths ?? null,
    });

    setSaving(false);

    if (error) {
      setSaveError('שגיאה בהוספת המוצר. אנא נסי שוב.');
    } else {
      onSaved();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-xl text-[#2C2C2A]">הוספת מוצר חדש</h2>
          <button
            onClick={onClose}
            className="material-symbols-outlined text-[#5C5751] hover:text-[#2C2C2A] transition-colors"
          >
            close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-[#3D3A35] mb-1">שם המוצר *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="לדוגמה: Hyaluronic Acid 2%"
              className="w-full bg-transparent border-b-2 border-[#C9A882] py-2 outline-none text-[#1c1b1b] placeholder:text-[#9C9691] text-base"
            />
          </div>

          {/* Brand */}
          <div>
            <label className="block text-sm font-medium text-[#3D3A35] mb-1">מותג</label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="לדוגמה: The Ordinary"
              className="w-full bg-transparent border-b-2 border-[#C9A882] py-2 outline-none text-[#1c1b1b] placeholder:text-[#9C9691] text-base"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-[#3D3A35] mb-2">קטגוריה</label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(c => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setCategory(c.value)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                    category === c.value
                      ? 'bg-[#2C2C2A] text-white border-[#2C2C2A]'
                      : 'bg-[#F5EFE8] text-[#2C2C2A] border-[#E8E0D8] hover:border-[#2C2C2A]'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Open date */}
          <div>
            <label className="block text-sm font-medium text-[#3D3A35] mb-1">תאריך פתיחה</label>
            <input
              type="date"
              value={openDate}
              onChange={(e) => setOpenDate(e.target.value)}
              className="w-full bg-[#F5EFE8] border-2 border-[#E8E0D8] rounded-xl px-3 py-2.5 outline-none text-[#1c1b1b] focus:border-[#C9A882] transition-colors cursor-pointer text-base"
            />
          </div>

          {/* PAO */}
          <div>
            <label className="block text-sm font-medium text-[#3D3A35] mb-2">
              תקופה לאחר פתיחה (PAO)
            </label>
            <div className="flex flex-wrap gap-2">
              {PAO_OPTIONS.map(m => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setPaoMonths(m)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                    paoMonths === m
                      ? 'bg-[#2C2C2A] text-white border-[#2C2C2A]'
                      : 'bg-[#F5EFE8] text-[#2C2C2A] border-[#E8E0D8] hover:border-[#2C2C2A]'
                  }`}
                >
                  {m}M
                </button>
              ))}
            </div>
          </div>

          {saveError && <p className="text-sm text-red-500">{saveError}</p>}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-[#2C2C2A] text-white rounded-full py-3 font-medium hover:opacity-90 transition-all disabled:opacity-60"
            >
              {saving ? 'שומר...' : 'הוספת מוצר'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border-2 border-[#2C2C2A] text-[#2C2C2A] rounded-full py-3 font-medium hover:bg-[#F5EFE8] transition-all"
            >
              ביטול
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const InventoryPage = () => {
  const [searchTerm,   setSearchTerm]   = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [products,     setProducts]     = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState('');
  const [modalOpen,    setModalOpen]    = useState(false);

  const filters = [
    { key: 'all',         label: 'הכל' },
    { key: 'open',        label: 'פתוחים' },
    { key: 'expired',     label: 'פגי תוקף' },
    { key: 'serum',       label: 'סרום' },
    { key: 'moisturizer', label: 'לחות' },
  ];

  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setLoading(false); return; }
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('user_id', user.id);
    if (error) {
      setError('אירעה שגיאה בטעינת המוצרים. אנא נסי שוב.');
    } else {
      setProducts(data);
    }
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleSaved = () => {
    setModalOpen(false);
    fetchProducts();
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = !searchTerm
      || product.name?.toLowerCase().includes(searchTerm.toLowerCase())
      || product.brand?.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;
    if (activeFilter === 'all')         return true;
    if (activeFilter === 'expired')     return product.status === 'expired';
    if (activeFilter === 'open')        return product.status === 'open' || product.status === 'new';
    if (activeFilter === 'serum')       return product.category === 'serum';
    if (activeFilter === 'moisturizer') return product.category === 'moisturizer';
    return true;
  });

  const expiredCount = products.filter(p => p.status === 'expired').length;

  return (
    <div className="bg-background text-text font-body">
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 pt-8 pb-32">
        <section className="mb-8">
          <div className="flex justify-between items-end mb-4">
            <div>
              <h2 className="text-3xl font-bold text-[#2C2C2A]">המדף שלי</h2>
              <p className="text-base text-[#5C5751] mt-1">ניהול מלאי מוצרי הטיפוח שלך</p>
            </div>
            <div className="flex gap-4">
              <div className="text-center px-4 py-2 bg-[#F5EFE8] rounded-xl border border-[#E8E0D8]">
                <span className="block text-2xl font-bold text-[#2C2C2A]">{products.length}</span>
                <span className="text-xs font-medium text-[#5C5751] uppercase tracking-wider">מוצרים</span>
              </div>
              <div className="text-center px-4 py-2 bg-[#FFEBEE] rounded-xl border border-[#EF9A9A]">
                <span className="block text-2xl font-bold text-error">{expiredCount}</span>
                <span className="text-xs font-medium text-error uppercase tracking-wider">פגי תוקף</span>
              </div>
            </div>
          </div>
        </section>
        <section className="mb-8">
          <div className="relative mb-6">
            <input
              className="w-full bg-transparent border-b border-primary py-4 px-2 outline-none placeholder:text-[#9C9691] text-[#1c1b1b] text-base"
              placeholder="חיפוש מוצר..."
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-primary">search</span>
          </div>
          <FilterChips filters={filters} activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        </section>
        {loading && (
          <div className="flex justify-center py-12">
            <span className="material-symbols-outlined animate-spin text-primary text-4xl">progress_activity</span>
          </div>
        )}
        {error && (
          <p className="text-center text-red-500 py-12">{error}</p>
        )}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`}>
                <ProductCard product={product} />
              </Link>
            ))}
            {filteredProducts.length === 0 && (
              <p className="col-span-full text-center text-[#5C5751] py-12">לא נמצאו מוצרים</p>
            )}
          </div>
        )}
      </main>

      {/* FAB */}
      <button
        onClick={() => setModalOpen(true)}
        className="fixed bottom-28 left-6 w-16 h-16 bg-accent text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform z-40"
      >
        <span className="material-symbols-outlined text-3xl">add</span>
      </button>

      {modalOpen && (
        <AddProductModal
          onClose={() => setModalOpen(false)}
          onSaved={handleSaved}
        />
      )}

      <Footer />
    </div>
  );
};

export default InventoryPage;
