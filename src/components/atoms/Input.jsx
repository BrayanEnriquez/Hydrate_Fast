import React from 'react';

const Input = ({ label, type, placeholder, value, onChange, required, icon, rightElement }) => {
    return (
        <div className="mb-4">
            {label && (
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                    {label}
                </label>
            )}
            <div className="relative flex items-center">
                {icon && (
                    <div className="absolute left-3 text-gray-400">
                        {icon}
                    </div>
                )}
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className={`w-full border border-gray-300 rounded-md py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#04281a] focus:ring-1 focus:ring-[#04281a] transition-colors ${icon ? 'pl-9' : 'pl-3'} ${rightElement ? 'pr-9' : 'pr-3'}`}
                    required={required}
                />
                {rightElement && (
                    <div className="absolute right-3 text-gray-400">
                        {rightElement}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Input;
