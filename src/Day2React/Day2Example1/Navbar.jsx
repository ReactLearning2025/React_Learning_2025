import React from "react";

// 1. We accept 'props' as an argument
function Navbar(props) {
  // Simple CSS styles for the demo
  const navStyle = {
    backgroundColor: "#333",
    color: "white",
    padding: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  return (
    <nav style={navStyle}>
      <h2>MyStore</h2>
      {/* 2. We access the data using props.username */}
      <div className="user-info">
        <span>
          Welcome, <strong>{props.username}</strong>!
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
