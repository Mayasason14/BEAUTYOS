import React from 'react';

const statusStyle = {
  completed:   { bg: '#E8F5E9', text: '#2E7D32' },
  'in-progress': { bg: '#FFF3E0', text: '#E65100' },
  pending:     { bg: '#F5EFE8', text: '#5C5751' },
};

const RoutineStepCard = ({ step, onActionClick }) => {
  const badge = statusStyle[step.status] ?? statusStyle.pending;
  const isInProgress = step.status === 'in-progress';

  return (
    <div className="bg-white border border-[#E8E0D8] p-5 rounded-2xl flex items-center justify-between">
      <div className="flex items-center gap-5">
        <div className="w-14 h-14 bg-[#F5EFE8] rounded-xl flex items-center justify-center text-[#2C2C2A]">
          <span className="material-symbols-outlined text-3xl">{step.icon}</span>
        </div>
        <div>
          <h4 className="text-base font-bold text-[#2C2C2A]">{step.title}</h4>
          <p className="text-sm text-[#5C5751]">{step.product}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span
          className="px-3 py-1 rounded-full text-xs font-medium"
          style={{ backgroundColor: badge.bg, color: badge.text }}
        >
          {step.statusText}
        </span>

        {step.action && (
          <button
            onClick={onActionClick}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              isInProgress
                ? 'bg-[#2C2C2A] text-white hover:opacity-90'
                : 'border border-[#2C2C2A] text-[#2C2C2A] hover:bg-[#F5EFE8]'
            }`}
          >
            {step.action}
          </button>
        )}

        {step.status === 'completed' && (
          <span
            className="material-symbols-outlined text-[#C9A882]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            check_circle
          </span>
        )}
      </div>
    </div>
  );
};

export default RoutineStepCard;
