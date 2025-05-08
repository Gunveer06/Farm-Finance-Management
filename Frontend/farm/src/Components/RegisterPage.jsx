import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Farm icon component
const FarmIcon = () => (
  <svg viewBox="0 0 24 24" className="w-10 h-10">
    <path
      fill="currentColor"
      d="M22,21H2V9L12,2L22,9V21M15,20H17V10H15V20M11,20H13V10H11V20M7,20H9V10H7V20Z"
    />
  </svg>
);

const RegisterPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (!username || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.text();
      alert(result); // Shows server message (success or already exists)

      if (response.ok) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  };


  return (
    <div className="min-h-screen bg-green-900 flex flex-col">
      <div className="p-4">
        <div className="flex items-center text-white">
          <FarmIcon />
          <span className="text-2xl font-bold ml-2">FarmTrack</span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-black bg-opacity-70 p-8 rounded-lg w-full max-w-md">
          <h1 className="text-3xl font-bold text-white mb-2">
            Create an Account
          </h1>
          <p className="text-gray-400 mb-6">
            Register to start learning and tracking your farming skills
          </p>

          <div className="mb-4">
            <label className="block text-white mb-2">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full p-3 bg-black border border-gray-700 rounded text-white"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-white mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-3 bg-black border border-gray-700 rounded text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="block text-white mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              className="w-full p-3 bg-black border border-gray-700 rounded text-white"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            onClick={handleRegister}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded font-medium"
          >
            Register
          </button>

          <div className="mt-6 text-center">
            <span className="text-gray-400">Already have an account? </span>
            <button
              onClick={() => navigate("/login")}
              className="text-green-400 hover:text-green-300 cursor-pointer underline"
            >
              Login
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 text-center text-gray-400">
        © 2025 FarmTrack - Improve your farming skills
      </div>
    </div>
  );
};

export default RegisterPage;
