import React from "react";

const Card = ({ textTop, textBottom }) => {
  return (
    <div
      className="
        flex flex-col items-center justify-center
        w-40 h-32 rounded-2xl
        bg-gray-900/50 border border-gray-700
        text-gray-100 text-center
        shadow-lg shadow-gray-900/40
        hover:scale-105 hover:border-green-400 hover:shadow-green-400/30
        transition-all duration-300
      "
    >
      <p className="text-xl font-bold text-green-400">{textTop}</p>
      <p className="text-sm text-gray-300">{textBottom}</p>
    </div>
  );
};

export default Card;
