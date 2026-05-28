import React from 'react';

const AuthLayout = ({ children, title, subtitle }) => {
    return (
        <div className="min-h-screen bg-[#f8f9fa] flex flex-col items-center justify-center p-4 font-sans text-slate-800">
            {/* Logo Area */}
            <div className="w-full max-w-sm text-center mb-6 mt-4">
                <div className="flex items-center justify-center gap-2 mb-3">
                    {/* Water Drop Icon */}
                    <span className="material-symbols-outlined text-cyan-600 text-4xl" data-icon="water_drop">water_drop</span>
                    <h1 className="text-2xl font-bold text-[#002f34]">{title}</h1>
                </div>
                {subtitle && <p className="text-[13px] text-gray-600 leading-relaxed px-2">{subtitle}</p>}
            </div>

            {/* Main Auth Container */}
            <div className="w-full max-w-sm">
                <div className="bg-white border border-gray-200 rounded-md p-6 pb-8">
                    {children}
                </div>
            </div>

            {/* Bottom Features */}
            <div className="w-full max-w-sm mt-4 flex gap-2">
                <div className="flex-1 bg-gray-100 rounded-md p-3 flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[#4a7c82]" data-icon="eco">eco</span>
                    <span className="text-xs font-medium text-gray-500">Sostenible</span>
                </div>
                <div className="flex-1 bg-gray-100 rounded-md p-3 flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[#4a7c82]" data-icon="precision_manufacturing">precision_manufacturing</span>
                    <span className="text-xs font-medium text-gray-500">Precisión</span>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
