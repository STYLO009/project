import React from "react";

const Anchortag = ({ label, href }) => {
  return (
    <div>
      <a href={href} className="hover:text-green-400 transition text-gray-300">
        {label}
      </a>
    </div>
  );
};

export default Anchortag;
