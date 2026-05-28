import React from 'react';

const Select = ({ label, value, onChange, options, placeholder, required = false, className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <label className="block text-[12px] font-semibold tracking-[0.05em] text-[#012d1d] mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
        {label}
      </label>
      <select
        required={required}
        value={value}
        onChange={onChange}
        className="w-full bg-[#f8f9fa] border border-[#c1c8c2] rounded-lg px-4 py-2 focus:border-[#012d1d] focus:ring-1 focus:ring-[#012d1d] outline-none transition-all appearance-none text-[16px]"
      >
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options.map((opt, i) => (
          <option key={i} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <span className="material-symbols-outlined absolute right-2 bottom-2 text-[#414844] pointer-events-none" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>
        expand_more
      </span>
    </div>
  );
};

export default Select;
