import React, { useState } from "react";

function LiveInput() {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        2. Live Input Preview
      </h2>

      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Type something..."
        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none mb-4"
      />

      <div className="p-4 bg-purple-50 rounded-lg">
        <p className="text-gray-700 mb-2">
          <strong>Live Preview:</strong>
        </p>
        <p className="text-xl text-purple-600 font-semibold">
          {text || "Nothing typed yet..."}
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Character count: {text.length}
        </p>
      </div>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-gray-700">
          <strong>How it works:</strong> The{" "}
          <code className="bg-gray-200 px-2 py-1 rounded">onChange</code> event
          fires every time you type, updating the state with{" "}
          <code className="bg-gray-200 px-2 py-1 rounded">setText()</code>.
        </p>
      </div>
    </div>
  );
}

export default LiveInput;
