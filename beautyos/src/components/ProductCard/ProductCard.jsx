import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white p-lg rounded-xl border border-secondary hover:shadow-lg transition-all">
      <div className="flex justify-between items-start mb-lg">
        <div className="w-12 h-12 bg-secondary-container flex items-center justify-center rounded-xl text-2xl">
          {product.emoji}
        </div>
        {product.status && (
          <span className={`px-3 py-1 rounded-full font-label-sm ${product.status === 'expired' ? 'bg-error-container text-error' : 'bg-surface-container-high text-on-surface-variant'}`}>
            {product.statusText}
          </span>
        )}
      </div>
      <h3 className="font-h3 text-h3 text-primary mb-xs">{product.name}</h3>
      <p className="font-body-md text-secondary mb-lg">{product.brand}</p>
      <div className="space-y-sm pt-md border-t border-surface-container">
        <div className="flex justify-between text-label-sm">
          <span className="text-outline">תאריך פתיחה:</span>
          <span className="text-on-surface">{product.openDate}</span>
        </div>
        <div className="flex justify-between text-label-sm">
          <span className="text-outline">תוקף:</span>
          <span className={`font-medium ${product.expiryStatus === 'expired' ? 'text-error' : 'text-on-surface'}`}>
            {product.expiryText}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;