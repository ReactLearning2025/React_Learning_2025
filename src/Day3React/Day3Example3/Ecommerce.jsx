import React, { useState, useRef } from 'react';

export default function EcommerceProductPage() {
  // Product data (in real app, this would come from API)
  const product = {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 199.99,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400",
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=400"
    ],
    colors: ["Black", "Silver", "Blue", "Red"],
    sizes: ["S", "M", "L"],
    stock: 15,
    description: "Experience premium sound quality with our wireless headphones. Featuring active noise cancellation, 30-hour battery life, and comfortable design.",
    rating: 4.5,
    reviews: 128
  };
  
  // STATE MANAGEMENT - Multiple pieces of state working together
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[1]); // Default to M
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  
  // Counter for generating unique IDs (useRef doesn't trigger re-renders)
  const idCounterRef = useRef(0);
  
  // HANDLERS - Functions that update state
  const handleQuantityChange = (action) => {
    if (action === "increase" && quantity < product.stock) {
      setQuantity(quantity + 1);
    } else if (action === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const addToCart = () => {
    const cartItem = {
      id: ++idCounterRef.current,
      productId: product.id,
      name: product.name,
      price: product.price,
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
      image: product.images[0]
    };
    
    setCart([...cart, cartItem]);
    showNotificationMessage(`Added ${quantity} item(s) to cart!`);
    setQuantity(1); // Reset quantity
  };
  
  const toggleWishlist = () => {
    const isInWishlist = wishlist.some(item => item.id === product.id);
    
    if (isInWishlist) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
      showNotificationMessage("Removed from wishlist");
    } else {
      setWishlist([...wishlist, { id: product.id, name: product.name }]);
      showNotificationMessage("Added to wishlist!");
    }
  };
  
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
    showNotificationMessage("Item removed from cart");
  };
  
  const showNotificationMessage = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };
  
  // DERIVED STATE - Calculated from existing state
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const isInWishlist = wishlist.some(item => item.id === product.id);
  const canAddToCart = quantity <= product.stock;
  
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Notification Toast */}
        {showNotification && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce">
            {notificationMessage}
          </div>
        )}
        
        {/* Header with Cart & Wishlist */}
        <div className="bg-white shadow-md rounded-lg p-4 mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">🛍️ E-commerce Store</h1>
          <div className="flex gap-4">
            <div className="relative">
              <button className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                ❤️ Wishlist
                {wishlist.length > 0 && (
                  <span className="bg-white text-red-500 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                    {wishlist.length}
                  </span>
                )}
              </button>
            </div>
            <div className="relative">
              <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                🛒 Cart
                {cartItemCount > 0 && (
                  <span className="bg-white text-blue-500 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* LEFT SIDE: Product Images */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="relative mb-4 bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-96 object-cover"
              />
              <button 
                onClick={toggleWishlist}
                className={`absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center text-2xl transition ${
                  isInWishlist 
                    ? 'bg-red-500 text-white' 
                    : 'bg-white text-gray-400 hover:text-red-500'
                }`}
              >
                {isInWishlist ? '❤️' : '🤍'}
              </button>
            </div>
            
            {/* Image Thumbnails */}
            <div className="flex gap-2">
              {product.images.map((img, index) => (
                <button
                title='View Image'
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-1 border-2 rounded-lg overflow-hidden transition ${
                    selectedImage === index 
                      ? 'border-blue-500' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-20 object-cover" />
                </button>
              ))}
            </div>
          </div>
          
          {/* RIGHT SIDE: Product Details */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h2>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-yellow-400">
                {'★'.repeat(Math.floor(product.rating))}
                {'☆'.repeat(5 - Math.floor(product.rating))}
              </div>
              <span className="text-gray-600">({product.reviews} reviews)</span>
            </div>
            
            {/* Price */}
            <div className="text-4xl font-bold text-blue-600 mb-4">
              ${product.price}
            </div>
            
            {/* Description */}
            <p className="text-gray-700 mb-6">{product.description}</p>
            
            {/* Color Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Color: <span className="text-blue-600">{selectedColor}</span>
              </label>
              <div className="flex gap-2">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-lg border-2 transition ${
                      selectedColor === color
                        ? 'border-blue-500 bg-blue-50 text-blue-600'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Size Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Size: <span className="text-blue-600">{selectedSize}</span>
              </label>
              <div className="flex gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-lg border-2 transition font-semibold ${
                      selectedSize === size
                        ? 'border-blue-500 bg-blue-50 text-blue-600'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Quantity:
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleQuantityChange("decrease")}
                  className="w-10 h-10 bg-gray-200 rounded-lg hover:bg-gray-300 transition font-bold"
                >
                  -
                </button>
                <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange("increase")}
                  className="w-10 h-10 bg-gray-200 rounded-lg hover:bg-gray-300 transition font-bold"
                >
                  +
                </button>
                <span className="text-sm text-gray-600">
                  ({product.stock} available)
                </span>
              </div>
            </div>
            
            {/* Add to Cart Button */}
            <button
              onClick={addToCart}
              disabled={!canAddToCart}
              className={`w-full py-4 rounded-lg text-white font-bold text-lg transition ${
                canAddToCart
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              🛒 Add to Cart - ${(product.price * quantity).toFixed(2)}
            </button>
          </div>
        </div>
        
        {/* Shopping Cart Preview */}
        {cart.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Shopping Cart ({cartItemCount} items)
            </h3>
            
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{item.name}</h4>
                    <p className="text-sm text-gray-600">
                      Color: {item.color} | Size: {item.size} | Qty: {item.quantity}
                    </p>
                    <p className="text-blue-600 font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition self-start"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t-2 border-gray-200">
              <div className="flex justify-between items-center text-2xl font-bold">
                <span>Total:</span>
                <span className="text-blue-600">${totalPrice.toFixed(2)}</span>
              </div>
              <button className="w-full mt-4 bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 transition font-bold text-lg">
                Proceed to Checkout →
              </button>
            </div>
          </div>
        )}
        
        {/* Explanation Panel */}
        <div className="mt-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-bold mb-4">🎓 What You're Learning</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h4 className="font-bold mb-2">📦 State Management</h4>
              <ul className="text-sm space-y-1">
                <li>• Multiple useState hooks working together</li>
                <li>• Array state (cart, wishlist)</li>
                <li>• Object state (cart items with properties)</li>
                <li>• Boolean state (notifications, wishlist toggle)</li>
              </ul>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h4 className="font-bold mb-2">🎯 Derived State</h4>
              <ul className="text-sm space-y-1">
                <li>• Total price calculated from cart</li>
                <li>• Cart item count from quantities</li>
                <li>• Wishlist status check</li>
                <li>• Stock availability validation</li>
              </ul>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h4 className="font-bold mb-2">⚡ Event Handling</h4>
              <ul className="text-sm space-y-1">
                <li>• onClick for buttons and selections</li>
                <li>• Complex handlers with multiple state updates</li>
                <li>• Conditional state updates</li>
                <li>• Timed state changes (notifications)</li>
              </ul>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h4 className="font-bold mb-2">🎨 UI Patterns</h4>
              <ul className="text-sm space-y-1">
                <li>• Conditional rendering based on state</li>
                <li>• Dynamic styling with state</li>
                <li>• List rendering with keys</li>
                <li>• Disabled states and validations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}