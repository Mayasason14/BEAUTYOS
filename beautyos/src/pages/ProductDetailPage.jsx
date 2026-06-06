import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { supabase } from '../lib/supabase';

const CATEGORY_LABELS = {
  serum:        'סרום',
  moisturizer:  'לחות',
  cleanser:     'ניקוי',
  sunscreen:    'הגנה',
  toner:        'טונר',
  'eye-cream':  'קרם עיניים',
  mask:         'מסכה',
  oil:          'שמן',
};

const CATEGORY_ICONS = {
  serum:        'science',
  moisturizer:  'water_drop',
  cleanser:     'soap',
  sunscreen:    'wb_sunny',
  toner:        'opacity',
  'eye-cream':  'visibility',
  mask:         'spa',
  oil:          'eco',
};

const STATUS_LABELS = {
  open:    'פתוח',
  expired: 'פג תוקף',
  new:     'חדש',
  pending: 'טרם נפתח',
};

const STATUS_STYLES = {
  open:    { bg: '#E8F5E9', text: '#2E7D32', border: '#A5D6A7' },
  expired: { bg: '#FFEBEE', text: '#C62828', border: '#EF9A9A' },
  new:     { bg: '#E3F2FD', text: '#1565C0', border: '#90CAF9' },
  pending: { bg: '#F5EFE8', text: '#5C5751', border: '#E8E0D8' },
};

const formatDate = (dateStr) => {
  if (!dateStr) return null;
  return new Intl.DateTimeFormat('he-IL', {
    day: 'numeric', month: 'long', year: 'numeric',
  }).format(new Date(dateStr));
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading]   = useState(true);
  const [error,   setError]     = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError('');
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
      if (error || !data) {
        setError('המוצר לא נמצא. ייתכן שהוא נמחק או שאין לך הרשאה לצפות בו.');
      } else {
        setProduct(data);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  const statusStyle  = STATUS_STYLES[product?.status] ?? STATUS_STYLES.pending;
  const categoryIcon = CATEGORY_ICONS[product?.category] ?? 'inventory_2';

  return (
    <div className="bg-background text-text font-body min-h-screen">
      <Navbar />
      <main className="pt-24 pb-32 px-6 max-w-screen-md mx-auto">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-8 text-sm text-[#5C5751]">
          <Link to="/inventory" className="hover:text-[#2C2C2A] transition-colors">המדף</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_left</span>
          <span className="text-[#2C2C2A] font-semibold">
            {loading ? '...' : (product?.name ?? 'מוצר')}
          </span>
        </nav>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-24">
            <span className="material-symbols-outlined animate-spin text-primary text-4xl">progress_activity</span>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="text-center py-16 space-y-4">
            <span className="material-symbols-outlined text-5xl text-[#9C9691]">inventory_2</span>
            <p className="text-[#3D3A35]">{error}</p>
            <Link to="/inventory" className="inline-block mt-2 text-sm text-[#C9A882] hover:underline">
              חזרה למדף
            </Link>
          </div>
        )}

        {/* Product */}
        {!loading && !error && product && (
          <div className="space-y-6">

            {/* Hero card */}
            <section
              className="rounded-3xl p-8 flex flex-col items-center justify-center gap-4"
              style={{ background: 'linear-gradient(135deg, #F5EFE8 0%, #EDE6DE 100%)', minHeight: 220 }}
            >
              <span
                className="material-symbols-outlined text-[#C9A882]"
                style={{ fontSize: 80, fontVariationSettings: "'FILL' 1" }}
              >
                {categoryIcon}
              </span>
              {product.status && (
                <span
                  className="px-4 py-1.5 rounded-full text-sm font-medium border"
                  style={{
                    backgroundColor: statusStyle.bg,
                    color: statusStyle.text,
                    borderColor: statusStyle.border,
                  }}
                >
                  {STATUS_LABELS[product.status] ?? product.status}
                </span>
              )}
            </section>

            {/* Name & brand */}
            <section className="space-y-1">
              <h1 className="font-heading text-3xl text-[#2C2C2A]">{product.name}</h1>
              {product.brand && (
                <p className="text-base text-[#5C5751]">{product.brand}</p>
              )}
              {product.category && (
                <span className="inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium bg-[#F5EFE8] text-[#2C2C2A] border border-[#E8E0D8]">
                  {CATEGORY_LABELS[product.category] ?? product.category}
                </span>
              )}
            </section>

            {/* Details */}
            <section className="bg-white rounded-2xl border border-[#E8E0D8] overflow-hidden divide-y divide-[#E8E0D8]">
              {product.open_date && (
                <div className="flex justify-between items-center px-6 py-4">
                  <span className="text-sm text-[#5C5751] flex items-center gap-2">
                    <span className="material-symbols-outlined text-base text-[#C9A882]">calendar_today</span>
                    תאריך פתיחה
                  </span>
                  <span className="text-sm font-medium text-[#2C2C2A]">{formatDate(product.open_date)}</span>
                </div>
              )}
              {product.pao_months != null && (
                <div className="flex justify-between items-center px-6 py-4">
                  <span className="text-sm text-[#5C5751] flex items-center gap-2">
                    <span className="material-symbols-outlined text-base text-[#C9A882]">hourglass_bottom</span>
                    תקופת שימוש (PAO)
                  </span>
                  <span className="text-sm font-medium text-[#2C2C2A]">{product.pao_months} חודשים</span>
                </div>
              )}
              {product.status && (
                <div className="flex justify-between items-center px-6 py-4">
                  <span className="text-sm text-[#5C5751] flex items-center gap-2">
                    <span className="material-symbols-outlined text-base text-[#C9A882]">info</span>
                    סטטוס
                  </span>
                  <span
                    className="text-sm font-medium px-3 py-0.5 rounded-full border"
                    style={{
                      backgroundColor: statusStyle.bg,
                      color: statusStyle.text,
                      borderColor: statusStyle.border,
                    }}
                  >
                    {STATUS_LABELS[product.status] ?? product.status}
                  </span>
                </div>
              )}
              {product.category && (
                <div className="flex justify-between items-center px-6 py-4">
                  <span className="text-sm text-[#5C5751] flex items-center gap-2">
                    <span className="material-symbols-outlined text-base text-[#C9A882]">category</span>
                    קטגוריה
                  </span>
                  <span className="text-sm font-medium text-[#2C2C2A]">
                    {CATEGORY_LABELS[product.category] ?? product.category}
                  </span>
                </div>
              )}
            </section>

            {/* Actions */}
            <div className="flex flex-col gap-3 pt-2">
              <button className="bg-[#2C2C2A] text-white rounded-full py-4 px-8 font-medium hover:opacity-90 transition-all">
                הוסיפי לשגרה
              </button>
              <button className="bg-transparent border-2 border-[#2C2C2A] text-[#2C2C2A] rounded-full py-4 px-8 font-medium hover:bg-[#F5EFE8] transition-all">
                ערכי פרטים
              </button>
            </div>

          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
