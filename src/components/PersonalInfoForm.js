"use client";

const PersonalInfoForm = ({ data, onChange, errors, setErrors }) => {
  const validateField = (name, value) => {
    if (!value) {
      setErrors((prev) => ({
        ...prev,
        [name]: true,
      }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleChange = (field, value) => {
    onChange(field, value);
    validateField(field, value);
  };

  // Set default date to 2004 for current month and day
  const defaultDate = () => {
    const today = new Date();
    return `${today.getFullYear() - 20}-${String(today.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(today.getDate()).padStart(2, "0")}`;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Good to meet you! 🙂 Tell us about yourself
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="First Name"
          className={`p-3 border ${
            errors.firstName ? "border-red-500" : "border-gray-300"
          } rounded-lg w-full`}
          value={data.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
          onBlur={(e) => validateField("firstName", e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          className={`p-3 border ${
            errors.lastName ? "border-red-500" : "border-gray-300"
          } rounded-lg w-full`}
          value={data.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
          onBlur={(e) => validateField("lastName", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="date"
          className={`p-3 border ${
            errors.dateOfBirth ? "border-red-500" : "border-gray-300"
          } rounded-lg w-full`}
          value={data.dateOfBirth || defaultDate()}
          onChange={(e) => handleChange("dateOfBirth", e.target.value)}
          onBlur={(e) => validateField("dateOfBirth", e.target.value)}
        />
        <input
          type="text"
          placeholder="Pincode"
          className={`p-3 border ${
            errors.pincode ? "border-red-500" : "border-gray-300"
          } rounded-lg w-full`}
          value={data.pincode}
          onChange={(e) => handleChange("pincode", e.target.value)}
          onBlur={(e) => validateField("pincode", e.target.value)}
          maxLength={6}
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Gender</label>
        <div
          className={`flex gap-4 ${
            errors.gender ? "border border-red-500 rounded-lg p-1" : ""
          }`}
        >
          <button
            type="button"
            className={`flex-1 py-3 px-4 rounded-lg border ${
              data.gender === "male"
                ? "border-green-500 bg-green-50"
                : "border-gray-300"
            }`}
            onClick={() => handleChange("gender", "male")}
          >
            ♂️ Male
          </button>
          <button
            type="button"
            className={`flex-1 py-3 px-4 rounded-lg border ${
              data.gender === "female"
                ? "border-green-500 bg-green-50"
                : "border-gray-300"
            }`}
            onClick={() => handleChange("gender", "female")}
          >
            ♀️ Female
          </button>
        </div>
      </div>

      <div>
        <label className="block text-gray-700 mb-2">
          Your Highest Education
        </label>
        <select
          className={`w-full p-3 border ${
            errors.education ? "border-red-500" : "border-gray-300"
          } rounded-lg`}
          value={data.education}
          onChange={(e) => handleChange("education", e.target.value)}
          onBlur={(e) => validateField("education", e.target.value)}
        >
          <option value="">Select</option>

          <option value="graduateorabove">Graduate or Above</option>
          <option value="12thpass">12th pass</option>
          <option value="10thpass">10th pass</option>
          <option value="below10th">Below 10th</option>
          <option value="other">Other</option>
        </select>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
