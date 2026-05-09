import React from 'react';

const FilterChips = ({ filters, activeFilter, onFilterChange }) => {
  return (
    <div className="flex flex-wrap gap-sm">
      {filters.map((filter) => (
        <button
          key={filter.key}
          className={`px-6 py-2 rounded-full font-button ${
            activeFilter === filter.key
              ? 'bg-primary text-on-primary'
              : 'border border-outline text-on-surface-variant hover:bg-surface-container-low'
          }`}
          onClick={() => onFilterChange(filter.key)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default FilterChips;