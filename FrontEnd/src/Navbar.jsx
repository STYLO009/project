import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./Images/Logo.png";
import Anchortag from "./Components/Anchortag";
import LoginModal from "./LoginModal"; // ✅ Import modal

export default function Navbar() {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false); // ✅ Modal state

  return (
    <>
      <nav className="w-full flex items-center justify-between px-6 py-4 bg-gradient-to-r from-gray-950 to-gray-900 border-b border-gray-800 sticky top-0 z-50">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/home")}
        >
          <img src={Logo} alt="Sanjeevani Logo" className="h-8 w-8" />
          <span className="text-xl font-bold text-green-400">Sanjeevani</span>
        </div>

        {/* Links (desktop only) */}
        <div className="hidden md:flex gap-6 px-6 py-2 rounded-full bg-gray-800/90 backdrop-blur-md border border-gray-700 shadow-lg">
          <Anchortag label="Home" />
          <Anchortag label="About" />
          <Anchortag label="Features" />
          <Anchortag label="Contact" />
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2">
          <a
            href="https://wa.me/919000000000?text=Hi%20I%20want%20to%20try%20the%20health%20chatbot"
            target="_blank"
            rel="noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-semibold shadow-md transition"
          >
            Try Chatbot
          </a>
          <button
            onClick={() => setShowLogin(true)} // ✅ Open modal
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-semibold shadow-md transition"
          >
            Login
          </button>
        </div>
      </nav>

      {/* ✅ Login Modal (conditionally rendered) */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
}
