import React from "react";
import UserPost from "./UserPost"; // Import the component we made

function Day2Example2() {
  return (
    <div>
      <h1>My Social Feed</h1>

      {/* Post #1 */}
      <UserPost
        handle="elon_musk_parody"
        message="I am going to buy Mars tomorrow!"
        timestamp="2 mins ago"
      />

      {/* Post #2 - Same Component, DIFFERENT Data */}
      <UserPost
        handle="react_fan"
        message="Components make life so much easier."
        timestamp="1 hour ago"
      />

      {/* Post #3 */}
      <UserPost
        handle="new_coder"
        message="Does anyone know how to center a Div?"
        timestamp="5 hours ago"
      />

      <UserPost
        handle="zuk_musk_parody"
        message="I am going to buy facebook tomorrow!"
        timestamp="2 mins ago"
      />
    </div>
  );
}

export default Day2Example2;
