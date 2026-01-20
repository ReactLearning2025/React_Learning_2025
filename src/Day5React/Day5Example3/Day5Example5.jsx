import { useState } from "react";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    gender: "",
    country: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const countries = [
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "India",
    "Germany",
    "France",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));

    if (name === "password") {
      calculatePasswordStrength(value);
    }

    if (touchedFields[name]) {
      validateField(name, fieldValue);
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouchedFields((prev) => ({
      ...prev,
      [name]: true,
    }));
    validateField(name, formData[name]);
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    setPasswordStrength(strength);
  };

  const validateField = (fieldName, value) => {
    let error = "";

    switch (fieldName) {
      case "firstName":
        if (!value.trim()) {
          error = "First name is required";
        } else if (value.trim().length < 2) {
          error = "First name must be at least 2 characters";
        }
        break;

      case "lastName":
        if (!value.trim()) {
          error = "Last name is required";
        } else if (value.trim().length < 2) {
          error = "Last name must be at least 2 characters";
        }
        break;

      case "email": {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          error = "Email is required";
        } else if (!emailRegex.test(value)) {
          error = "Please enter a valid email address";
        }
        break;
      }

      case "phone": {
        const phoneRegex = /^\+?[\d\s-()]{10,}$/;
        if (!value.trim()) {
          error = "Phone number is required";
        } else if (!phoneRegex.test(value)) {
          error = "Please enter a valid phone number";
        }
        break;
      }

      case "password":
        if (!value) {
          error = "Password is required";
        } else if (value.length < 8) {
          error = "Password must be at least 8 characters";
        } else if (passwordStrength < 2) {
          error = "Password is too weak. Use uppercase, lowercase, and numbers";
        }
        break;

      case "confirmPassword":
        if (!value) {
          error = "Please confirm your password";
        } else if (value !== formData.password) {
          error = "Passwords do not match";
        }
        break;

      case "dateOfBirth":
        if (!value) {
          error = "Date of birth is required";
        } else {
          const age = new Date().getFullYear() - new Date(value).getFullYear();
          if (age < 18) {
            error = "You must be at least 18 years old";
          }
        }
        break;

      case "gender":
        if (!value) {
          error = "Please select your gender";
        }
        break;

      case "country":
        if (!value) {
          error = "Please select your country";
        }
        break;

      case "agreeToTerms":
        if (!value) {
          error = "You must agree to the terms and conditions";
        }
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [fieldName]: error,
    }));

    return error === "";
  };

  const validateAllFields = () => {
    const fields = Object.keys(formData);
    let isValid = true;

    fields.forEach((field) => {
      if (!validateField(field, formData[field])) {
        isValid = false;
      }
    });

    setTouchedFields(
      fields.reduce((acc, field) => ({ ...acc, [field]: true }), {}),
    );

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateAllFields()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Registration data:", formData);
      setSubmitSuccess(true);

      setTimeout(() => {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
          dateOfBirth: "",
          gender: "",
          country: "",
          agreeToTerms: false,
        });
        setTouchedFields({});
        setPasswordStrength(0);
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return "bg-red-500";
    if (passwordStrength <= 2) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return "Very Weak";
    if (passwordStrength === 1) return "Weak";
    if (passwordStrength === 2) return "Fair";
    if (passwordStrength === 3) return "Good";
    return "Strong";
  };

  const getPasswordStrengthTextColor = () => {
    if (passwordStrength === 0) return "text-red-500";
    if (passwordStrength <= 2) return "text-yellow-600";
    return "text-green-600";
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700 p-5">
        <div className="bg-white rounded-xl shadow-2xl p-16 text-center max-w-lg">
          <div className="text-6xl mb-5">✅</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Registration Successful!
          </h2>
          <p className="text-gray-600">
            Welcome aboard! Your account has been created successfully.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700 p-10">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Create Account
          </h2>
          <p className="text-gray-600 text-sm">
            Fill in your details to get started
          </p>
        </div>

        <div className="space-y-5">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="John"
                className={`w-full px-4 py-3 rounded-lg border ${
                  touchedFields.firstName && errors.firstName
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-purple-500"
                } focus:ring-2 focus:outline-none transition`}
              />
              {touchedFields.firstName && errors.firstName && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.firstName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Doe"
                className={`w-full px-4 py-3 rounded-lg border ${
                  touchedFields.lastName && errors.lastName
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-purple-500"
                } focus:ring-2 focus:outline-none transition`}
              />
              {touchedFields.lastName && errors.lastName && (
                <p className="mt-1.5 text-xs text-red-500">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="john.doe@example.com"
              className={`w-full px-4 py-3 rounded-lg border ${
                touchedFields.email && errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-purple-500"
              } focus:ring-2 focus:outline-none transition`}
            />
            {touchedFields.email && errors.email && (
              <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="+1 234 567 8900"
              className={`w-full px-4 py-3 rounded-lg border ${
                touchedFields.phone && errors.phone
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-purple-500"
              } focus:ring-2 focus:outline-none transition`}
            />
            {touchedFields.phone && errors.phone && (
              <p className="mt-1.5 text-xs text-red-500">{errors.phone}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password *
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Create a strong password"
                className={`w-full px-4 py-3 pr-12 rounded-lg border ${
                  touchedFields.password && errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-purple-500"
                } focus:ring-2 focus:outline-none transition`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            {formData.password && (
              <div className="mt-2">
                <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getPasswordStrengthColor()} transition-all duration-300`}
                    style={{ width: `${(passwordStrength / 4) * 100}%` }}
                  />
                </div>
                <p className={`mt-1 text-xs ${getPasswordStrengthTextColor()}`}>
                  Strength: {getPasswordStrengthText()}
                </p>
              </div>
            )}

            {touchedFields.password && errors.password && (
              <p className="mt-1.5 text-xs text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password *
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Re-enter your password"
              className={`w-full px-4 py-3 rounded-lg border ${
                touchedFields.confirmPassword && errors.confirmPassword
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-purple-500"
              } focus:ring-2 focus:outline-none transition`}
            />
            {touchedFields.confirmPassword && errors.confirmPassword && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Date of Birth & Gender */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth *
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 rounded-lg border ${
                  touchedFields.dateOfBirth && errors.dateOfBirth
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-purple-500"
                } focus:ring-2 focus:outline-none transition`}
              />
              {touchedFields.dateOfBirth && errors.dateOfBirth && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.dateOfBirth}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender *
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 rounded-lg border ${
                  touchedFields.gender && errors.gender
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-purple-500"
                } focus:ring-2 focus:outline-none transition bg-white`}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
              {touchedFields.gender && errors.gender && (
                <p className="mt-1.5 text-xs text-red-500">{errors.gender}</p>
              )}
            </div>
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country *
            </label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 rounded-lg border ${
                touchedFields.country && errors.country
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-purple-500"
              } focus:ring-2 focus:outline-none transition bg-white`}
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {touchedFields.country && errors.country && (
              <p className="mt-1.5 text-xs text-red-500">{errors.country}</p>
            )}
          </div>

          {/* Terms & Conditions */}
          <div>
            <label className="flex items-start cursor-pointer">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 mt-0.5"
              />
              <span className="ml-2 text-sm text-gray-700">
                I agree to the{" "}
                <a
                  href="#"
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Privacy Policy
                </a>
              </span>
            </label>
            {touchedFields.agreeToTerms && errors.agreeToTerms && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.agreeToTerms}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-lg text-white font-semibold text-base
              ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              } transition duration-200 shadow-lg`}
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </div>

        {/* Login Link */}
        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="#"
            className="text-purple-600 hover:text-purple-700 font-semibold"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
