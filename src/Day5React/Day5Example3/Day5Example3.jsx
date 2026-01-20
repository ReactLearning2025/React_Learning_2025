import React from "react";
import MultipleStates from "./MultipleStates";
import SingleStateObject from "./SingleStateObject";

export default function Day5Example3() {
  const sampleData = {
    firstName: "Sharique",
    lastName: "Husain",
    email: "sharique.husain@example.com",
  };

  return (
    <div className="space-y-6 p-6 bg-gray-100">
      <MultipleStates initialData={sampleData} />
      <SingleStateObject initialData={sampleData} />
    </div>
  );
}
