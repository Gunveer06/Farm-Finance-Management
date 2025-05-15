import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";
import { useNavigate } from "react-router-dom";
import manager from "../assets/manager.png";

const BudgetPlanner = () => {
  const navigate = useNavigate();
  const [budgetItems, setBudgetItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", amount: "" });
  const [totalBudget, setTotalBudget] = useState(1000000);
  const [budgetInput, setBudgetInput] = useState("10");
  const [remainingBudget, setRemainingBudget] = useState(1000000);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch budget items from API
    const fetchBudgetItems = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch("http://localhost:5100/api/budget", {
          headers: {
            "x-auth-token": token,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch budget items");
        }

        const data = await response.json();
        setBudgetItems(data);

        // Calculate remaining budget
        const totalSpent = data.reduce((sum, item) => sum + item.amount, 0);
        setRemainingBudget(totalBudget - totalSpent);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching budget items:", error);
        setLoading(false);
      }
    };

    fetchBudgetItems();
  }, [navigate, totalBudget]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({
      ...newItem,
      [name]: name === "amount" ? value.replace(/[^0-9]/g, "") : value,
    });
  };

  const handleBudgetInputChange = (e) => {
    // Only allow numbers and decimal points
    const value = e.target.value.replace(/[^0-9.]/g, "");
    setBudgetInput(value);
  };

  const handleUpdateTotalBudget = () => {
    if (!budgetInput || parseFloat(budgetInput) <= 0) {
      setError("Please enter a valid budget amount");
      return;
    }

    // Convert lakhs to rupees (input is in lakhs)
    const newBudget = Math.round(parseFloat(budgetInput) * 100000);

    // Check if new budget is less than already allocated amount
    const totalAllocated = budgetItems.reduce(
      (sum, item) => sum + item.amount,
      0
    );
    if (newBudget < totalAllocated) {
      setError(
        `New budget (₹${newBudget.toLocaleString()}) cannot be less than already allocated amount (₹${totalAllocated.toLocaleString()})`
      );
      return;
    }

    setTotalBudget(newBudget);
    setRemainingBudget(newBudget - totalAllocated);
    setShowBudgetModal(false);
    setError("");
  };

  const handleAddItem = async () => {
    // Validate input
    if (!newItem.name.trim() || !newItem.amount) {
      setError("Please enter both name and amount");
      return;
    }

    const amountValue = parseInt(newItem.amount, 10);

    // Check if amount exceeds remaining budget
    if (amountValue > remainingBudget) {
      setError(
        `Amount exceeds remaining budget of ₹${remainingBudget.toLocaleString()}`
      );
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5100/api/budget", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({
          name: newItem.name,
          amount: amountValue,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add budget item");
      }

      const newBudgetItem = await response.json();

      // Update state
      setBudgetItems([...budgetItems, newBudgetItem]);
      setRemainingBudget(remainingBudget - amountValue);
      setNewItem({ name: "", amount: "" });
      setShowModal(false);
      setError("");
    } catch (error) {
      console.error("Error adding budget item:", error);
      setError("Failed to add budget item");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Prepare chart data
  const chartData = budgetItems.map((item) => ({
    name: item.name,
    value: item.amount,
  }));

  // Use different colors for chart items
  const COLORS = [
    "#facc15",
    "#ef4444",
    "#3b82f6",
    "#10b981",
    "#8b5cf6",
    "#f97316",
    "#14b8a6",
  ];

  return (
    <div className="min-h-screen flex font-sans">
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
            <h2 className="font-bold text-lg">Saroj Vishwas Nadar</h2>
            <p className="text-sm">Farm Manager</p>
          </div>

          <nav className="space-y-4 mb-10 w-full flex flex-col items-center">
            <button
              onClick={() => navigate("/dashboard")}
              className="hover:underline w-4/5 text-center"
            >
              Dashboard
            </button>
            <button className="bg-white text-black w-4/5 py-2 rounded text-center">
              Budget Planner
            </button>
            <button
              onClick={() => navigate("/expense-tracker")}
              className="hover:underline w-4/5 text-center"
            >
              Expense Manager
            </button>
          </nav>

          <div className="mb-6 w-full flex justify-center">
            <button
              onClick={() => navigate("/settings")}
              className="hover:underline w-4/5 text-center"
            >
              Settings
            </button>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="bg-white text-black py-2 rounded w-4/5 text-center"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 bg-[#12a87b] p-6 overflow-auto">
        <div className="flex flex-col lg:flex-row bg-white rounded-2xl shadow-lg p-6 gap-4 max-w-6xl mx-auto">
          {/* Left Chart Section */}
          <div className="flex flex-col w-full lg:w-1/3 gap-4">
            <div className="bg-white shadow-md rounded-2xl p-4 flex flex-col items-center">
              <h2 className="font-semibold mb-2">Budget Distribution</h2>
              {chartData.length > 0 ? (
                <PieChart width={200} height={200}>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={70}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              ) : (
                <div className="w-200 h-200 flex items-center justify-center text-gray-400">
                  No budget items yet
                </div>
              )}
              <div
                className="text-xl font-bold mt-2 cursor-pointer hover:text-green-600 flex items-center"
                onClick={() => setShowBudgetModal(true)}
              >
                ₹{(totalBudget / 100000).toFixed(1)} L
                <span className="text-sm ml-1">(Edit)</span>
              </div>
              <div className="text-sm text-gray-500">Total Budget</div>
              <div className="text-lg font-semibold text-green-600 mt-2">
                ₹{(remainingBudget / 100000).toFixed(1)} L Remaining
              </div>
              {chartData.length > 0 && <Legend />}
            </div>
          </div>

          {/* Budget List Section */}
          <div className="bg-white rounded-2xl shadow-md flex-1 p-6">
            <h1 className="text-2xl font-bold text-center mb-6">
              Budget Planner
            </h1>
            <div className="flex justify-between text-sm font-semibold border-b pb-2">
              <span>Sr. No.</span>
              <span className="ml-12">Name</span>
              <span className="mr-4">Amount</span>
            </div>

            {loading ? (
              <div className="text-center py-4">Loading...</div>
            ) : budgetItems.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                No budget items added yet
              </div>
            ) : (
              budgetItems.map((item, index) => (
                <div
                  key={item._id || index}
                  className="flex justify-between mt-3"
                >
                  <span>{index + 1}.</span>
                  <span className="ml-12">{item.name}</span>
                  <span className="mr-4">₹{item.amount.toLocaleString()}</span>
                </div>
              ))
            )}

            {remainingBudget > 0 ? (
              <div
                className="mt-10 flex justify-center text-4xl text-green-600 cursor-pointer hover:text-green-700"
                onClick={() => setShowModal(true)}
              >
                +
              </div>
            ) : (
              <div className="mt-10 text-center text-red-500">
                Budget limit reached
              </div>
            )}

            <div className="text-right mt-4 font-semibold text-sm">
              Total Budget: ₹{totalBudget.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Add Budget Item Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Add Budget Item</h2>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 mb-4 rounded">
                {error}
              </div>
            )}

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Item Name
              </label>
              <input
                type="text"
                name="name"
                value={newItem.name}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="E.g., Farm Rent"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Amount (₹)
              </label>
              <div className="flex items-center shadow appearance-none border rounded w-full">
                <span className="pl-3 text-gray-700">₹</span>
                <input
                  type="text"
                  name="amount"
                  value={newItem.amount}
                  onChange={handleInputChange}
                  className="w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Amount in rupees"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Remaining budget: ₹{remainingBudget.toLocaleString()}
              </p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => {
                  setShowModal(false);
                  setError("");
                  setNewItem({ name: "", amount: "" });
                }}
                className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleAddItem}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                {loading ? "Adding..." : "Add Item"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Total Budget Modal */}
      {showBudgetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Update Total Budget</h2>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 mb-4 rounded">
                {error}
              </div>
            )}

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Total Budget (Lakhs)
              </label>
              <div className="flex items-center shadow appearance-none border rounded w-full">
                <span className="pl-3 text-gray-700">₹</span>
                <input
                  type="text"
                  value={budgetInput}
                  onChange={handleBudgetInputChange}
                  className="w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter budget in lakhs (e.g. 10 for 10L)"
                />
                <span className="pr-3 text-gray-700">L</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Current budget: ₹{(totalBudget / 100000).toFixed(1)}L
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Already allocated: ₹
                {((totalBudget - remainingBudget) / 100000).toFixed(1)}L
              </p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => {
                  setShowBudgetModal(false);
                  setBudgetInput((totalBudget / 100000).toString());
                  setError("");
                }}
                className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateTotalBudget}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Update Budget
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetPlanner;