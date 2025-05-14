import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import RegisterPage from "./Components/RegisterPage";
import DashboardPage from "./Components/DashboardPage";
import BudgetPlanner from "./Components/BudgetPlanner"
export default function App() {
  return (
    <Router>
      <div className="h-screen flex flex-col">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* You can add a 404 route here if needed */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/budget" element={<BudgetPlanner />} />

        </Routes>
      </div>
    </Router>
  );
}
