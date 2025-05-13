import React, { useEffect, useState } from "react";
import {
  FaDownload,
  FaCalendarAlt,
  FaLeaf,
  FaRulerCombined,
} from "react-icons/fa";
import manager from "../assets/manager.png";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

const Dashboard = () => {
  const [userData, setUserData] = useState({
    username: "",
    cropName: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const crop = {
    name: userData.cropName || "N/A",
    duration: "6 months",
    area: "12 hectares",
    marketPrice: "3000rs",
    achieved: 84,
    currentProfit: "₹1,20,000",
    expectedProfit: "₹1,50,000",
  };

  const payments = [
    { name: "Fertilizer payment", company: "FarmEase Fertilizers", date: "10/05" },
    { name: "Seed purchase", company: "AgroCo", date: "15/05" },
    { name: "Pesticide", company: "GreenShield", date: "22/05" },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://127.0.0.1:8080/api/getUserData", {
          withCredentials: true,
        });
        setUserData(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data. Please log in again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    // Clear user session or token here
    // For example, call logout API or clear cookies/localStorage
    // Then redirect to login page
    alert("Logout functionality not implemented yet.");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen font-sans">
        <p className="text-xl text-gray-700">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen font-sans">
        <p className="text-xl text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-emerald-800 text-white p-6 flex flex-col justify-between items-center">
        <div className="w-full flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-6 text-center">CropField</h1>
          <img
            src={manager}
            alt="Farm Manager"
            className="w-28 h-28 rounded-full mb-4"
          />
          <div className="text-center mb-6">
            <h2 className="font-bold text-lg">{userData.username || "User"}</h2>
            <p className="text-sm">Farm Manager</p>
          </div>

          <nav className="space-y-4 mb-10 w-full flex flex-col items-center">
            <button className="bg-white text-black w-4/5 py-2 rounded">
              Dashboard
            </button>
            <button className="hover:underline w-4/5 text-center">
              Budget Planner
            </button>
            <button className="hover:underline w-4/5 text-center">
              Expense Manager
            </button>
          </nav>

          <div className="mb-6 w-full flex justify-center">
            <button className="hover:underline w-4/5 text-center">
              Settings
            </button>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="bg-white text-black py-2 rounded w-4/5 text-center"
          aria-label="Logout"
        >
          Logout
        </button>
      </aside>

      {/* Main Dashboard */}
      <main className="flex-1 bg-green-50 p-6 space-y-6 overflow-y-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Crop: {crop.name}</h2>
          <div className="bg-black text-white px-4 py-1 rounded">
            {new Date().toLocaleDateString("en-GB")}
          </div>
        </div>

        {/* Crop Details */}
        <div className="grid grid-cols-3 gap-4">
          <Card icon={<FaLeaf />} label="Crop Name" value={crop.name} />
          <Card icon={<FaCalendarAlt />} label="Duration" value={crop.duration} />
          <Card icon={<FaRulerCombined />} label="Area" value={crop.area} />
        </div>

        {/* Payments + Profit Summary */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white shadow p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-4">Upcoming Payments</h3>
            <ul className="space-y-3 text-sm">
              {payments.map((p, idx) => (
                <li key={idx}>
                  <div className="font-medium">{p.name}</div>
                  <div className="text-gray-600">{p.company}</div>
                  <div className="text-right text-xs">{p.date}</div>
                </li>
              ))}
            </ul>
            <button className="mt-4 bg-black text-white px-4 py-2 rounded">
              More →
            </button>
          </div>

          <div className="bg-white shadow p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-4">Profit Summary</h3>
            <div className="flex items-center space-x-6">
              <div className="flex flex-col items-center justify-center w-32 h-32 rounded-full border-4 border-green-500 shadow-lg">
                <span className="text-sm text-gray-500 mb-1">Achieved</span>
                <span className="text-2xl font-bold text-green-700">
                  {crop.achieved}%
                </span>
              </div>
              <div>
                <p>
                  <strong>Current profit:</strong> {crop.currentProfit}
                </p>
                <p>
                  <strong>Expected profit:</strong> {crop.expectedProfit}
                </p>
              </div>
            </div>
            <div className="mt-4">
              Market price: <strong>{crop.marketPrice}</strong>
            </div>
            <button className="mt-2 bg-black text-white px-4 py-2 rounded">
              See data →
            </button>
          </div>
        </div>

        {/* Crop Sales */}
        <div className="bg-white shadow p-4 rounded-lg flex justify-between items-center">
          <h3 className="font-bold text-lg">Crop Sales</h3>
          <button className="flex items-center bg-black text-white px-4 py-2 rounded">
            <FaDownload className="mr-2" /> Download
          </button>
        </div>
      </main>
    </div>
  );
};

const Card = ({ icon, label, value }) => (
  <div className="bg-white shadow p-4 rounded-lg flex items-center space-x-4">
    <div className="text-2xl text-green-600">{icon}</div>
    <div>
      <div className="text-gray-500 text-sm">{label}</div>
      <div className="font-bold">{value}</div>
    </div>
  </div>
);

export default Dashboard;
