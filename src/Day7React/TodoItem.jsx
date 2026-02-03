import React from "react";

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between hover:shadow-lg transition">
      {/* Todo Title */}
      <div className="flex items-center flex-1">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="w-5 h-5 mr-4 cursor-pointer"
        />
        <span
          className={`text-lg ${todo.completed ? "line-through text-gray-400" : "text-gray-800"}`}
        >
          {todo.title}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(todo)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition font-semibold"
        >
          ✏️ Edit
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition font-semibold"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
