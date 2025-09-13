// src/Components/Anchortag.jsx
import React from "react";

const Anchortag = ({ label, targetId }) => {
  const handleClick = () => {
    const section = document.getElementById(targetId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="text-gray-200 hover:text-green-400 font-semibold transition"
    >
      {label}
    </button>
  );
};

export default Anchortag;
