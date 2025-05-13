import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FarmIcon = () => (
  <svg viewBox="0 0 24 24" className="w-10 h-10">
    <path
      fill="currentColor"
      d="M22,21H2V9L12,2L22,9V21M15,20H17V10H15V20M11,20H13V10H11V20M7,20H9V10H7V20Z"
    />
  </svg>
);

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    setLoading(true);

    try {
     const response = await fetch("http://127.0.0.1:8080/api/login", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       credentials: "include",  // Important for session cookies
       body: JSON.stringify({ username, password }),
     });

      console.log("Response status:", response.status);

      const resultText = await response.text();
      console.log("Response body:", resultText);

      if (response.ok && resultText === "Login successful!") {
        navigate("/dashboard");
      } else {
        alert(resultText || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
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
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400 mb-6">
            Login to continue your farming journey
          </p>

          <div className="mb-4">
            <label className="block text-white mb-2">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full p-3 bg-black border border-gray-700 rounded text-white"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="mb-6">
            <label className="block text-white mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-3 bg-black border border-gray-700 rounded text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className={`w-full py-3 rounded font-medium text-white ${
              loading ? "bg-gray-600 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="mt-6 text-center">
            <span className="text-gray-400">Don't have an account? </span>
            <button
              onClick={() => navigate("/register")}
              className="text-green-400 hover:text-green-300 cursor-pointer underline"
              disabled={loading}
            >
              Register
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

export default LoginPage;
