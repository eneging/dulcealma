import React from "react";
import { useNavigate } from "react-router-dom";

const SignOutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // 1. Clear the authentication token from localStorage
    localStorage.removeItem("token");
    // You might also want to clear any other user-related data in localStorage or context

    // 2. Redirect the user to the login page
    navigate("/"); // Assuming your login page is at the root path "/"
  };

  return (
    <button
      onClick={handleSignOut}
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 ease-in-out"
    >
      Cerrar sesión
    </button>
  );
};

export default SignOutButton;