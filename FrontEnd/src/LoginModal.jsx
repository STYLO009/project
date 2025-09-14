import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// ✅ Make sure these paths are correct (case-sensitive)
import InputField from "./Components/InputField";
import Button from "./Components/Button";
import ForgotPasswordModal from "./ForgotPasswordModal";
import SignUpModal from "./SignupModal"; // ✅ Import the signup modal

const LoginModal = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false); // ✅ New state for signup modal
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    // ✅ Simulate login then close + navigate
    setTimeout(() => {
      onClose();
      navigate("/chatPage");
    }, 500);
  };

  return (
    <>
      {/* Forgot Password Modal */}
      {showForgot && (
        <ForgotPasswordModal
          onClose={() => {
            setShowForgot(false);
            onClose();
          }}
        />
      )}

      {/* Sign Up Modal */}
      {showSignUp && (
        <SignUpModal show={showSignUp} onClose={() => setShowSignUp(false)} />
      )}

      {/* Login Modal */}
      {!showForgot && !showSignUp && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
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
            {/* Close Button */}
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
              <button
                onClick={() => setShowSignUp(true)}
                className="text-green-400 hover:underline text-xs "
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginModal;
