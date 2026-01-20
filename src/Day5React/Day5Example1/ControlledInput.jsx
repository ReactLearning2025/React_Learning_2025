import React, { useState } from "react";

function ControlledInput() {
  const [name, setName] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div>
      <label>Enter your name: </label>
      <input
        type="text"
        value={name} // Controlled by state
        onChange={handleChange} // Updates state on every keystroke
      />
      <p>You typed: {name}</p>
    </div>
  );
}

export default ControlledInput;
