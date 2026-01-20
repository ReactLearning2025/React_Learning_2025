import React from "react";
import Navbar from "./Navbar";
import ProductCard from "./ProductCard";
import VideoItem from "../Day2Example3/VideoItem";

function Day2Example1() {
  // Global styles for the container
  const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: "20px",
  };

  return (
    <div>
      {/* 1. Using Navbar and passing a specific username */}
      <Navbar username="Sharique_Developer" />

      <h1 style={{ textAlign: "center" }}>Featured Products</h1>

      {/* 2. Reusing the ProductCard component with DIFFERENT data */}
      <div style={containerStyle}>
        <ProductCard itemName="Wireless Headphones" price="$59.99" />

        <ProductCard itemName="Mechanical Keyboard" price="$120.00" />

        <ProductCard itemName="Gaming Mouse" price="$45.50" />
      </div>

      <VideoItem
        title="Top 10 CSS Tricks"
        channel="DesignPro"
        views="850K"
        thumbnailUrl="https://img.youtube.com/vi/K74l26pE4YA/mqdefault.jpg"
        url="https://www.youtube.com/watch?v=K74l26pE4YA"
      />
    </div>
  );
}

export default Day2Example1;
