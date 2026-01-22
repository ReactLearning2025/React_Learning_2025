import React, { useState, useEffect } from "react";

export default function PageTitleUpdater() {
  const [count, setCount] = useState(0);

  // This useEffect runs every time 'count' changes
  useEffect(() => {
    // Update the browser tab title
    document.title = `Count: ${count}`;

    console.log("Title updated to:", count);

    // Cleanup function (optional here)
    return () => {
      console.log("Cleaning up...");
    };
  }, [count]); // Dependency array - runs when count changes

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          📝 Page Title Updater
        </h1>

        <div className="bg-blue-100 border-l-4 border-blue-500 p-4 mb-6">
          <p className="text-sm text-blue-700">
            👀 <strong>Watch your browser tab!</strong> The title changes with
            the count.
          </p>
        </div>

        <div className="text-center mb-6">
          <div className="text-6xl font-bold text-purple-600 mb-4">{count}</div>

          <button
            onClick={() => setCount(count + 1)}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition"
          >
            Increment Counter
          </button>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-700 mb-2">📖 How it works:</h3>
          <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
            <li>Click button to increase count</li>
            <li>useEffect detects count changed</li>
            <li>Updates browser tab title</li>
            <li>Check your browser tab above! 👆</li>
          </ol>
        </div>

        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-xs text-yellow-800">
            <strong>💡 Key Concept:</strong> useEffect with dependency array
            [count] runs only when 'count' changes, not on every render.
          </p>
        </div>
      </div>
    </div>
  );
}
