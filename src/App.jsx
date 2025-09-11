// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LanguageSelector from "./LanguageSelector";
import LandingPage from "./LandingPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LanguageSelector />} />
        <Route path="/home" element={<LandingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
