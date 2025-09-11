import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";
import LoginPage from "./LoginPage";
import ForgotPassword from "./ForgotPassword";
import OtpVerification from "./OtpVerification";
import ChatPage from "./ChatPage";
import ResetPassword from "./ResetPassword"; // New
import SignUpPage from "./Signup";
import WelcomePage from "./Welcome";
import CreateProfilePage from "./CreateProfile";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LanguageSelector />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/otp-verification" element={<OtpVerification />} />
        <Route path="/chatPage" element={<ChatPage />} />
        <Route path="/reset-password" element={<ResetPassword />} /> {/* New */}
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/create-profile" element={<CreateProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
