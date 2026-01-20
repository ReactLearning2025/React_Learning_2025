import React, { useState } from "react";

function LoginToggle() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("Guest");

  const handleLogin = () => {
    setIsLoggedIn(true);
    setUsername("Sharique Husain");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("Guest");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        3. Login/Logout Toggle
      </h2>

      <div className="flex items-center gap-4 mb-4">
        <div
          className={`w-4 h-4 rounded-full ${
            isLoggedIn ? "bg-green-500" : "bg-red-500"
          }`}
        ></div>
        <span className="text-lg">
          Status:{" "}
          <strong className={isLoggedIn ? "text-green-600" : "text-red-600"}>
            {isLoggedIn ? "Logged In" : "Logged Out"}
          </strong>
        </span>
      </div>

      <div className="p-4 bg-gray-50 rounded-lg mb-4">
        <p className="text-gray-700">
          Welcome, <strong>{username}</strong>!
        </p>
      </div>

      {isLoggedIn ? (
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition w-full"
        >
          🚪 Logout
        </button>
      ) : (
        <button
          onClick={handleLogin}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition w-full"
        >
          🔓 Login
        </button>
      )}

      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-gray-700">
          <strong>How it works:</strong> Boolean state controls what's
          displayed. The button shows different text and actions based on{" "}
          <code className="bg-gray-200 px-2 py-1 rounded">isLoggedIn</code>{" "}
          state.
        </p>
      </div>
    </div>
  );
}

export default LoginToggle;
