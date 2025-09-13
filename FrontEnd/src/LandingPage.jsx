// src/LandingPage.jsx
import React, { useState } from "react";
import Navbar from "./Navbar";
import Logo from "./Images/Logo.png";
import LoginModal from "./LoginModal";
import Card from "./Components/card";

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="relative min-h-screen font-sans">
      {/* Full Smooth Dark Gradient Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 transition-all duration-300 ${
          showLogin ? "blur-sm" : ""
        }`}
      ></div>

      {/* Optional subtle overlay for extra depth */}
      <div className="absolute inset-0 bg-black/10"></div>

      {/* Main content */}
      <div className="relative z-10">
        <Navbar />

        {/* Hero Section */}
        {/* Hero Section */}
        <section
          id="home"
          className="flex flex-col md:flex-row items-center justify-center gap-10 px-6 py-20 max-w-6xl mx-auto text-gray-200 min-h-[70vh]"
        >
          {/* Logo */}
          <div className="flex justify-center items-center w-full md:w-1/2">
            <img
              src={Logo}
              alt="Slogan"
              className="max-w-[150px] sm:max-w-[180px] md:max-w-[220px] lg:max-w-[250px] w-full h-auto"
            />
          </div>

          {/* Hero Text */}
          <div className="flex flex-col justify-center items-center text-center w-full md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-semibold text-green-400 mb-6">
              Welcome to Sanjeevani
            </h1>
            <p className="text-lg md:text-xl max-w-xl mb-6">
              <span className="font-semibold">
                AI-Driven Multilingual Public Health Chatbot
              </span>
              . Provides{" "}
              <span className="font-semibold">
                preventive healthcare education
              </span>
              ,<span className="font-semibold">disease symptoms info</span>, and
              <span className="font-semibold">vaccination schedules</span>{" "}
              instantly, securely, and in your language.
            </p>
          </div>
        </section>

        {/* Card Section */}
        <section className="flex justify-center gap-6 p-6 text-gray-200">
          <Card textTop="24x7" textBottom="Available" />
          <Card textTop="80%+" textBottom="Accuracy" />
          <Card textTop="Multilingual" textBottom="Chatbot" />
          <Card textTop="Real-time" textBottom="Alerts" />
          <Card textTop="Accessible via" textBottom="WhatsApp/SMS" />
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 text-gray-200"
        >
          <div className="border border-gray-700 rounded-3xl p-4 sm:p-6 md:p-8 bg-black/20 backdrop-blur-md shadow-lg">
            <h2 className="text-2xl sm:text-3xl font-semibold text-center text-green-400 mb-6 sm:mb-8">
              Features
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {/* Left Text Area */}
              <div className="border border-gray-600 rounded-2xl p-4 sm:p-6 text-gray-300 text-center md:text-left bg-gray-900/20">
                <h3 className="text-lg sm:text-xl font-semibold mb-3">
                  Why Choose Us?
                </h3>
                <p className="text-sm sm:text-base leading-relaxed">
                  Our{" "}
                  <span className="font-semibold">
                    AI-driven multilingual chatbot
                  </span>{" "}
                  educates users on{" "}
                  <span className="font-semibold">preventive healthcare</span>,
                  provides{" "}
                  <span className="font-semibold">
                    disease symptom information
                  </span>
                  , and shares{" "}
                  <span className="font-semibold">vaccination schedules</span>.
                  Integrated with{" "}
                  <span className="font-semibold">
                    government health databases
                  </span>{" "}
                  for <span className="font-semibold">real-time alerts</span>{" "}
                  and reliable, secure information.
                </p>
              </div>

              {/* Right Video Area */}
              <div className="border border-gray-600 rounded-2xl p-3 sm:p-6 md:col-span-2 bg-gray-900/20 flex justify-center items-center">
                <div className="w-full aspect-video bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 text-sm sm:text-base">
                  Video area (Demo coming soon)
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="w-full text-gray-200 py-16 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-semibold text-green-400 mb-4">
              About Sanjeevani
            </h2>
            <p className="text-lg leading-relaxed">
              <span className="font-semibold">Sanjeevani</span> is a{" "}
              <span className="font-semibold">
                multilingual AI public health chatbot
              </span>{" "}
              for{" "}
              <span className="font-semibold">
                rural and semi-urban populations
              </span>
              . Provides{" "}
              <span className="font-semibold">
                instant, accurate health information
              </span>
              , helps users{" "}
              <span className="font-semibold">understand symptoms</span>, and
              connects them with professionals faster. Our mission:{" "}
              <span className="font-semibold">increase awareness by 20%</span>{" "}
              and make healthcare{" "}
              <span className="font-semibold">
                accessible, reliable, and easy to understand
              </span>{" "}
              for everyone.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full text-gray-200 py-16 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-semibold text-green-400 mb-6">
              Contact Us
            </h2>
            <p className="mb-8">
              Have questions, suggestions, or feedback? Reach out for{" "}
              <span className="font-semibold">community support</span> and{" "}
              <span className="font-semibold">healthcare guidance</span>.
            </p>

            <div className="flex justify-center gap-4 flex-wrap">
              <a
                href="mailto:sanjeevani.project@example.com"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-semibold shadow-md transition"
              >
                Email Us
              </a>
              <a
                href="#"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-semibold shadow-md transition cursor-not-allowed opacity-70"
              >
                WhatsApp (Coming Soon)
              </a>
              <a
                href="#"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-semibold shadow-md transition cursor-not-allowed opacity-70"
              >
                LinkedIn (Coming Soon)
              </a>
            </div>
          </div>
        </section>

        {/* Modal on top */}
        {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      </div>
    </div>
  );
};

export default LandingPage;
