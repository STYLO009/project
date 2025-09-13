// src/LandingPage.jsx
import React, { useState } from "react";
import Navbar from "./Navbar";
import Logo from "./Images/Logo.png";
import LoginModal from "./LoginModal";

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="relative min-h-screen">
      {/* This is the background content */}
      <div
        className={`min-h-screen bg-gradient-to-r from-gray-950 to-gray-900 transition-all duration-300 ${
          showLogin ? "blur-sm" : ""
        }`}
      >
        <Navbar />

        <section
          className="
            flex flex-col md:flex-row
            items-center justify-center gap-10
            px-6 py-20
            max-w-6xl mx-auto
          "
        >
          {/* Logo */}
          <div className="flex justify-center w-full md:w-1/2">
            <img
              src={Logo}
              alt="Slogan"
              className="
                max-w-[150px] sm:max-w-[180px]
                md:max-w-[220px] lg:max-w-[250px]
                w-full h-auto
              "
            />
          </div>

          {/* Text */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left text-gray-200 w-full md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold text-green-400 mb-6 text-center">
              Welcome to Sanjeevani
            </h1>
            <p className="text-lg md:text-xl max-w-xl text-center mb-6">
              Your AI-Driven Public Health Chatbot. Get health information
              instantly, securely, and in your language.
            </p>

            {/* New Login Button */}
            <button
              onClick={() => setShowLogin(true)}
              className="bg-green-400 text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-green-500 transition-colors"
            >
              Login / Sign In
            </button>
          </div>
        </section>
      </div>

      {/* Modal on top */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </div>
  );
};

export default LandingPage;
