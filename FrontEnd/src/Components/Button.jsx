import React from "react";

const Button = ({ children, className = "", type = "button", onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        w-full
        h-12
        bg-green-400            /* primary green accent */
        text-gray-900           /* dark text on green background */
        rounded-full
        shadow-lg
        font-bold
        mt-3
        text-sm
        hover:bg-green-500       /* slightly darker on hover */
        focus:ring-2 focus:ring-green-300 focus:outline-none
        transition-colors duration-200
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
