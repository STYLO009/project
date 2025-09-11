import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const indianLanguages = [
  { value: "assamese", label: "অসমীয়া (Assamese)" },
  { value: "bengali", label: "বাংলা (Bengali)" },
  { value: "bodo", label: "बर' (Bodo)" },
  { value: "dogri", label: "डोगरी (Dogri)" },
  { value: "english", label: "English" },
  { value: "gujarati", label: "ગુજરાતી (Gujarati)" },
  { value: "hindi", label: "हिन्दी (Hindi)" },
  { value: "kannada", label: "ಕನ್ನಡ (Kannada)" },
  { value: "kashmiri", label: "कॉशुर (Kashmiri)" },
  { value: "konkani", label: "कोंकणी (Konkani)" },
  { value: "maithili", label: "मैथिली (Maithili)" },
  { value: "malayalam", label: "മലയാളം (Malayalam)" },
  { value: "manipuri", label: "মৈতৈলোন্ (Manipuri/Meitei)" },
  { value: "marathi", label: "मराठी (Marathi)" },
  { value: "nepali", label: "नेपाली (Nepali)" },
  { value: "odia", label: "ଓଡ଼ିଆ (Odia)" },
  { value: "punjabi", label: "ਪੰਜਾਬੀ (Punjabi)" },
  { value: "sanskrit", label: "संस्कृतम् (Sanskrit)" },
  { value: "santali", label: "ᱥᱟᱱᱛᱟᱲᱤ (Santali)" },
  { value: "sindhi", label: "सिन्धी (Sindhi)" },
  { value: "tamil", label: "தமிழ் (Tamil)" },
  { value: "telugu", label: "తెలుగు (Telugu)" },
  { value: "urdu", label: "اردو (Urdu)" },
];

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const navigate = useNavigate();

  const handleChange = (value) => {
    setSelectedLanguage(value);
    setTimeout(() => navigate("/login"), 500);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
      <div className="bg-white/50 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8 w-96 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          🌐 Select Your Language
        </h2>

        <div className="max-h-72 overflow-y-scroll w-full">
          {indianLanguages.map((lang) => (
            <label
              key={lang.value}
              className="flex items-center justify-between p-3 mb-2 cursor-pointer rounded-xl hover:bg-[#424242] hover:text-white transition duration-200"
              onClick={() => handleChange(lang.value)}
            >
              <span className="font-medium">{lang.label}</span>

              <span
                className={`w-6 h-6 border-2 rounded-full flex-shrink-0 transition-all duration-300 ${
                  selectedLanguage === lang.value
                    ? "bg-black border-white"
                    : "border-gray-300"
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
          <div className="mt-6 px-4 py-2 bg-[#424242] text-white rounded-full shadow-lg text-center w-full">
            You selected:{" "}
            {indianLanguages.find((l) => l.value === selectedLanguage)?.label}
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageSelector;
