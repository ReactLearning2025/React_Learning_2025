import React, { useState } from "react";

export default function SingleStateObject({ initialData = {} }) {
  const [formData, setFormData] = useState({
    firstName: initialData.firstName || "",
    lastName: initialData.lastName || "",
    email: initialData.email || "",
  });

  // Single handler for all inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData, // Keep existing values
      [name]: value, // Update only the changed field
    }));
  };

  return (
    <div className="mb-6 p-4 border rounded-md bg-white">
      <h3 className="font-semibold mb-2">Single State Object Form</h3>
      <form className="space-y-2">
        <input
          name="firstName"
          placeholder="First name"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full px-2 py-1 border rounded"
        />
        <input
          name="lastName"
          placeholder="Last name"
          value={formData.lastName}
          onChange={handleChange}
          className="w-full px-2 py-1 border rounded"
        />
        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-2 py-1 border rounded"
        />
      </form>

      <div className="mt-3 text-sm text-gray-700">
        <div>
          <strong>Current:</strong> {formData.firstName} {formData.lastName}
        </div>
        <div>
          <strong>Email:</strong> {formData.email}
        </div>
      </div>
    </div>
  );
}
