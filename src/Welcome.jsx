import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "./Button";

const WelcomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get username from state passed after Sign Up
  const username = location.state?.username || "User";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a]">
      <div className="bg-white/50 backdrop-blur-xl border border-white/20  rounded-3xl p-8 w-96 flex flex-col items-center shadow-2xl text-center">
        {/* Greeting */}
        <h1 className="text-3xl font-bold text-black mb-4">
          Welcome, {username}!
        </h1>

        {/* Confirmation message */}
        <p className="text-gray-800 mb-6">
          Your account has been successfully created.
        </p>

        {/* Optional info / instructions */}
        <p className="text-black mb-6 font-semibold">
          Click below to complete your profile and start using the AI health
          assistant.
        </p>

        {/* Continue button */}
        <Button
          className="cursor-pointer w-full"
          onClick={() => navigate("/create-profile", { state: { username } })}
        >
          Complete Profile
        </Button>
      </div>
    </div>
  );
};

export default WelcomePage;
