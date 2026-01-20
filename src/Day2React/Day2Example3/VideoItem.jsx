import React from "react";

function VideoItem(props) {
  // 1. Style for the link (so it doesn't look like a blue text link)
  const linkStyle = {
    display: "flex", // Keeps layout side-by-side
    border: "1px solid #ddd",
    marginBottom: "10px",
    padding: "10px",
    borderRadius: "8px",
    alignItems: "center",
    textDecoration: "none", // Removes the underline
    color: "black", // Keeps text black
    cursor: "pointer", // Shows the hand icon on hover
  };

  const imageStyle = {
    width: "120px",
    height: "80px",
    borderRadius: "8px",
    marginRight: "15px",
    objectFit: "cover",
  };

  return (
    // 2. We use an Anchor tag <a> here instead of just a <div>
    // We bind the href to the 'url' prop we will receive
    <a href={props.url} style={linkStyle} target="_blank" rel="noreferrer">
      {/* The Image */}
      <img src={props.thumbnailUrl} alt="Thumbnail" style={imageStyle} />

      {/* The Text Info */}
      <div>
        <h4 style={{ margin: "0 0 5px 0" }}>{props.title}</h4>
        <p style={{ margin: 0, color: "#606060", fontSize: "14px" }}>
          {props.channel} • {props.views} views
        </p>
      </div>
    </a>
  );
}

export default VideoItem;
