import React from 'react';

const Divider = ({ text }) => {
    return (
        <div className="relative my-6 flex items-center justify-center">
            <div className="w-full border-t border-gray-200"></div>
            {text && (
                <span className="absolute bg-white px-2 text-xs font-medium text-gray-500">
                    {text}
                </span>
            )}
        </div>
    );
};

export default Divider;
