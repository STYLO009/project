// src/ForgotPasswordModal.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; // ✅ added toast
import InputField from "./Components/InputField";
import Button from "./Components/Button";

const OtpVerificationModal = ({ emailOrPhone, onClose, onVerified }) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputsRef = useRef([]);

  const handleChange = (element, index) => {
    if (!isNaN(element.value)) {
      const newOtp = [...otp];
      newOtp[index] = element.value;
      setOtp(newOtp);
      if (index < 5 && element.value !== "") {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length < 6) {
      toast.error("Please enter a 6-digit code");
      return;
    }

    // Show loading toast
    const toastId = toast.loading("Verifying OTP...");
    // Simulate verification
    setTimeout(() => {
      toast.success("✅ OTP Verified!", { id: toastId });
      onVerified(enteredOtp);
    }, 800);
  };

  const handleResend = () => {
    setOtp(new Array(6).fill(""));
    if (inputsRef.current[0]) {
      inputsRef.current[0].focus();
    }
    toast.success(`OTP resent to ${emailOrPhone}`);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative w-full h-full md:h-auto md:max-w-md md:max-h-[90vh] bg-gray-900/95 backdrop-blur-xl border-t border-gray-800 md:border md:rounded-3xl shadow-2xl flex flex-col items-center px-6 py-6 md:px-8 md:py-8 overflow-y-auto scrollbar-hide">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-green-400 text-xl"
        >
          ✕
        </button>

        <h1 className="text-3xl font-bold mb-2 text-green-400 tracking-tight">
          OTP Verification
        </h1>
        <p className="text-gray-400 text-sm font-medium text-center mb-6">
          Enter the 6-digit code sent to{" "}
          <span className="font-semibold">{emailOrPhone}</span>
        </p>

        <div className="flex justify-center gap-2 mb-4">
          {otp.map((_, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={otp[index]}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputsRef.current[index] = el)}
              className="w-10 h-12 text-center text-white font-medium text-base rounded-lg border border-gray-700 bg-gray-800 focus:outline-none focus:border-green-400 transition-colors"
            />
          ))}
        </div>

        <button
          onClick={handleResend}
          className="text-xs font-medium mb-6 hover:text-green-400 transition-colors text-green-500 hover:underline cursor-pointer"
        >
          Resend OTP
        </button>

        <Button onClick={handleVerify}>Verify</Button>
      </div>
    </div>
  );
};

const ResetPasswordModal = ({ emailOrPhone, onClose, onResetSuccess }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (!emailOrPhone) onClose();
  }, [emailOrPhone, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      toast.error("Please fill both fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const toastId = toast.loading("Resetting password...");
    setTimeout(() => {
      toast.success(`✅ Password reset successful for ${emailOrPhone}`, {
        id: toastId,
      });

      setPassword("");
      setConfirmPassword("");
      if (onResetSuccess) onResetSuccess();
      else onClose();
    }, 1000);
  };

  if (!emailOrPhone) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative w-full h-full md:h-auto md:max-w-md md:max-h-[90vh] bg-gray-900/95 backdrop-blur-xl border-t border-gray-800 md:border md:rounded-3xl shadow-2xl flex flex-col items-center px-6 py-6 md:px-8 md:py-8 overflow-y-auto scrollbar-hide">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-green-400 text-xl"
        >
          ✕
        </button>

        <h1 className="text-3xl font-bold mb-2 text-green-400 tracking-tight">
          Reset Password
        </h1>
        <p className="text-gray-400 text-sm font-medium mb-6 text-center">
          Enter a new password to secure your account
        </p>

        <form
          className="w-full flex flex-col space-y-4"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col">
            <label className="text-gray-300 text-xs font-medium mb-1">
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
            <label className="text-gray-300 text-xs font-medium mb-1">
              Confirm Password
            </label>
            <InputField
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            className="bg-green-600 hover:bg-green-500 text-white rounded-full shadow-lg text-sm font-medium"
          >
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
};

const ForgotPasswordModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [emailOrPhoneForOtp, setEmailOrPhoneForOtp] = useState("");

  const navigate = useNavigate();

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setSubmitted(true);
    const toastId = toast.loading("Sending OTP to your email...");
    setTimeout(() => {
      toast.success("✅ OTP sent to your email!", { id: toastId });
      setSubmitted(false);
      setEmailOrPhoneForOtp(email);
      setShowOtpModal(true);
      setEmail("");
    }, 1200);
  };

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }

    setSubmitted(true);
    const fullPhone = `+91${phone}`;
    const toastId = toast.loading("Sending OTP to your phone...");
    setTimeout(() => {
      toast.success("✅ OTP sent to your phone!", { id: toastId });
      setSubmitted(false);
      setEmailOrPhoneForOtp(fullPhone);
      setShowOtpModal(true);
      setPhone("");
    }, 1200);
  };

  const baseModalHidden = showOtpModal || showResetModal;

  return (
    <>
      {showOtpModal && (
        <OtpVerificationModal
          emailOrPhone={emailOrPhoneForOtp}
          onClose={() => setShowOtpModal(false)}
          onVerified={(enteredOtp) => {
            setShowOtpModal(false);
            setShowResetModal(true);
          }}
        />
      )}

      {showResetModal && (
        <ResetPasswordModal
          emailOrPhone={emailOrPhoneForOtp}
          onClose={() => setShowResetModal(false)}
          onResetSuccess={() => {
            setShowResetModal(false);
            if (onClose) onClose();
            navigate("/home");
          }}
        />
      )}

      {!baseModalHidden && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative w-full h-full md:h-auto md:max-w-md md:max-h-[90vh] bg-gray-900/80 backdrop-blur-xl border-t border-gray-800 md:border md:rounded-3xl shadow-2xl flex flex-col items-center px-6 py-6 md:px-8 md:py-8 overflow-y-auto scrollbar-hide">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-green-400 text-xl"
            >
              ✕
            </button>

            <h1 className="text-3xl font-bold mb-2 text-green-400 tracking-tight">
              Forgot Password
            </h1>
            <p className="text-gray-400 mb-6 text-sm font-medium text-center">
              Reset your password with email or phone
            </p>

            <div className="flex mb-6 w-full justify-center space-x-4">
              <button
                onClick={() => setActiveTab("email")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === "email"
                    ? "bg-green-500/20 text-green-400 border border-green-400"
                    : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/70"
                }`}
              >
                Email
              </button>
              <button
                onClick={() => setActiveTab("phone")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === "phone"
                    ? "bg-green-500/20 text-green-400 border border-green-400"
                    : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/70"
                }`}
              >
                Phone
              </button>
            </div>

            {activeTab === "email" && (
              <form
                className="w-full flex flex-col"
                onSubmit={handleEmailSubmit}
              >
                <label className="text-gray-300 text-xs mb-1 font-medium">
                  Email
                </label>
                <InputField
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  type="submit"
                  disabled={submitted}
                  className="mt-4 bg-green-600 hover:bg-green-500 text-white rounded-full shadow-lg text-sm font-medium"
                >
                  {submitted ? "Sending..." : "Send OTP"}
                </Button>
              </form>
            )}

            {activeTab === "phone" && (
              <form
                className="w-full flex flex-col"
                onSubmit={handlePhoneSubmit}
              >
                <label className="text-gray-300 text-xs mb-1 font-medium">
                  Phone Number
                </label>
                <div className="flex w-full mt-0.5">
                  <span className="flex items-center px-3 bg-green-600 text-white text-sm font-medium border border-gray-700 border-r-0 h-12 rounded-l-xl">
                    +91
                  </span>
                  <InputField
                    type="tel"
                    placeholder="Enter 10-digit number"
                    value={phone}
                    onChange={(e) =>
                      setPhone(
                        e.target.value.replace(/[^0-9]/g, "").slice(0, 10)
                      )
                    }
                    inputClassName="h-12 rounded-l-none border-l-0"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitted}
                  className="mt-4 bg-green-600 hover:bg-green-500 text-white rounded-full shadow-lg text-sm font-medium"
                >
                  {submitted ? "Sending..." : "Send OTP"}
                </Button>
              </form>
            )}

            <div className="flex items-center justify-center mt-6 w-full space-x-1">
              <p className="text-[12px] text-gray-400 font-medium m-0">
                Remembered your password?
              </p>
              <button
                onClick={() => {
                  if (onClose) onClose();
                  navigate("/login");
                }}
                className="text-[12px] text-green-400 font-medium hover:underline"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPasswordModal;
