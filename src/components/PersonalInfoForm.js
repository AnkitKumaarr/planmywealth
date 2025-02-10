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

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const calculateDateOfBirth = (age) => {
    const today = new Date();
    const year = today.getFullYear() - age;
    return `${year}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(
      today.getDate()
    ).padStart(2, "0")}`;
  };

  const handleChange = (field, value) => {
    if (field === "age") {
      const newDob = calculateDateOfBirth(parseInt(value));
      onChange("dateOfBirth", newDob);
    } else if (field === "dateOfBirth") {
      const newAge = calculateAge(value);
      if (newAge >= 18 && newAge <= 70) {
        onChange("age", String(newAge));
      }
    }
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
    <div className="space-y-6 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Good to meet you! 🙂 Tell us about yourself
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="date"
          className={`p-3 border ${
            errors.dateOfBirth ? "border-red-500" : "border-gray-300"
          } rounded-lg w-full`}
          value={data.dateOfBirth || defaultDate()}
          onChange={(e) => handleChange("dateOfBirth", e.target.value)}
          onBlur={(e) => validateField("dateOfBirth", e.target.value)}
          max={new Date().toISOString().split("T")[0]}
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
      <div className="space-y-2">
        <label className="block text-gray-700 font-medium">Age</label>
        <select
          className={`w-full p-2 sm:p-3 border border-1 rounded-lg  outline-none ${
            data.age ? "border-gray-400" : "border-gray-400"
          }`}
          value={data.age}
          onChange={(e) => {
            setErrors({});
            handleChange("age", e.target.value);
          }}
        >
          <option value="">Select Age</option>

          {[...Array(53)].map((_, i) => (
            <option key={i + 18} value={i + 18}>
              {i + 18} years
            </option>
          ))}
        </select>
        {errors.age && <p className="text-red-500">{errors.age}</p>}
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Gender</label>
        <div
          className={`flex flex-col sm:flex-row gap-4 ${
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
          <option value="Graduate or Above">Graduate or Above</option>
          <option value="12th Pass">12th Pass</option>
          <option value="10th Pass">10th Pass</option>
          <option value="Below 10th">Below 10th</option>
          <option value="Other">Other</option>
        </select>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
