import React, { useState } from "react";

// Example 1: Simple Counter
function Counter2() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        1. Simple Counter
      </h2>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setCount(count - 1)}
          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Decrease -
        </button>

        <span className="text-4xl font-bold text-blue-600 min-w-[80px] text-center">
          {count}
        </span>

        <button
          onClick={() => setCount(count + 1)}
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
        >
          Increase +
        </button>
      </div>

      <button
        onClick={() => setCount(0)}
        className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
      >
        Reset
      </button>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-gray-700">
          <strong>How it works:</strong> Each button click calls{" "}
          <code className="bg-gray-200 px-2 py-1 rounded">setCount()</code>{" "}
          which updates the state and re-renders the component.
        </p>
      </div>
    </div>
  );
}

export default Counter2;
