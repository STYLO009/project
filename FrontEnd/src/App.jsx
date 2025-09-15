// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom"; // ✅ no BrowserRouter here
import LanguageSelector from "./LanguageSelector";
import LandingPage from "./LandingPage";
import HealthToaster from "./Components/Toaster"; // 👈 import your toaster

const App = () => {
  return (
    <>
      {/* ✅ Place your toaster at the root of the app */}
      <HealthToaster />

      <Routes>
        <Route path="/" element={<LanguageSelector />} />
        <Route path="/home" element={<LandingPage />} />
      </Routes>
    </>
  );
};

export default App;
