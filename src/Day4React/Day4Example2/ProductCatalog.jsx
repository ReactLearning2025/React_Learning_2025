import { useState } from "react";

export default function ProductCatalog() {
  // Product data array - In real app, this comes from API
  const [products] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      price: 79.99,
      category: "Electronics",
      inStock: true,
      rating: 4.5,
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 199.99,
      category: "Electronics",
      inStock: true,
      rating: 4.8,
    },
    {
      id: 3,
      name: "Running Shoes",
      price: 89.99,
      category: "Sports",
      inStock: false,
      rating: 4.3,
    },
    {
      id: 4,
      name: "Yoga Mat",
      price: 29.99,
      category: "Sports",
      inStock: true,
      rating: 4.6,
    },
    {
      id: 5,
      name: "Coffee Maker",
      price: 49.99,
      category: "Home",
      inStock: true,
      rating: 4.2,
    },
    {
      id: 6,
      name: "Desk Lamp",
      price: 34.99,
      category: "Home",
      inStock: true,
      rating: 4.4,
    },
    {
      id: 7,
      name: "Bluetooth Speaker",
      price: 59.99,
      category: "Electronics",
      inStock: false,
      rating: 4.7,
    },
    {
      id: 8,
      name: "Dumbbell Set",
      price: 119.99,
      category: "Sports",
      inStock: true,
      rating: 4.9,
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showOnlyInStock, setShowOnlyInStock] = useState(false);
  const [cart, setCart] = useState([]);

  // Filter products based on conditions
  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategory === "All" || product.category === selectedCategory;
    const stockMatch = !showOnlyInStock || product.inStock;
    return categoryMatch && stockMatch;
  });

  const addToCart = (productId) => {
    if (!cart.includes(productId)) {
      setCart([...cart, productId]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((id) => id !== productId));
  };

  const categories = ["All", "Electronics", "Sports", "Home"];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-800">
              Product Catalog
            </h1>

            {/* Cart indicator - Conditional rendering with && */}
            {cart.length > 0 && (
              <div className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold">
                🛒 Cart: {cart.length} items
              </div>
            )}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            {/* Category Filter - Rendering list of buttons */}
            <div className="flex gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    selectedCategory === category
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Stock Filter - Checkbox */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showOnlyInStock}
                onChange={(e) => setShowOnlyInStock(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-gray-700">In Stock Only</span>
            </label>
          </div>
        </div>

        {/* Products count */}
        <div className="mb-4 text-gray-600">
          Showing {filteredProducts.length} of {products.length} products
        </div>

        {/* Product Grid - Rendering filtered list */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const isInCart = cart.includes(product.id);

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300"
                >
                  {/* Product Image Placeholder */}
                  <div className="bg-gradient-to-br from-blue-100 to-purple-100 h-48 flex items-center justify-center">
                    <span className="text-6xl">📦</span>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-800 text-lg">
                        {product.name}
                      </h3>

                      {/* Stock Badge - Conditional rendering */}
                      {product.inStock ? (
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                          In Stock
                        </span>
                      ) : (
                        <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded">
                          Out of Stock
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-gray-500 mb-2">
                      {product.category}
                    </p>

                    {/* Rating - Rendering stars */}
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, index) => (
                        <span
                          key={index}
                          className={
                            index < Math.floor(product.rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }
                        >
                          ★
                        </span>
                      ))}
                      <span className="text-sm text-gray-600 ml-1">
                        {product.rating}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-gray-800">
                        ${product.price}
                      </span>

                      {/* Add/Remove Cart Button - Conditional rendering */}
                      {product.inStock ? (
                        isInCart ? (
                          <button
                            onClick={() => removeFromCart(product.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                          >
                            Remove
                          </button>
                        ) : (
                          <button
                            onClick={() => addToCart(product.id)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
                          >
                            Add to Cart
                          </button>
                        )
                      ) : (
                        <button
                          disabled
                          className="bg-gray-300 text-gray-500 px-4 py-2 rounded-lg cursor-not-allowed"
                        >
                          Unavailable
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // No products found - Conditional rendering
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <span className="text-6xl mb-4 block">🔍</span>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              No Products Found
            </h3>
            <p className="text-gray-500">
              Try adjusting your filters to see more products
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
