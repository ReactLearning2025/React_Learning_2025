import React, { useState } from "react";

function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  });

  // Update form data (works for any field)
  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const isStep1Valid = formData.firstName && formData.lastName;
  const isStep2Valid = formData.email && formData.phone;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        📝 Multi-Step Form (Object State)
      </h2>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span
            className={`font-semibold ${
              step >= 1 ? "text-blue-600" : "text-gray-400"
            }`}
          >
            Step 1
          </span>
          <span
            className={`font-semibold ${
              step >= 2 ? "text-blue-600" : "text-gray-400"
            }`}
          >
            Step 2
          </span>
          <span
            className={`font-semibold ${
              step >= 3 ? "text-blue-600" : "text-gray-400"
            }`}
          >
            Step 3
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Step 1: Personal Info */}
      {step === 1 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            placeholder="First Name *"
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
          />
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            placeholder="Last Name *"
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
          />
        </div>
      )}

      {/* Step 2: Contact Info */}
      {step === 2 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="Email *"
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
          />
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="Phone Number *"
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
          />
        </div>
      )}

      {/* Step 3: Address Info */}
      {step === 3 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-4">Address Information</h3>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => handleChange("address", e.target.value)}
            placeholder="Street Address"
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
          />
          <input
            type="text"
            value={formData.city}
            onChange={(e) => handleChange("city", e.target.value)}
            placeholder="City"
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
          />

          {/* Summary */}
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <h4 className="font-bold mb-2">Review Your Information:</h4>
            <p>
              <strong>Name:</strong> {formData.firstName} {formData.lastName}
            </p>
            <p>
              <strong>Email:</strong> {formData.email}
            </p>
            <p>
              <strong>Phone:</strong> {formData.phone}
            </p>
            <p>
              <strong>Address:</strong> {formData.address}, {formData.city}
            </p>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={prevStep}
          disabled={step === 1}
          className={`px-6 py-2 rounded-lg transition ${
            step === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gray-500 text-white hover:bg-gray-600"
          }`}
        >
          Previous
        </button>

        {step < 3 ? (
          <button
            onClick={nextStep}
            disabled={
              (step === 1 && !isStep1Valid) || (step === 2 && !isStep2Valid)
            }
            className={`px-6 py-2 rounded-lg transition ${
              (step === 1 && !isStep1Valid) || (step === 2 && !isStep2Valid)
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Next
          </button>
        ) : (
          <button
            onClick={() => alert("Form Submitted! Check console for data")}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Submit
          </button>
        )}
      </div>

      <div className="mt-4 p-4 bg-yellow-50 rounded-lg text-sm">
        <strong>🧠 Concepts:</strong>
        <ul className="mt-2 space-y-1">
          <li>
            • Managing <strong>complex object state</strong>
          </li>
          <li>
            • <strong>Dynamic property updates</strong> with computed property
            names
          </li>
          <li>
            • <strong>Conditional rendering</strong> based on state
          </li>
          <li>
            • <strong>Form validation</strong> using state
          </li>
        </ul>
      </div>
    </div>
  );
}

export default MultiStepForm;
