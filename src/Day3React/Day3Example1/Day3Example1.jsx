import React from "react";
import Counter2 from "./Counter.jsx";
import LiveInput from "./LiveInput.jsx";
import LoginToggle from "./LoginToggle.jsx";

function Day3Example2() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          React State Basics Examples
        </h1>

        <Counter2 />
        <LiveInput />
        <LoginToggle />

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-3 text-gray-800">
            Key Takeaways
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-green-500 font-bold">✓</span>
              <span>State remembers data between renders</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 font-bold">✓</span>
              <span>
                Use{" "}
                <code className="bg-gray-200 px-2 py-1 rounded">
                  useState()
                </code>{" "}
                to create state variables
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 font-bold">✓</span>
              <span>
                Always use the setter function (like{" "}
                <code className="bg-gray-200 px-2 py-1 rounded">setCount</code>)
                to update state
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 font-bold">✓</span>
              <span>React re-renders automatically when state changes</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Day3Example2;
