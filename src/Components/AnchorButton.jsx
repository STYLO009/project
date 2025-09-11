import React from "react";
import { useNavigate } from "react-router-dom";

const AnchorButton = ({ to, children, className = "" }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className={`
        text-sm
        text-green-400           /* matches theme accent */
        font-medium
        hover:text-green-300
        hover:underline
        transition-colors duration-200
        cursor-pointer
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default AnchorButton;
