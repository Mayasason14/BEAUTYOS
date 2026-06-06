import React from 'react';

const FilterChips = ({ filters, activeFilter, onFilterChange }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={`px-5 py-2 rounded-full text-sm font-medium border transition-all ${
            activeFilter === filter.key
              ? 'bg-[#2C2C2A] text-white border-[#2C2C2A]'
              : 'bg-[#F5EFE8] text-[#3D3A35] border-[#E8E0D8] hover:border-[#C9A882]'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default FilterChips;
