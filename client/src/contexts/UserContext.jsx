import React, { createContext, useContext, useState, useEffect } from "react";
import { getAuthToken } from "../utils/common";

//create a new context for user information
const UserContext = createContext();

//provider component to wrap around the part of the app that need access to user context
export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(() => {
    // Check if user info is available in localStorage
    const storedUserInfo = localStorage.getItem("loggedInUser");
    return storedUserInfo ? JSON.parse(storedUserInfo) : getAuthToken(); // Use the user token from cookies if localStorage is empty
  });

  // Effect to update user state when the app reloads
  useEffect(() => {
    // Fetch user info from localStorage or cookies during app load
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      setUserInfo(JSON.parse(user)); // Set user info from localStorage
    } else {
      const userFromCookie = getAuthToken();
      if (userFromCookie) {
        setUserInfo(userFromCookie);
      }
    }
  }, []);

  // Update the userInfo both in localStorage and context when the user logs in
  const setUser = (user) => {
    localStorage.setItem("loggedInUser", JSON.stringify(user)); // Store user info in localStorage
    setAuthToken(user);
    setUserInfo(user); // Set the user in the context
  };

  // Clear user info (logout)
  const logout = () => {
    localStorage.removeItem("loggedInUser"); // Remove user info from localStorage
    clearAuthToken(); // Clear the cookie
    setUserInfo(null); // Reset the user state
  };

  return (
    // Provide the userInfo and setUserInfo to the context consumers
    <UserContext.Provider value={{ userInfo, setUserInfo, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
