import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./Images/Logo.png";
import Anchortag from "./Components/Anchortag";
import LoginModal from "./LoginModal";
import { UserContext } from "./Context/UserContext";
import { User, LogOut } from "lucide-react";
import ViewProfileModal from "./ViewProfileModal";
import { toast } from "react-hot-toast";

export default function Navbar() {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);

  // 🔹 Logout Handler
  const handleLogout = () => {
    toast.loading("Logging out...");
    setTimeout(() => {
      setIsLoggedIn(false);
      toast.dismiss();
      toast.success("Logged out successfully");
      setShowMenu(false);
      navigate("/");
    }, 1500);
  };

  // 🔹 Try Chatbot Handler
  const handleTryChatbot = () => {
    if (!isLoggedIn) {
      toast("🔒 Please login to use the chatbot", {
        duration: 2000, // 2 seconds
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      setShowLogin(true);
      return;
    }
    window.open(
      "https://wa.me/919000000000?text=Hi%20I%20want%20to%20try%20the%20health%20chatbot",
      "_blank"
    );
  };

  return (
    <>
      <nav className="w-full flex items-center justify-between px-6 py-4 bg-gradient-to-r from-gray-950 to-gray-900 border-b border-gray-800 sticky top-0 z-50">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/home")}
        >
          <img
            src={Logo}
            alt="Sanjeevani Logo"
            className="h-7 w-7 brightness-150"
          />
          <span className="text-xl font-bold text-green-400">Sanjeevani</span>
        </div>

        {/* Middle Nav Links */}
        <div className="hidden md:flex gap-6 px-6 py-2 rounded-full bg-gray-800/90 backdrop-blur-md border border-gray-700 shadow-lg">
          <Anchortag label="Home" targetId="home" />
          <Anchortag label="About" targetId="about" />
          <Anchortag label="Features" targetId="features" />
          <Anchortag label="Contact" targetId="contact" />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 relative">
          {/* Try Chatbot */}
          <button
            onClick={handleTryChatbot}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-semibold shadow-md transition cursor-pointer"
          >
            Try Chatbot
          </button>

          {/* Login Button */}
          {!isLoggedIn && (
            <button
              onClick={() => setShowLogin(true)}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-semibold shadow-md transition cursor-pointer"
            >
              Login
            </button>
          )}

          {/* Profile Menu */}
          {isLoggedIn && (
            <div className="relative">
              <button
                onClick={() => setShowMenu((prev) => !prev)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-700 text-green-400 shadow-md"
              >
                <User size={20} />
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-800 rounded-xl shadow-lg overflow-hidden">
                  <button
                    onClick={() => {
                      setShowProfile(true);
                      setShowMenu(false);
                    }}
                    className="flex items-center gap-2 w-full px-4 py-3 text-gray-200 hover:bg-gray-800 text-sm"
                  >
                    <User size={18} className="text-green-400" />
                    View Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-4 py-3 text-gray-200 hover:bg-gray-800 text-sm"
                  >
                    <LogOut size={18} className="text-red-400" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Modals */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showProfile && (
        <ViewProfileModal
          show={showProfile}
          onClose={() => setShowProfile(false)}
        />
      )}
    </>
  );
}
