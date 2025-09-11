import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import InputField from "./InputField";
import Button from "./Button";

const CreateProfilePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const prefilledName = location.state?.username || "";

  const [fullName, setFullName] = useState(prefilledName);
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [locationField, setLocationField] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [pastDiseases, setPastDiseases] = useState("");

  // Auto-calculate age from DOB
  useEffect(() => {
    if (dob) {
      const birthDate = new Date(dob);
      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        calculatedAge--;
      }
      setAge(calculatedAge);
    }
  }, [dob]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !phone || !dob || !locationField) {
      alert("Please fill all required fields");
      return;
    }

    alert("Profile created successfully!");
    navigate("/chatPage");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a]">
      <div className="bg-white/50 backdrop-blur-xl border border-white/20 rounded-3xl p-8 w-116 flex flex-col items-center shadow-2xl">
        <h1 className="text-2xl font-bold text-black mb-6">
          Create Your Profile
        </h1>

        <form className="w-full flex flex-col" onSubmit={handleSubmit}>
          {/* Full Name (bold white text) */}
          <InputField
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            inputClassName="text-white font-bold placeholder-gray-400"
          />

          {/* Phone Number with +91 */}
          <label className="text-black text-sm mb-1 font-semibold">
            Phone Number
          </label>
          <div className="flex mb-4">
            <span className="px-3 py-2 rounded-l-xl bg-[#424242] text-white text-sm font-medium border border-gray-400 border-r-0 flex items-center justify-center">
              +91
            </span>
            <input
              type="tel"
              placeholder="Enter 10-digit number"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value.replace(/[^0-9]/g, "").slice(0, 10))
              }
              className="flex-1 h-10 px-3 rounded-r-xl bg-[#424242] text-black placeholder-gray-400 outline-none border border-gray-400 text-sm font-medium hover:bg-[#525252] hover:border-gray-500 transition-colors"
            />
          </div>

          <InputField
            label="Date of Birth"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            inputClassName="placeholder-gray-400"
          />

          <InputField
            label="Age"
            type="text"
            value={age}
            readOnly
            placeholder="Auto-calculated"
            inputClassName="placeholder-gray-400"
          />

          <InputField
            label="Location"
            type="text"
            placeholder="Enter your city / state"
            value={locationField}
            onChange={(e) => setLocationField(e.target.value)}
            inputClassName="placeholder-gray-400"
          />

          <InputField
            label="Blood Group"
            type="text"
            placeholder="Enter your blood group"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            inputClassName="placeholder-gray-400"
          />

          <label className="text-black text-sm mb-1 mt-4 font-semibold">
            Past Diseases / Medical History
          </label>
          <textarea
            placeholder="List any past illnesses, conditions or allergies"
            value={pastDiseases}
            onChange={(e) => setPastDiseases(e.target.value)}
            className="w-full h-24 mb-4 px-3 py-2 rounded-xl bg-[#424242] text-black placeholder-gray-400 outline-none border border-gray-400 font-semibold hover:bg-[#525252] hover:border-gray-500 transition-colors resize-none"
          />

          {/* Save Button: bold white */}
          <Button type="submit">Save Profile</Button>
        </form>
      </div>
    </div>
  );
};

export default CreateProfilePage;
