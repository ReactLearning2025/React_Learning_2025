import React, { useState } from "react";

function LoginForm() {
  // Form input states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // UI states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState("");

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault(); // Page reload rokne ke liye

    // Validation
    if (!username || !password) {
      setError("Please fill all fields!");
      return;
    }

    try {
      // Loading start
      setLoading(true);
      setError("");
      setSuccess(false);

      console.log("🔐 Logging in...", { username, password });

      // POST request - API call
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      // Check response
      if (!response.ok) {
        throw new Error("Login failed! Check your credentials.");
      }

      // Get response data
      const data = await response.json();

      console.log("✅ Login successful:", data);

      // Success state
      setToken(data.token);
      setSuccess(true);
      setLoading(false);

      // Token save karo (localStorage mein)
      localStorage.setItem("authToken", data.token);

      // Form clear karo
      setUsername("");
      setPassword("");
    } catch (err) {
      setError(err.message);
      setLoading(false);
      console.error("❌ Login error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🔐</div>
          <h2 className="text-3xl font-bold text-gray-800">Login</h2>
          <p className="text-gray-600 mt-2">
            Enter your credentials to continue
          </p>
        </div>

        {/* Demo Credentials Box */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded">
          <p className="font-semibold text-gray-700 mb-2">
            🔑 Demo Credentials:
          </p>
          <p className="text-sm text-gray-600">
            Username:{" "}
            <code className="bg-white px-2 py-1 rounded">mor_2314</code>
          </p>
          <p className="text-sm text-gray-600">
            Password: <code className="bg-white px-2 py-1 rounded">83r5^_</code>
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-6 rounded">
            <p className="font-semibold text-green-700">✅ Login Successful!</p>
            <p className="text-sm text-green-600 mt-1">
              Token: {token.substring(0, 20)}...
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-6 rounded">
            <p className="font-semibold text-red-700">❌ {error}</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Input */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none transition"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none transition"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-bold text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-500 hover:bg-indigo-600 hover:scale-105 active:scale-95"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
