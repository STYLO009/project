import React from "react";

const Button = ({ children, className = "", type = "button", onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full h-10 bg-[#424242] text-white rounded-full shadow-lg hover:opacity-90 transition-opacity font-bold mt-2 text-sm  ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
