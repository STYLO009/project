import React from "react";
import { useNavigate } from "react-router-dom";

const AnchorButton = ({ to, children, className = "" }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className={`text-xs text-indigo-600 hover:text-indigo-500 underline font-medium cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
};

export default AnchorButton;
