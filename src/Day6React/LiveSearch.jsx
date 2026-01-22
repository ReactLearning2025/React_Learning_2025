import { useState, useEffect } from "react";

export default function LiveSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);

  // Effect 1: Fetch all users on component mount
  useEffect(() => {
    console.log("📡 Fetching all users on mount...");

    async function fetchAllUsers() {
      setLoading(true);
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
        );
        const data = await response.json();
        setAllUsers(data);
        setUsers(data); // Show all users initially
        console.log("✅ All users loaded:", data.length);
      } catch (error) {
        console.error("❌ Error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAllUsers();
  }, []); // Run only once

  // Effect 2: Search/filter users when searchTerm changes (with debouncing)
  useEffect(() => {
    // Don't search if term is empty
    if (searchTerm.trim() === "") {
      setUsers(allUsers);
      setSearching(false);
      return;
    }

    console.log("🔍 Search term changed:", searchTerm);
    setSearching(true);

    // Debouncing: Wait 500ms before searching
    // This prevents searching on every keystroke
    const timeoutId = setTimeout(() => {
      console.log("⏰ Debounce completed, searching now...");

      const filteredUsers = allUsers.filter((user) => {
        const searchLower = searchTerm.toLowerCase();
        return (
          user.name.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower) ||
          user.username.toLowerCase().includes(searchLower) ||
          user.company.name.toLowerCase().includes(searchLower)
        );
      });

      setUsers(filteredUsers);
      setSearching(false);
      console.log("✅ Found", filteredUsers.length, "matching users");
    }, 500); // 500ms delay

    // Cleanup function: Cancel previous timeout if user types again
    return () => {
      console.log("🧹 Cleaning up previous search timeout");
      clearTimeout(timeoutId);
    };
  }, [searchTerm, allUsers]); // Run when searchTerm or allUsers changes

  // Handle input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-2">
            🔍 Live User Search
          </h1>
          <p className="text-gray-600">
            Search by name, email, username, or company
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Type to search users..."
              className="w-full px-6 py-4 pr-24 text-lg border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
            />

            {/* Search Icon or Loading Spinner */}
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              {searching ? (
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-purple-500 border-t-transparent"></div>
              ) : searchTerm ? (
                <button
                  onClick={clearSearch}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ✕
                </button>
              ) : (
                <span className="text-gray-400 text-2xl">🔍</span>
              )}
            </div>
          </div>

          {/* Search Stats */}
          <div className="mt-4 text-sm text-gray-600">
            {searchTerm ? (
              <p>
                Found{" "}
                <strong className="text-purple-600">{users.length}</strong>{" "}
                result(s) for "<strong>{searchTerm}</strong>"
              </p>
            ) : (
              <p>
                Showing all <strong>{allUsers.length}</strong> users
              </p>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent"></div>
            <p className="mt-4 text-xl text-gray-700">Loading users...</p>
          </div>
        ) : users.length === 0 ? (
          // No Results
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No users found
            </h3>
            <p className="text-gray-600">
              Try searching with different keywords
            </p>
          </div>
        ) : (
          // User List
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-start">
                  {/* Avatar */}
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                    {user.name.charAt(0)}
                  </div>

                  {/* User Info */}
                  <div className="ml-4 flex-grow">
                    <h3 className="text-xl font-bold text-gray-800">
                      {user.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      @{user.username}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center text-gray-600">
                        <span className="mr-2">📧</span>
                        <span className="truncate">{user.email}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <span className="mr-2">🏢</span>
                        <span className="truncate">{user.company.name}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
