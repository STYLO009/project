// src/ForgotPassword.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField"; // Import your InputField component
import Button from "./Button"; // Assuming you have a Button component
import AnchorButton from "./AnchorButton";
const ForgotPassword = () => {
  const [activeTab, setActiveTab] = useState("email"); // 'email' or 'phone'
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  // Email submit
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your email");
      return;
    }

    setSubmitted(true);

    setTimeout(() => {
      alert(`OTP sent to ${email}`);
      setSubmitted(false);
      navigate("/otp-verification", { state: { emailOrPhone: email } });
      setEmail("");
    }, 1000);
  };

  // Phone submit
  const handlePhoneSubmit = (e) => {
    e.preventDefault();

    // Validate exactly 10 digits
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      alert("Please enter a valid 10-digit phone number");
      return;
    }

    setSubmitted(true);
    const fullPhone = `+91${phone}`;

    setTimeout(() => {
      alert(`OTP sent to ${fullPhone}`);
      setSubmitted(false);
      navigate("/otp-verification", { state: { emailOrPhone: fullPhone } });
      setPhone("");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a]">
      <div className="rounded-3xl px-8 py-6 w-96 bg-white/50 backdrop-blur-xl border border-white/20 shadow-2xl flex flex-col items-center">
        {/* Title */}
        <h1 className="text-2xl font-semibold mb-2 text-black tracking-tight">
          Forgot Password
        </h1>
        <p className="text-gray-800 mb-6 text-sm font-medium">
          Reset your password with email or phone
        </p>

        {/* Tabs */}
        <div className="flex mb-6 w-full justify-center space-x-4">
          <button
            onClick={() => setActiveTab("email")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === "email"
                ? "bg-[#424242] text-white"
                : "bg-gray-300 text-black hover:bg-gray-400"
            }`}
          >
            Email
          </button>
          <button
            onClick={() => setActiveTab("phone")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === "phone"
                ? "bg-[#424242] text-white"
                : "bg-gray-300 text-black hover:bg-gray-400"
            }`}
          >
            Phone
          </button>
        </div>

        {/* Email Reset */}
        {activeTab === "email" && (
          <form className="w-full flex flex-col" onSubmit={handleEmailSubmit}>
            <label className="text-black text-xs mb-1 font-medium">Email</label>
            <InputField
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="w-full h-10 bg-[#424242] text-white rounded-full shadow-lg mb-2 hover:opacity-90 transition-opacity text-sm font-medium"
            >
              Send OTP
            </button>
          </form>
        )}

        {/* Phone Reset */}
        {activeTab === "phone" && (
          <form className="w-full flex flex-col" onSubmit={handlePhoneSubmit}>
            <label className="text-black text-xs mb-1 font-medium">
              Phone Number
            </label>
            <div className="flex w-full">
              <span className="flex items-center px-3 mr-0.5 rounded-l-xl bg-[#424242] text-white text-sm font-medium border border-gray-400 border-r-0 h-10">
                +91
              </span>
              <InputField
                type="tel"
                placeholder="Enter 10-digit number"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value.replace(/[^0-9]/g, "").slice(0, 10))
                }
                inputClassName="rounded-l-none border-l-0 h-10" // Remove left rounding & border, match height
              />
            </div>

            <Button type="submit">Send OTP</Button>
          </form>
        )}

        {/* Back to login */}
        <div className="flex justify-center mt-4 w-full">
          <p className="text-xs text-gray-800 font-medium">
            Remembered your password?
          </p>
          <AnchorButton to="/login">Login</AnchorButton>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
