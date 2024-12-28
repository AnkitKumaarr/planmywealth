const RetirementAgeForm = ({ data, onChange }) => {
  const ageOptions = [40, 45, 50, 55, 60, 65, 70];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-center">
        At what age are you most likely to retire from work?
      </h2>

      <div className="max-w-xs mx-auto">
        <select
          className="w-full p-3 border border-gray-300 rounded-lg"
          value={data.retirementAge || ''}
          onChange={(e) => onChange('retirementAge', e.target.value)}
        >
          <option value="">Select Age</option>
          {ageOptions.map((age) => (
            <option key={age} value={age}>
              {age} years
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default RetirementAgeForm; 