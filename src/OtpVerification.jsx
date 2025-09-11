// src/OtpVerification.jsx
import React, { useState, useRef, useEffect } from "react";
import Button from "./Button"; // Assuming you have a Button component
import { useNavigate, useLocation } from "react-router-dom";

const OtpVerification = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  const emailOrPhone = location.state?.emailOrPhone;

  // Prevent skipping OTP
  useEffect(() => {
    if (!emailOrPhone) {
      alert("Please go through Forgot Password first.");
      navigate("/forgot-password");
    }
  }, [emailOrPhone, navigate]);

  const handleChange = (element, index) => {
    if (!isNaN(element.value)) {
      const newOtp = [...otp];
      newOtp[index] = element.value;
      setOtp(newOtp);
      if (index < 5 && element.value !== "") {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length < 6) {
      alert("Please enter a 6-digit code");
      return;
    }
    // In real app, verify OTP here
    navigate("/reset-password", { state: { emailOrPhone } });
  };

  const handleResend = () => {
    alert(`OTP resent to ${emailOrPhone}`);
  };

  if (!emailOrPhone) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a]">
      <div className="bg-white/50 backdrop-blur-xl rounded-3xl p-8 w-96 flex flex-col items-center shadow-2xl border border-white/20">
        {/* Title */}
        <h1 className="text-2xl font-semibold mb-2 text-black tracking-tight">
          OTP Verification
        </h1>
        <p className="text-gray-800 text-sm font-medium text-center mb-6">
          Enter the 6-digit code sent to{" "}
          <span className="font-semibold">{emailOrPhone}</span>
        </p>

        {/* OTP Boxes */}
        <div className="flex justify-center gap-2 mb-4">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={otp[index]}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputsRef.current[index] = el)}
              className="w-10 h-12 text-center text-white font-medium text-base rounded-lg border border-gray-400 bg-[#424242] focus:outline-none focus:border-gray-600 transition-colors"
            />
          ))}
        </div>

        {/* Resend Button */}
        <button
          onClick={handleResend}
          className="text-xs underline font-medium mb-6 hover:text-black transition-colors text-indigo-600 cursor-pointer"
        >
          Resend OTP
        </button>

        {/* Verify Button */}
        <Button onClick={handleVerify}>Verify</Button>
      </div>
    </div>
  );
};

export default OtpVerification;
