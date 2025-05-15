import { useState } from "react";
import { useNavigate } from "react-router-dom";
import manager from "../assets/manager.png";

export default function ExpenseTracker() {
  const navigate = useNavigate();

  const [expenses, setExpenses] = useState([
    { id: 1, name: "electricity bill", amount: "20,000 rs", status: "paid" },
    { id: 2, name: "", amount: "", status: "upcoming" },
    { id: 3, name: "", amount: "", status: "overdue" },
    { id: 4, name: "", amount: "", status: "" },
    { id: 5, name: "", amount: "", status: "" },
    { id: 6, name: "", amount: "", status: "" },
    { id: 7, name: "", amount: "", status: "" },
  ]);

  const [upcomingPayments, setUpcomingPayments] = useState([
    {
      id: 1,
      name: "Fertilizer payment",
      provider: "FarmEase Fertilizers",
      amount: "10,000 rs",
    },
    { id: 2, name: "", provider: "", amount: "" },
    { id: 3, name: "", provider: "", amount: "" },
    { id: 4, name: "", provider: "", amount: "" },
    { id: 5, name: "", provider: "", amount: "" },
    { id: 6, name: "", provider: "", amount: "" },
  ]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "paid":
        return (
          <div className="bg-emerald-500 text-white px-4 py-1 rounded-full text-center w-24">
            paid
          </div>
        );
      case "upcoming":
        return (
          <div className="bg-blue-400 text-white px-4 py-1 rounded-full text-center w-24">
            upcoming
          </div>
        );
      case "overdue":
        return (
          <div className="bg-red-400 text-white px-4 py-1 rounded-full text-center w-24">
            overdue
          </div>
        );
      default:
        return null;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex font-sans bg-emerald-900 text-gray-800">
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
            <button
              onClick={() => navigate("/budget")}
              className="hover:underline w-4/5 text-center"
            >
              Budget Planner
            </button>
            <button className="bg-white text-black w-4/5 py-2 rounded text-center">
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
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-emerald-500 p-6">
          <h1 className="text-white text-5xl font-bold text-center">
            Expense Tracker
          </h1>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-emerald-500 p-8">
          <div className="flex gap-6">
            {/* Expenses Panel */}
            <div className="bg-white rounded-3xl p-6 flex-1">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Your Expenses</h2>
                <div className="flex gap-2">
                  <div className="h-6 w-6 bg-gray-300 rounded"></div>
                  <div className="h-6 w-6 bg-gray-200 rounded"></div>
                  <div className="h-6 w-6 bg-gray-200 rounded"></div>
                </div>
              </div>

              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 w-24">Sr. No.</th>
                    <th className="text-left py-2">Name</th>
                    <th className="text-left py-2">Amount</th>
                    <th className="text-left py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((expense) => (
                    <tr
                      key={expense.id}
                      className="border-b border-gray-100 bg-green-100 bg-opacity-50 h-14"
                    >
                      <td className="py-3 pl-2">{expense.id}.</td>
                      <td>{expense.name}</td>
                      <td>{expense.amount}</td>
                      <td className="text-right pr-6">
                        {getStatusBadge(expense.status)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Upcoming Payments Panel */}
            <div className="bg-white rounded-3xl p-6 w-80">
              <h2 className="text-2xl font-bold mb-4">Upcoming payments</h2>

              <div className="space-y-3">
                {upcomingPayments.map((payment) => (
                  <div
                    key={payment.id}
                    className={`border rounded-lg p-3 ${
                      payment.name ? "" : "border-gray-200"
                    }`}
                  >
                    {payment.name && (
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">{payment.name}</div>
                          <div className="text-sm text-gray-600">
                            {payment.provider}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="font-medium">{payment.amount}</div>
                          {payment.amount && (
                            <button className="bg-blue-400 text-white px-3 py-1 rounded-full text-sm">
                              pay →
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
