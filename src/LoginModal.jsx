import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "./Components/InputField";
import Button from "./Components/Button";
import AnchorButton from "./Components/AnchorButton";
import ForgotPasswordModal from "./ForgotPasswordModal"; // ✅ import modal

const LoginModal = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgot, setShowForgot] = useState(false); // ✅ state for forgot modal
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    // Simulate login success
    setTimeout(() => {
      onClose(); // close modal first
      navigate("/chatPage"); // then navigate
    }, 500);
  };

  return (
    <>
      {/* if showForgot true -> render forgot modal */}
      {showForgot && (
        <ForgotPasswordModal
          onClose={() => {
            setShowForgot(false);
            onClose(); // closes LoginModal as well
          }}
        />
      )}

      {/* Dark overlay + blur */}
      {!showForgot && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          {/* Glassy login card */}
          <div
            className="
              relative
              w-full h-full md:h-auto
              md:max-w-md md:max-h-[90vh]
              bg-gray-900/95 backdrop-blur-xl
              border-t border-gray-800 md:border md:rounded-3xl
              shadow-2xl
              flex flex-col items-center
              px-6 py-6 md:px-8 md:py-8
              overflow-y-auto scrollbar-hide
            "
          >
            {/* Close Button (top-right) */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-green-400 text-xl"
            >
              ✕
            </button>

            <h1 className="text-3xl font-bold mb-2 text-green-400 tracking-tight">
              Login / Sign In
            </h1>
            <p className="text-gray-400 mb-6 text-sm font-medium">
              Access your account securely
            </p>

            <form
              className="w-full flex flex-col space-y-4"
              onSubmit={handleSubmit}
            >
              <InputField
                label="Email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <InputField
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button type="submit">Login</Button>

              <div className="flex items-center my-4 text-gray-500 text-xs font-medium">
                <hr className="flex-grow border-gray-700" />
                <span className="px-3">OR</span>
                <hr className="flex-grow border-gray-700" />
              </div>

              <Button>Login with Google</Button>
              <Button>Login with Phone</Button>
            </form>

            <div className="flex justify-end mt-0.5 mb-4 w-full">
              {/* ✅ open Forgot modal instead of Anchor */}
              <button
                onClick={() => setShowForgot(true)}
                className="text-green-400 hover:underline text-sm font-medium"
              >
                Forgot Password?
              </button>
            </div>

            <div className="flex justify-center mt-4 mb-1 space-x-1">
              <p className="text-sm text-gray-400 font-medium">
                Don’t have an account?
              </p>
              <AnchorButton to="/signup">Sign Up</AnchorButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginModal;
