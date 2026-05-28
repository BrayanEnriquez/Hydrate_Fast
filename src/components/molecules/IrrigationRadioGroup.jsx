import React from 'react';

const IrrigationRadioGroup = ({ name, options, selectedValue, onChange }) => {
  if (!options || options.length === 0) {
    return <p className="text-sm text-[#717973] italic">Cargando opciones...</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {options.map(opt => (
        <label key={opt.value} className="relative flex items-center p-4 border border-[#c1c8c2] rounded-lg cursor-pointer hover:bg-[#e7e8e9] transition-all">
          <input
            className="w-4 h-4 text-[#012d1d] focus:ring-[#012d1d]"
            name={name}
            type="radio"
            value={opt.value}
            checked={selectedValue === opt.value}
            onChange={(e) => onChange(e.target.value)}
          />
          <div className="ml-3 flex flex-col">
            <span className="text-[16px] font-semibold capitalize" style={{ fontFamily: "'Inter', sans-serif" }}>{opt.label}</span>
            <span className="text-xs text-[#414844] italic">{opt.description}</span>
          </div>
          <span className="material-symbols-outlined ml-auto text-[#012d1d]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>
            {opt.icon}
          </span>
        </label>
      ))}
    </div>
  );
};

export default IrrigationRadioGroup;
