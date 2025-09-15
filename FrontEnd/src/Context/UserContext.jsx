import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState({
    fullName: "",
    phone: "",
    dob: "",
    age: "",
    location: "",
    bloodGroup: "",
    pastDiseases: "",
  });

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userProfile,
        setUserProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
