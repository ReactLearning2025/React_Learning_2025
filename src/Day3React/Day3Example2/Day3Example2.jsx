import React from "react";
import ShoppingCart from "./ShoppingCart";
import MultiStepForm from "./MultiStepForm.jsx";
import TodoApp from "./TodoApp.jsx";
import Counter from "../Day3Example1/Counter.jsx";

function Day3Example2() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          React State: Intermediate to Advanced
        </h1>

        <ShoppingCart />
        <MultiStepForm />
        <TodoApp />
        <Counter></Counter>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-3 text-gray-800">
            🎯 Master These Patterns
          </h3>
          <div className="space-y-3 text-gray-700">
            <div className="p-3 bg-blue-50 rounded-lg">
              <strong>Arrays in State:</strong> Always use immutable methods
              (spread, map, filter) - never mutate directly!
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <strong>Objects in State:</strong> Use spread operator{" "}
              {`{...obj}`} to create new objects when updating
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <strong>Multiple States:</strong> It's okay to have many useState
              hooks - keep related data together
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <strong>Derived State:</strong> Calculate values from existing
              state instead of storing them separately
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Day3Example2;
