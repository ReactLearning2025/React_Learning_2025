import React from "react";
import Button from "./Button";

function ProductCard(props) {
  // Styles for the card
  const cardStyle = {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    width: "200px",
    textAlign: "center",
    margin: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  };

  return (
    <div style={cardStyle}>
      {/* Dynamic Data from Props */}
      <h3>{props.itemName}</h3>
      <p style={{ color: "green", fontWeight: "bold" }}>{props.price}</p>

      {/* Reusable Button */}
      <Button />
    </div>
  );
}

export default ProductCard;
