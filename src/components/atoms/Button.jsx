import { Link } from 'react-router-dom';

const Button = ({ text, type = "button", variant = "primary", className = "", onClick, to }) => {
    const baseStyles = "w-full font-bold py-4 rounded-md transition-all active:scale-[0.98] hover:scale-[1.02] shadow-lg flex items-center justify-center";

    const variants = {
        primary: "bg-[#003ec7] text-white shadow-[#003ec7]/20",
        secondary: "bg-[#a04100] text-white shadow-[#a04100]/20",
        outline: "bg-transparent border border-[#003ec7] text-[#003ec7] shadow-none hover:bg-[#003ec7]/5",
    };

    const combinedClasses = `${baseStyles} ${variants[variant]} ${className}`;

    if (to) {
        return (
            <Link to={to} className={combinedClasses} onClick={onClick}>
                {text}
            </Link>
        );
    }

    return (
        <button
            type={type}
            onClick={onClick}
            className={combinedClasses}
        >
            {text}
        </button>
    );
};

export default Button;
