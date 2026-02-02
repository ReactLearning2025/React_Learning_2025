import { useState, useEffect, useCallback } from "react";

export default function Dashboard() {
  // State for different data types
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [todos, setTodos] = useState([]);

  // UI state
  const [activeTab, setActiveTab] = useState("users");
  const [loading, setLoading] = useState({
    users: false,
    posts: false,
    todos: false,
  });
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(false);

  // Effect 1: Fetch Users
  useEffect(() => {
    if (activeTab === "users" && users.length === 0) {
      fetchUsers();
    }
  }, [activeTab, users.length]); // Add users.length as dependency

  // Effect 2: Fetch Posts
  useEffect(() => {
    if (activeTab === "posts" && posts.length === 0) {
      fetchPosts();
    }
  }, [activeTab, posts.length]); // Add posts.length as dependency

  // Effect 3: Fetch Todos
  useEffect(() => {
    if (activeTab === "todos" && todos.length === 0) {
      fetchTodos();
    }
  }, [activeTab, todos.length]); // Add todos.length as dependency

  // Memoize refreshCurrentTab to avoid unnecessary re-renders
  const refreshCurrentTab = useCallback(() => {
    switch (activeTab) {
      case "users":
        fetchUsers();
        break;
      case "posts":
        fetchPosts();
        break;
      case "todos":
        fetchTodos();
        break;
    }
  }, [activeTab]);

  // Effect 4: Auto-refresh every 30 seconds
  useEffect(() => {
    if (!autoRefresh) return;

    console.log("🔄 Auto-refresh enabled");

    const intervalId = setInterval(() => {
      console.log("⏰ Auto-refreshing data...");
      refreshCurrentTab();
    },30000); // 30 seconds

    // Cleanup: Clear interval when component unmounts or autoRefresh turns off
    return () => {
      console.log("🧹 Clearing auto-refresh interval");
      clearInterval(intervalId);
    };
  }, [autoRefresh, refreshCurrentTab]); // Add refreshCurrentTab as dependency

  // Fetch functions
  async function fetchUsers() {
    setLoading((prev) => ({ ...prev, users: true }));
    setError(null);

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
      );
      const data = await response.json();
      setUsers(data);
      setLastUpdate(new Date());
      console.log("✅ Users fetched:", data.length);
    } catch (err) {
      setError("Failed to fetch users");
      console.error("❌ Error:", err);
    } finally {
      setLoading((prev) => ({ ...prev, users: false }));
    }
  }

  async function fetchPosts() {
    setLoading((prev) => ({ ...prev, posts: true }));
    setError(null);

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_limit=20",
      );
      const data = await response.json();
      setPosts(data);
      setLastUpdate(new Date());
      console.log("✅ Posts fetched:", data.length);
    } catch (err) {
      setError("Failed to fetch posts");
      console.error("❌ Error:", err);
    } finally {
      setLoading((prev) => ({ ...prev, posts: false }));
    }
  }

  async function fetchTodos() {
    setLoading((prev) => ({ ...prev, todos: true }));
    setError(null);

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=20",
      );
      const data = await response.json();
      setTodos(data);
      setLastUpdate(new Date());
      console.log("✅ Todos fetched:", data.length);
    } catch (err) {
      setError("Failed to fetch todos");
      console.error("❌ Error:", err);
    } finally {
      setLoading((prev) => ({ ...prev, todos: false }));
    }
  }

  // ...existing code...

  // Format last update time
  function formatTime(date) {
    if (!date) return "Never";
    return date.toLocaleTimeString();
  }

  // Tab configuration
  const tabs = [
    { id: "users", name: "Users", icon: "👥", count: users.length },
    { id: "posts", name: "Posts", icon: "📝", count: posts.length },
    { id: "todos", name: "Todos", icon: "✅", count: todos.length },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                📊 Data Dashboard
              </h1>
              <p className="text-gray-600">
                Real-time data from JSONPlaceholder API
              </p>
            </div>

            {/* Controls */}
            <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end gap-2">
              <div className="flex items-center gap-3">
                <button
                  onClick={refreshCurrentTab}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                >
                  🔄 Refresh
                </button>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoRefresh}
                    onChange={(e) => setAutoRefresh(e.target.checked)}
                    className="w-5 h-5 cursor-pointer"
                  />
                  <span className="text-sm text-gray-700">
                    Auto-refresh (30s)
                  </span>
                </label>
              </div>

              <div className="text-sm text-gray-500">
                Last update: {formatTime(lastUpdate)}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Tab Headers */}
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                  activeTab === tab.id
                    ? "bg-indigo-500 text-white"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xl">{tab.icon}</span>
                  <span>{tab.name}</span>
                  {tab.count > 0 && (
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        activeTab === tab.id
                          ? "bg-white text-indigo-500"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <p className="text-red-700">⚠️ {error}</p>
              </div>
            )}

            {/* Loading State */}
            {loading[activeTab] ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
                <p className="mt-4 text-gray-600">Loading {activeTab}...</p>
              </div>
            ) : (
              <>
                {/* Users Tab */}
                {activeTab === "users" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {users.map((user) => (
                      <div
                        key={user.id}
                        className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 hover:shadow-lg transition-shadow"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-800">
                              {user.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              @{user.username}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">📧 {user.email}</p>
                        <p className="text-sm text-gray-600">
                          🏢 {user.company.name}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Posts Tab */}
                {activeTab === "posts" && (
                  <div className="space-y-4">
                    {posts.map((post) => (
                      <div
                        key={post.id}
                        className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 hover:shadow-lg transition-shadow"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">
                            {post.id}
                          </div>
                          <div className="flex-grow">
                            <h3 className="font-bold text-gray-800 mb-2 capitalize">
                              {post.title}
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {post.body}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Todos Tab */}
                {activeTab === "todos" && (
                  <div className="space-y-3">
                    {todos.map((todo) => (
                      <div
                        key={todo.id}
                        className={`rounded-xl p-4 hover:shadow-lg transition-all ${
                          todo.completed
                            ? "bg-gradient-to-br from-green-50 to-emerald-50"
                            : "bg-gradient-to-br from-yellow-50 to-orange-50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center text-xl ${
                              todo.completed ? "bg-green-500" : "bg-orange-500"
                            }`}
                          >
                            {todo.completed ? "✅" : "⏳"}
                          </div>
                          <div className="flex-grow">
                            <p
                              className={`font-medium ${
                                todo.completed
                                  ? "text-gray-500 line-through"
                                  : "text-gray-800"
                              }`}
                            >
                              {todo.title}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              todo.completed
                                ? "bg-green-200 text-green-800"
                                : "bg-orange-200 text-orange-800"
                            }`}
                          >
                            {todo.completed ? "Done" : "Pending"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
