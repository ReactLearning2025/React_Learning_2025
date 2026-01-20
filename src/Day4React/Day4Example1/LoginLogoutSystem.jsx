import { useState } from "react";

export default function LoginLogoutSystem() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleLogin = () => {
    if (inputValue.trim()) {
      setUsername(inputValue);
      setIsLoggedIn(true);
      setInputValue("");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Authentication Demo
        </h1>

        {/* Conditional Rendering using Ternary Operator */}
        {isLoggedIn ? (
          // Logged In View
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="bg-green-500 rounded-full w-12 h-12 flex items-center justify-center text-white text-xl font-bold">
                  {username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm text-gray-600">Welcome back,</p>
                  <p className="text-xl font-semibold text-gray-800">
                    {username}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <h3 className="font-semibold text-gray-700 mb-2">
                Your Dashboard
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center bg-white p-3 rounded">
                  <span className="text-gray-600">Profile</span>
                  <span className="text-blue-600">→</span>
                </div>
                <div className="flex justify-between items-center bg-white p-3 rounded">
                  <span className="text-gray-600">Settings</span>
                  <span className="text-blue-600">→</span>
                </div>
                <div className="flex justify-between items-center bg-white p-3 rounded">
                  <span className="text-gray-600">Messages</span>
                  <span className="text-blue-600">→</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition duration-200"
            >
              Logout
            </button>
          </div>
        ) : (
          // Logged Out View
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800 text-center">
                👋 Please sign in to access your dashboard
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                  placeholder="Enter your username"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                onClick={handleLogin}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-200"
              >
                Login
              </button>
            </div>

            <div className="text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <span className="text-blue-600 cursor-pointer">Sign up</span>
            </div>
          </div>
        )}

        {/* Status indicator using && operator */}
        <div className="mt-6 text-center">
          <span
            className={`inline-flex items-center gap-2 text-sm ${
              isLoggedIn ? "text-green-600" : "text-gray-500"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isLoggedIn ? "bg-green-500" : "bg-gray-400"
              }`}
            ></span>
            {isLoggedIn ? "Online" : "Offline"}
          </span>
        </div>
      </div>
    </div>
  );
}
