import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const indianLanguages = [
  { value: "assamese", label: "অসমীয়া (Assamese)" },
  { value: "bengali", label: "বাংলা (Bengali)" },
  { value: "english", label: "English" },
  { value: "hindi", label: "हिन्दी (Hindi)" },
  { value: "marathi", label: "मराठी (Marathi)" },
  { value: "tamil", label: "தமிழ் (Tamil)" },
  { value: "telugu", label: "తెలుగు (Telugu)" },
  { value: "urdu", label: "اردو (Urdu)" },
];

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const navigate = useNavigate();

  const handleChange = (value) => {
    setSelectedLanguage(value);
    setTimeout(() => navigate("/home"), 500); // redirect to landing page
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 flex items-center justify-center px-4">
      <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700 shadow-2xl rounded-3xl p-8 w-full max-w-md flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-6 text-green-400 text-center">
          🌐 Select Your Language
        </h2>

        <div className="max-h-72 overflow-y-scroll w-full scrollbar-hide">
          {indianLanguages.map((lang) => (
            <label
              key={lang.value}
              className={`flex items-center justify-between p-3 mb-2 cursor-pointer rounded-xl transition duration-200 ${
                selectedLanguage === lang.value
                  ? "bg-green-500/20 text-green-400"
                  : "hover:bg-gray-700/50 text-gray-200 hover:text-green-400"
              }`}
              onClick={() => handleChange(lang.value)}
            >
              <span className="font-medium">{lang.label}</span>

              <span
                className={`w-6 h-6 border-2 rounded-full flex-shrink-0 transition-all duration-300 ${
                  selectedLanguage === lang.value
                    ? "bg-green-400 border-green-400"
                    : "border-gray-400"
                }`}
              ></span>

              <input
                type="radio"
                name="language"
                value={lang.value}
                checked={selectedLanguage === lang.value}
                onChange={(e) => handleChange(e.target.value)}
                className="hidden"
              />
            </label>
          ))}
        </div>

        {selectedLanguage && (
          <div className="mt-6 px-4 py-2 bg-gray-700/40 text-green-400 rounded-full shadow-lg text-center w-full font-medium">
            You selected:{" "}
            {indianLanguages.find((l) => l.value === selectedLanguage)?.label}
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageSelector;
