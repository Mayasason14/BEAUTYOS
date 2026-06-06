import React from 'react';

const IngredientWarning = ({ warning }) => {
  return (
    <div className="bg-[#FFEBEE] border border-[#EF9A9A] p-6 rounded-3xl space-y-4">
      <div className="flex items-center gap-3 text-error">
        <span className="material-symbols-outlined">warning</span>
        <h4 className="font-bold text-base">התראת רכיבים</h4>
      </div>
      <p className="text-sm text-[#3D3A35]">{warning.message}</p>
      <button className="text-error font-medium border-b border-error/40 text-sm">
        קראי עוד על שילובים
      </button>
    </div>
  );
};

export default IngredientWarning;
