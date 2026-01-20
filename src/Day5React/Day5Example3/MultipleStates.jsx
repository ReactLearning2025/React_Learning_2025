import React, { useState } from "react";

export default function MultipleStates({ initialData = {} }) {
  const [firstName, setFirstName] = useState(initialData.firstName || "");
  const [lastName, setLastName] = useState(initialData.lastName || "");
  const [email, setEmail] = useState(initialData.email || "");

  return (
    <div className="mb-6 p-4 border rounded-md bg-white">
      <h3 className="font-semibold mb-2">Multiple States Form</h3>
      <form className="space-y-2">
        <input
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full px-2 py-1 border rounded"
        />
        <input
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full px-2 py-1 border rounded"
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-2 py-1 border rounded"
        />
      </form>

      <div className="mt-3 text-sm text-gray-700">
        <div>
          <strong>Current:</strong> {firstName} {lastName}
        </div>
        <div>
          <strong>Email:</strong> {email}
        </div>
      </div>
    </div>
  );
}
