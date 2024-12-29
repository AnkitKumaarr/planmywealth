const IncomeStabilityForm = ({ data, onChange }) => {
  const options = [
    { id: 'bright', label: 'Bright & Stable' },
    { id: 'notSure', label: 'Not Sure' },
    { id: 'notStable', label: 'Not so stable' }
  ];

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold text-center">
        How stable might this income be in the next 10-15 years?
      </h2>

      <div className="flex flex-wrap justify-center gap-4 mt-8">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            className={`p-4 min-w-[120px] sm:min-w-[150px] border rounded-lg ${
              data.incomeStability === option.id
                ? 'border-green-500 bg-green-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onClick={() => onChange('incomeStability', option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>

      <p className="text-gray-600 text-center mt-4">
        A guesstimate should be good enough.
      </p>
    </div>
  );
};

export default IncomeStabilityForm; 