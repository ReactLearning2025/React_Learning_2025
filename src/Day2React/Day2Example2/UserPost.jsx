import React from "react";

// The component receives 'props' (the data package)
function UserPost(props) {
  // 1. Let's add some CSS to make it look like a real card
  const postStyle = {
    border: "1px solid #ccc",
    padding: "20px",
    margin: "15px",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    maxWidth: "400px", // Keeps the card from getting too wide
  };

  return (
    <div style={postStyle}>
      {/* 2. Using the data passed in via props */}
      <h3 style={{ color: "blue", margin: "0 0 10px 0" }}>@{props.handle}</h3>

      <p style={{ fontSize: "16px" }}>{props.message}</p>

      <div style={{ fontSize: "12px", color: "gray", marginTop: "10px" }}>
        Posted: {props.timestamp}
      </div>
    </div>
  );
}

export default UserPost;
