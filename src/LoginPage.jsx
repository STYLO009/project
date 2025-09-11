import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField"; // Import your InputField component
import Button from "./Button"; // Assuming you have a Button component
import AnchorButton from "./AnchorButton";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    // Simulate login success
    setTimeout(() => navigate("/chatPage"), 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a]">
      <div className="rounded-3xl px-8 py-8 w-116 bg-white/50 backdrop-blur-xl border border-white/20 shadow-2xl flex flex-col items-center m-0.5">
        {/* Title */}
        <h1 className="text-2xl font-semibold mb-2 text-black tracking-tight">
          Login / Sign In
        </h1>
        <p className="text-gray-800 mb-6 text-sm font-medium">
          Access your account securely
        </p>

        {/* Form */}
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

          {/* Divider */}
          <div className="flex items-center my-4 text-gray-800 text-xs font-medium">
            <hr className="flex-grow border-gray-700" />
            <span className="px-3">OR</span>
            <hr className="flex-grow border-gray-700" />
          </div>

          <Button>Login with Google</Button>
          <Button>Login with Phone</Button>
        </form>

        {/* Forgot password */}
        <div className="flex justify-end mb-4 w-full">
          <AnchorButton to="/forgot">Forgot Password?</AnchorButton>
        </div>

        {/* Signup */}
        <div className="flex justify-center mt-4 mb-1 space-x-1">
          <p className="text-sm text-gray-800 font-medium">
            Don’t have an account?
          </p>
          <AnchorButton to="/signup">Sign Up</AnchorButton>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
