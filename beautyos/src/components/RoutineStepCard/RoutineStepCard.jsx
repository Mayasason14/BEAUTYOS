import React from 'react';

const RoutineStepCard = ({ step, onActionClick }) => {
  return (
    <div className="bg-surface-container-lowest border border-secondary p-5 rounded-2xl flex items-center justify-between">
      <div className="flex items-center gap-5">
        <div className="w-14 h-14 bg-secondary-container rounded-xl flex items-center justify-center text-primary">
          <span className="material-symbols-outlined text-3xl">{step.icon}</span>
        </div>
        <div>
          <h4 className="font-body-lg font-bold">{step.title}</h4>
          <p className="text-label-sm text-secondary">{step.product}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className={`px-3 py-1 rounded-full font-label-sm ${step.status === 'completed' ? 'bg-surface-container-high text-secondary' : step.status === 'in-progress' ? 'bg-secondary-fixed text-on-secondary-container' : 'bg-surface-container text-outline'}`}>
          {step.statusText}
        </span>
        {step.action && (
          <button className={`px-6 py-2 rounded-full font-button ${step.status === 'in-progress' ? 'bg-primary text-on-primary hover:bg-primary/90' : 'border border-primary text-primary hover:bg-surface-container'}`} onClick={onActionClick}>
            {step.action}
          </button>
        )}
        {step.status === 'completed' && (
          <span className="material-symbols-outlined text-on-surface-variant" style={{ fontVariationSettings: "'FILL' 1" }}>
            check_circle
          </span>
        )}
      </div>
    </div>
  );
};

export default RoutineStepCard;