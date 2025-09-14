// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";
import LandingPage from "./LandingPage";
import HealthToaster from "./Components/Toaster"; // 👈 import your toaster

const App = () => {
  return (
    <Router>
      {/* ✅ Place your toaster at the root of the app */}
      <HealthToaster />

      <Routes>
        <Route path="/" element={<LanguageSelector />} />
        <Route path="/home" element={<LandingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
