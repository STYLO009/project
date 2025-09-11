// src/ResetPassword.jsx
import React, { useState, useEffect } from "react";
import InputField from "./InputField"; // Import your InputField component
import Button from "./Button"; // Assuming you have a Button component
import { useNavigate, useLocation } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const emailOrPhone = location.state?.emailOrPhone;

  // Prevent skipping OTP
  useEffect(() => {
    if (!emailOrPhone) {
      alert("Please verify OTP first.");
      navigate("/forgot-password");
    }
  }, [emailOrPhone, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      alert("Please fill both fields");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    alert(`Password reset successful for ${emailOrPhone}`);
    navigate("/login");
  };

  if (!emailOrPhone) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a]">
      <div className="bg-white/50 backdrop-blur-xl border border-white/20 rounded-3xl p-8 w-96 flex flex-col items-center shadow-2xl">
        {/* Title */}
        <h1 className="text-2xl font-semibold text-black mb-2 tracking-tight">
          Reset Password
        </h1>
        <p className="text-gray-800 text-sm font-medium mb-6 text-center">
          Enter a new password to secure your account
        </p>

        <form
          className="w-full flex flex-col space-y-1"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col">
            <label className="text-black text-xs font-medium mb-1">
              New Password
            </label>
            <InputField
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-black text-xs font-medium mb-1">
              Confirm Password
            </label>
            <InputField
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <Button type="submit">Reset Password</Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
