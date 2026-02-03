import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";

function TodoApp() {
  // States
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);

  // Component load hone pe todos fetch karo
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos?_limit=5",
        );
        const data = await response.json();
        setTodos(data);
        setLoading(false);
        console.log("✅ Todos fetched:", data);
      } catch (error) {
        console.error("❌ Fetch error:", error);
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  // 2. CREATE - Naya todo add karo (POST)
  const addTodo = async (e) => {
    e.preventDefault();

    if (!newTodo.trim()) {
      alert("Please enter a todo!");
      return;
    }

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: newTodo,
            completed: false,
            userId: 1,
          }),
        },
      );

      const data = await response.json();
      console.log("✅ Todo added:", data);

      // Naya todo list mein add karo
      setTodos([data, ...todos]);
      setNewTodo(""); // Input clear karo
    } catch (error) {
      console.error("❌ Add error:", error);
      alert("Failed to add todo!");
    }
  };

  // 3. UPDATE - Todo complete/incomplete toggle (PATCH)
  const toggleTodo = async (id) => {
    const todo = todos.find((t) => t.id === id);

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            completed: !todo.completed,
          }),
        },
      );

      const data = await response.json();
      console.log("✅ Todo toggled:", data);

      // State mein update karo
      setTodos(
        todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
      );
    } catch (error) {
      console.error("❌ Toggle error:", error);
    }
  };

  // 4. DELETE - Todo delete karo (DELETE)
  const deleteTodo = async (id) => {
    if (!window.confirm("Are you sure you want to delete this todo?")) {
      return;
    }

    try {
      await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: "DELETE",
      });

      console.log("✅ Todo deleted:", id);

      // State se remove karo
      setTodos(todos.filter((t) => t.id !== id));
    } catch (error) {
      console.error("❌ Delete error:", error);
      alert("Failed to delete todo!");
    }
  };

  // Edit modal open karo
  const openEditModal = (todo) => {
    setEditingTodo(todo);
  };

  // Todo update karo
  const updateTodo = async () => {
    if (!editingTodo.title.trim()) {
      alert("Todo title cannot be empty!");
      return;
    }

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${editingTodo.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingTodo),
        },
      );

      const data = await response.json();
      console.log("✅ Todo updated:", data);

      // State mein update karo
      setTodos(todos.map((t) => (t.id === editingTodo.id ? editingTodo : t)));
      setEditingTodo(null);
    } catch (error) {
      console.error("❌ Update error:", error);
      alert("Failed to update todo!");
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-2xl text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-500 mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-700">
            Loading Todos...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4">Todo App</h1>
          <p className="text-xl text-white opacity-90">Full CRUD Operations</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-4xl font-bold text-purple-500">
              {todos.length}
            </div>
            <div className="text-gray-600 mt-2">Total</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-4xl font-bold text-green-500">
              {todos.filter((t) => t.completed).length}
            </div>
            <div className="text-gray-600 mt-2">Completed</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-4xl font-bold text-orange-500">
              {todos.filter((t) => !t.completed).length}
            </div>
            <div className="text-gray-600 mt-2">Pending</div>
          </div>
        </div>

        {/* Add Todo Form */}
        <form
          onSubmit={addTodo}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex gap-4">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="What needs to be done?"
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-purple-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-purple-600 transition hover:scale-105"
            >
              Add Todo
            </button>
          </div>
        </form>

        {/* Todos List */}
        <div className="space-y-4">
          {todos.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center shadow-lg">
              <div className="text-6xl mb-4"></div>
              <h3 className="text-2xl font-semibold text-gray-700">
                No todos yet!
              </h3>
              <p className="text-gray-500 mt-2">Add your first todo above</p>
            </div>
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={openEditModal}
              />
            ))
          )}
        </div>

        {/* Edit Modal */}
        {editingTodo && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Edit Todo
              </h3>
              <input
                type="text"
                value={editingTodo.title}
                onChange={(e) =>
                  setEditingTodo({ ...editingTodo, title: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none mb-6"
              />
              <div className="flex gap-4">
                <button
                  onClick={updateTodo}
                  className="flex-1 bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600 transition"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingTodo(null)}
                  className="flex-1 bg-gray-400 text-white py-3 rounded-lg font-bold hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoApp;
