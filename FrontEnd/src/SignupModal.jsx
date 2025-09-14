import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import navigate

// ✅ Corrected import paths (case-sensitive)
import InputField from "./Components/InputField";
import Button from "./Components/Button";

const SignUpModal = ({ show, onClose }) => {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState(""); // optional
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // ✅ create navigate hook

  if (!show) return null; // ✅ Don't render if modal is closed

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !phone || !password) {
      alert("Please fill in all required fields");
      return;
    }

    // ✅ Simulate successful signup
    console.log("User registered:", {
      firstName,
      middleName,
      lastName,
      email,
      phone,
      password,
    });

    // ✅ Redirect to /home after signup
    navigate("/home"); // ✅ navigate first
    onClose(); // ✅ then close modal
  };

  return (
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
          className="absolute top-3 right-3 text-gray-300 hover:text-green-400 text-xl"
          onClick={onClose}
        >
          ✕
        </button>

        <h1 className="text-2xl font-bold mb-5 text-green-400 text-center">
          SIGN UP
        </h1>

        <form
          className="flex flex-col space-y-4 w-full"
          onSubmit={handleSubmit}
        >
          {/* First Name */}
          <InputField
            label="First Name"
            type="text"
            placeholder="Enter First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          {/* Middle Name (optional) */}
          <InputField
            label="Middle Name (Optional)"
            type="text"
            placeholder="Enter Middle Name"
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
          />

          {/* Last Name */}
          <InputField
            label="Last Name"
            type="text"
            placeholder="Enter Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          {/* Email */}
          <InputField
            label="Email"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Phone Number */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Phone Number
            </label>
            <div className="flex w-full">
              <span className="bg-green-500 text-white px-3 py-2 rounded-l-lg flex items-center text-sm font-medium">
                +91
              </span>
              <input
                type="tel"
                placeholder="Enter 10-digit number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="
                    w-full
                    px-3 py-2
                    bg-transparent
                    border border-gray-700
                    rounded-r-lg
                    focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500
                    text-gray-200 placeholder-gray-500
                "
              />
            </div>
          </div>

          {/* Password */}
          <InputField
            label="Password"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit">Sign Up</Button>

          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-700" />
            <span className="px-2 text-gray-400 font-semibold">OR</span>
            <hr className="flex-grow border-gray-700" />
          </div>

          <Button>Register with Google</Button>
          <Button>Register with Phone</Button>
        </form>

        <div className="flex items-center justify-center mt-4 space-x-2">
          <p className="text-sm text-gray-400 font-medium">
            Already have an account?
          </p>
          {/* ✅ This closes SignUpModal and shows LoginModal */}
          <button
            onClick={onClose}
            className="text-green-400 hover:underline font-medium"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
