import React from "react";
import VideoItem from "./VideoItem";

function Day2Example3() {
  return (
    <div style={{ padding: "20px", maxWidth: "600px" }}>
      <h2>Recommended for you</h2>

      {/* Video 1 */}
      <VideoItem
        title="Learn React in 10 Minutes"
        channel="CodeMaster"
        views="1.2M"
        thumbnailUrl="https://img.youtube.com/vi/w7ejDZ8SWv8/mqdefault.jpg"
        url="https://www.youtube.com/watch?v=w7ejDZ8SWv8"
      />

      {/* Video 2 */}
      <VideoItem
        title="Top 10 CSS Tricks"
        channel="DesignPro"
        views="850K"
        thumbnailUrl="https://img.youtube.com/vi/K74l26pE4YA/mqdefault.jpg"
        url="https://www.youtube.com/watch?v=K74l26pE4YA"
      />

      {/* Video 3 */}
      <VideoItem
        title="My Day in the Life of a Dev"
        channel="VloggerJane"
        views="45K"
        thumbnailUrl="https://img.youtube.com/vi/5p2ua_A_T1I/mqdefault.jpg"
        url="https://youtu.be/GAPc_-fD2C8?si=xGQ3xMWtaLf2exMZ"
      />
    </div>
  );
}

export default Day2Example3;
