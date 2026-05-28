import React from 'react';

const RadioGroup = ({ name, options, selectedValue, onChange, activeBgColor = "#012d1d" }) => {
  if (!options || options.length === 0) {
    return <p className="text-sm text-[#717973] italic">Cargando opciones...</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <label key={opt.value} className="flex-grow min-w-[90px] max-w-[180px] relative group">
          <input
            className="hidden peer"
            name={name}
            type="radio"
            value={opt.value}
            checked={selectedValue === opt.value}
            onChange={(e) => onChange(e.target.value)}
          />
          <div
            className={`peer-checked:text-[#ffffff] bg-[#f8f9fa] border border-[#c1c8c2] p-2 rounded-lg text-center text-[14px] transition-all cursor-pointer hover:bg-[#e7e8e9]`}
            style={{ backgroundColor: selectedValue === opt.value ? activeBgColor : undefined }}
          >
            {opt.label}
          </div>
          {opt.imageUrl && (
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-50 hidden group-hover:block w-32 h-32 rounded-lg shadow-lg border border-[#c1c8c2] overflow-hidden bg-white animate-fade-in pointer-events-none">
              <img src={opt.imageUrl} alt={opt.label} className="w-full h-full object-cover" />
            </div>
          )}
        </label>
      ))}
    </div>
  );
};

export default RadioGroup;
