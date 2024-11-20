import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

function PrivateRoute({ children }) {
  const { userInfo } = useUser();
  // Retrieve the logged-in user from localStorage
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  // If no user is logged in (loggedInUser is null), navigate to login page
  if (!loggedInUser) {
    return <Navigate to="/login" />;
  }

  // If a user is logged in, render the children (protected route)
  return children;
}

export default PrivateRoute;
