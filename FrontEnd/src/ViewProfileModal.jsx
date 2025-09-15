// src/ViewProfileModal.jsx
import React, { useState, useEffect, useContext } from "react";
import InputField from "./Components/InputField";
import Button from "./Components/Button";
import { UserContext } from "./Context/UserContext";
import { toast } from "react-hot-toast";

const ViewProfileModal = ({ show, onClose }) => {
  const { userProfile, setUserProfile } = useContext(UserContext);

  if (!show) return null;

  const [fullName, setFullName] = useState(userProfile.fullName || "");
  const [phone, setPhone] = useState(userProfile.phone || "");
  const [dob, setDob] = useState(userProfile.dob || "");
  const [age, setAge] = useState(userProfile.age || "");
  const [locationField, setLocationField] = useState(
    userProfile.location || ""
  );
  const [bloodGroup, setBloodGroup] = useState(userProfile.bloodGroup || "");
  const [pastDiseases, setPastDiseases] = useState(
    userProfile.pastDiseases || ""
  );

  // Auto-calc age from DOB
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

  const handleSave = (e) => {
    e.preventDefault();

    if (!fullName || !phone || !dob || !locationField) {
      toast.error("⚠️ Please fill all required fields");
      return;
    }

    setUserProfile({
      fullName,
      phone,
      dob,
      age,
      location: locationField,
      bloodGroup,
      pastDiseases,
    });

    toast.success("✅ Profile saved successfully!");
    onClose();
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
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-green-400 text-xl"
        >
          ✕
        </button>

        <h1 className="text-3xl font-bold mb-2 text-green-400 tracking-tight">
          View / Edit Profile
        </h1>
        <p className="text-gray-400 mb-6 text-sm font-medium">
          Update your personal information
        </p>

        <form className="w-full flex flex-col space-y-4" onSubmit={handleSave}>
          {/* Full Name */}
          <InputField
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          {/* Phone */}
          <label className="text-gray-300 text-sm font-semibold">
            Phone Number
          </label>
          <div className="flex">
            <span className="px-3 py-2 rounded-l-xl bg-gray-800 text-green-400 text-sm font-medium border border-gray-700 border-r-0 flex items-center justify-center">
              +91
            </span>
            <input
              type="tel"
              placeholder="Enter 10-digit number"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value.replace(/[^0-9]/g, "").slice(0, 10))
              }
              className="flex-1 h-12 px-4 rounded-r-xl bg-gray-800 text-white placeholder-gray-500 outline-none border border-gray-700 text-sm font-medium focus:border-green-400 focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* DOB */}
          <label className="text-gray-300 text-sm font-semibold">
            Date of Birth
          </label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full h-12 px-4 rounded-xl bg-gray-800 text-white placeholder-gray-500 outline-none border border-gray-700 text-sm font-medium [color-scheme:dark] focus:ring-2 focus:ring-green-400"
            style={{ accentColor: "#22c55e" }}
          />

          {/* Age */}
          <InputField
            label="Age"
            type="text"
            value={age}
            readOnly
            placeholder="Auto-calculated"
          />

          {/* Location */}
          <InputField
            label="Location"
            type="text"
            placeholder="Enter your city / state"
            value={locationField}
            onChange={(e) => setLocationField(e.target.value)}
          />

          {/* Blood Group Dropdown */}
          <label className="text-gray-300 text-sm font-semibold">
            Blood Group
          </label>
          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className="w-full h-12 px-4 rounded-xl bg-gray-800 text-white outline-none border border-gray-700 text-sm font-medium hover:border-green-400 transition-colors focus:border-green-400 focus:ring-2 focus:ring-green-400"
          >
            <option value="">Select your blood group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>

          {/* Past Diseases */}
          <label className="text-green-400 text-sm font-semibold">
            Past Diseases / Medical History
          </label>
          <textarea
            placeholder="List any past illnesses, conditions or allergies"
            value={pastDiseases}
            onChange={(e) => setPastDiseases(e.target.value)}
            className="w-full h-28 px-4 py-3 rounded-xl bg-gray-800 text-white placeholder-gray-500 outline-none border border-gray-700 text-sm font-medium resize-none focus:border-green-400 focus:ring-2 focus:ring-green-400"
          />

          <Button type="submit" className="mt-2">
            Save Profile
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ViewProfileModal;
