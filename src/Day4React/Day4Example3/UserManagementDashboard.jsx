import { useState } from "react";

export default function UserManagementDashboard() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      status: "active",
      joinDate: "2023-01-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "User",
      status: "active",
      joinDate: "2023-02-20",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      role: "User",
      status: "inactive",
      joinDate: "2023-03-10",
    },
    {
      id: 4,
      name: "Sarah Williams",
      email: "sarah@example.com",
      role: "Moderator",
      status: "active",
      joinDate: "2023-04-05",
    },
    {
      id: 5,
      name: "Tom Brown",
      email: "tom@example.com",
      role: "User",
      status: "suspended",
      joinDate: "2023-05-12",
    },
  ]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [filterRole, setFilterRole] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'table'

  // Complex filtering logic
  const filteredUsers = users.filter((user) => {
    const roleMatch = filterRole === "All" || user.role === filterRole;
    const statusMatch = filterStatus === "All" || user.status === filterStatus;
    const searchMatch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    return roleMatch && statusMatch && searchMatch;
  });

  const toggleUserStatus = (userId) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? {
              ...user,
              status: user.status === "active" ? "inactive" : "active",
            }
          : user,
      ),
    );
  };

  const deleteUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
    if (selectedUser?.id === userId) {
      setSelectedUser(null);
    }
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";
      case "inactive":
        return "bg-gray-100 text-gray-700";
      case "suspended":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "Admin":
        return "👑";
      case "Moderator":
        return "🛡️";
      case "User":
        return "👤";
      default:
        return "👤";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            User Management
          </h1>

          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            {/* Search */}
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Role Filter */}
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Moderator">Moderator</option>
              <option value="User">User</option>
            </select>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>

            {/* View Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`flex-1 py-2 rounded-lg transition ${
                  viewMode === "grid"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`flex-1 py-2 rounded-lg transition ${
                  viewMode === "table"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Table
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-sm text-gray-600">
            Showing {filteredUsers.length} of {users.length} users
            {searchTerm && ` for "${searchTerm}"`}
          </div>
        </div>

        {/* Conditional rendering based on filtered results */}
        {filteredUsers.length === 0 ? (
          // Empty State
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <span className="text-6xl mb-4 block">🔍</span>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              No Users Found
            </h3>
            <p className="text-gray-500">
              Try adjusting your filters or search term
            </p>
          </div>
        ) : viewMode === "grid" ? (
          // Grid View
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition cursor-pointer"
                onClick={() => setSelectedUser(user)}
              >
                {/* User Avatar */}
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-br from-blue-400 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-lg">
                      {user.name}
                    </h3>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>

                {/* Role and Status */}
                <div className="flex gap-2 mb-4">
                  <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">
                    {getRoleIcon(user.role)} {user.role}
                  </span>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(
                      user.status,
                    )}`}
                  >
                    {user.status}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleUserStatus(user.id);
                    }}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 rounded transition"
                  >
                    {user.status === "active" ? "Deactivate" : "Activate"}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteUser(user.id);
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Table View
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Join Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="bg-gradient-to-br from-blue-400 to-purple-500 w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">
                        {getRoleIcon(user.role)} {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(
                          user.status,
                        )}`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(user.joinDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleUserStatus(user.id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded transition"
                        >
                          Toggle
                        </button>
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* User Detail Modal - Conditional rendering with && */}
        {selectedUser && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
            onClick={() => setSelectedUser(null)}
          >
            <div
              className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  User Details
                </h2>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-gradient-to-br from-blue-400 to-purple-500 w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-bold mr-4">
                    {selectedUser.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">
                      {selectedUser.name}
                    </h3>
                    <p className="text-gray-500">{selectedUser.email}</p>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Role:</span>
                    <span className="font-medium">
                      {getRoleIcon(selectedUser.role)} {selectedUser.role}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        selectedUser.status,
                      )}`}
                    >
                      {selectedUser.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Joined:</span>
                    <span className="font-medium">
                      {new Date(selectedUser.joinDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="border-t pt-4 flex gap-2">
                  <button
                    onClick={() => {
                      toggleUserStatus(selectedUser.id);
                      setSelectedUser({
                        ...selectedUser,
                        status:
                          selectedUser.status === "active"
                            ? "inactive"
                            : "active",
                      });
                    }}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
                  >
                    Toggle Status
                  </button>
                  <button
                    onClick={() => {
                      deleteUser(selectedUser.id);
                      setSelectedUser(null);
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
