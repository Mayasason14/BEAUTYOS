import React from 'react';

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

const STATUS_CONFIG = {
  open:    { label: 'פתוח',     bg: '#E8F5E9', text: '#2E7D32', border: '#A5D6A7' },
  expired: { label: 'פג תוקף', bg: '#FFEBEE', text: '#C62828', border: '#EF9A9A' },
  new:     { label: 'חדש',      bg: '#E3F2FD', text: '#1565C0', border: '#90CAF9' },
  pending: { label: 'טרם נפתח', bg: '#F5EFE8', text: '#5C5751', border: '#E8E0D8' },
};

const formatDate = (dateStr) => {
  if (!dateStr) return null;
  return new Intl.DateTimeFormat('he-IL', { day: 'numeric', month: 'long' }).format(new Date(dateStr));
};

const ProductCard = ({ product }) => {
  const icon   = CATEGORY_ICONS[product.category]  ?? 'inventory_2';
  const catLabel = CATEGORY_LABELS[product.category] ?? product.category ?? '';
  const status = STATUS_CONFIG[product.status] ?? STATUS_CONFIG.pending;

  return (
    <div className="bg-white p-5 rounded-2xl border border-[#E8E0D8] hover:shadow-md hover:border-[#C9A882] transition-all h-full flex flex-col">
      {/* Header row */}
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 bg-[#F5EFE8] flex items-center justify-center rounded-xl text-[#C9A882]">
          <span className="material-symbols-outlined text-2xl">{icon}</span>
        </div>
        {product.status && (
          <span
            className="px-3 py-1 rounded-full text-xs font-medium border"
            style={{ backgroundColor: status.bg, color: status.text, borderColor: status.border }}
          >
            {status.label}
          </span>
        )}
      </div>

      {/* Name & brand */}
      <h3 className="text-base font-bold text-[#2C2C2A] leading-snug">{product.name}</h3>
      {product.brand && (
        <p className="text-sm text-[#5C5751] mt-0.5">{product.brand}</p>
      )}

      {/* Category chip */}
      {catLabel && (
        <span className="mt-2 inline-block px-2 py-0.5 rounded-full text-xs bg-[#F5EFE8] text-[#3D3A35] border border-[#E8E0D8] self-start">
          {catLabel}
        </span>
      )}

      {/* Details */}
      <div className="mt-auto pt-4 border-t border-[#E8E0D8] space-y-1.5">
        {product.open_date && (
          <div className="flex justify-between text-xs">
            <span className="text-[#5C5751]">תאריך פתיחה:</span>
            <span className="text-[#2C2C2A] font-medium">{formatDate(product.open_date)}</span>
          </div>
        )}
        {product.pao_months != null && (
          <div className="flex justify-between text-xs">
            <span className="text-[#5C5751]">תקופת שימוש:</span>
            <span className="text-[#2C2C2A] font-medium">{product.pao_months} חודשים</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
