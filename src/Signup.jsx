import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import Button from "./Button";
import AnchorButton from "./AnchorButton";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      alert("Please enter all fields");
      return;
    }

    // Navigate to WelcomePage and pass username
    navigate("/welcome", { state: { username } });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a]">
      <div className="bg-white/50 backdrop-blur-xl rounded-3xl p-8 w-116 flex flex-col items-center shadow-2xl border border-white/20">
        <h1 className="text-2xl font-bold mb-5 text-black">SIGN UP</h1>

        <form className="w-full flex flex-col" onSubmit={handleSubmit}>
          <InputField
            label="Username"
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <InputField
            label="Email"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

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
            <span className="px-2 text-gray-800 font-semibold">OR</span>
            <hr className="flex-grow border-gray-700" />
          </div>

          <Button>Register with Google</Button>
          <Button>Register with Phone</Button>
        </form>

        <div className="flex items-center justify-center mt-4 mb-1 space-x-2">
          <p className="text-sm text-gray-800 font-semibold mr-1">
            Already have an account?
          </p>
          <AnchorButton to="/login"> Login</AnchorButton>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
