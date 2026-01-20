import React, { useState } from "react";

function ShoppingCart() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const addItem = () => {
    if (inputValue.trim()) {
      // Add new item with unique ID
      const newItem = {
        id: Date.now(),
        name: inputValue,
        quantity: 1,
      };
      setItems([...items, newItem]); // Spread operator to create new array
      setInputValue("");
    }
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const increaseQuantity = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setItems(
      items.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        🛒 Shopping Cart (Array State)
      </h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addItem()}
          placeholder="Enter item name..."
          className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
        />
        <button
          onClick={addItem}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Add Item
        </button>
      </div>

      <div className="space-y-2 mb-4">
        {items.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            Cart is empty. Add some items!
          </p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <span className="font-semibold text-gray-700">{item.name}</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="bg-gray-300 text-gray-700 w-8 h-8 rounded hover:bg-gray-400 transition"
                >
                  -
                </button>
                <span className="w-8 text-center font-bold">
                  {item.quantity}
                </span>
                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="bg-gray-300 text-gray-700 w-8 h-8 rounded hover:bg-gray-400 transition"
                >
                  +
                </button>
                <button
                  onClick={() => removeItem(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition ml-2"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-4 bg-blue-50 rounded-lg">
        <p className="font-bold text-lg">Total Items: {totalItems}</p>
      </div>

      <div className="mt-4 p-4 bg-yellow-50 rounded-lg text-sm">
        <strong>🧠 Concepts:</strong>
        <ul className="mt-2 space-y-1">
          <li>
            • Using <strong>arrays</strong> in state
          </li>
          <li>
            • <strong>Immutable updates</strong> (spread operator, map, filter)
          </li>
          <li>
            • Working with <strong>objects</strong> inside arrays
          </li>
          <li>
            • <strong>Keys</strong> for list items (using unique IDs)
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ShoppingCart;
