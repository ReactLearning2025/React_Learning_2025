import React, { useState, useEffect } from "react";

function UserList() {
  // State variables
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Jab component load ho, data fetch karo
  useEffect(() => {
    fetchUsers();
  }, []);

  // API se data fetch karne ka function
  const fetchUsers = async () => {
    try {
      // Loading start
      setLoading(true);
      setError(null);

      // API call - GET request
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
      );

      // Check if response is ok
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      // JSON data nikalo
      const data = await response.json();

      // State mein save karo
      setUsers(data);
      setLoading(false);

      console.log("✅ Users fetched:", data);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      console.error("❌ Error:", err);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-xl">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-xl font-semibold text-gray-700">
            Loading Users...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
          <div className="text-center">
            <span className="text-6xl">❌</span>
            <h2 className="mt-4 text-2xl font-bold text-red-600">Error!</h2>
            <p className="mt-2 text-gray-600">{error}</p>
            <button
              onClick={fetchUsers}
              className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">User List</h1>
          <p className="text-xl text-white opacity-90">
            Fetched {users.length} users from API
          </p>
        </div>

        {/* Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl hover:scale-105 transition transform"
            >
              {/* User Avatar */}
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-white">
                  {user.name.charAt(0)}
                </span>
              </div>

              {/* User Info */}
              <h3 className="text-xl font-bold text-gray-800 text-center mb-2">
                {user.name}
              </h3>

              <div className="space-y-2 text-sm text-gray-600">
                <p className="flex items-center">
                  <span className="font-semibold mr-2">📧</span>
                  {user.email}
                </p>
                <p className="flex items-center">
                  <span className="font-semibold mr-2">📱</span>
                  {user.phone}
                </p>
                <p className="flex items-center">
                  <span className="font-semibold mr-2">🏢</span>
                  {user.company.name}
                </p>
                <p className="flex items-center">
                  <span className="font-semibold mr-2">🌐</span>
                  {user.website}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserList;
