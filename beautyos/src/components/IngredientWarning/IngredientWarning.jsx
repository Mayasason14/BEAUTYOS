import React from 'react';

const IngredientWarning = ({ warning }) => {
  return (
    <div className="bg-error-container border border-error/10 p-6 rounded-3xl space-y-4">
      <div className="flex items-center gap-3 text-error">
        <span className="material-symbols-outlined">warning</span>
        <h4 className="font-bold font-body-lg">התראת רכיבים</h4>
      </div>
      <p className="text-body-md text-on-surface-variant">{warning.message}</p>
      <button className="text-error font-button border-b border-error/30">קראי עוד על שילובים</button>
    </div>
  );
};

export default IngredientWarning;