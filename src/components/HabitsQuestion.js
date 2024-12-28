const HabitsQuestion = ({ type, value, onChange, question, hint }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-center">{question}</h2>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          type="button"
          className={`flex-1 py-3 px-4 rounded-lg border ${
            value === 'yes' ? 'border-green-500 bg-green-50' : 'border-gray-300'
          }`}
          onClick={() => onChange(type, 'yes')}
        >
          Yes
        </button>
        <button
          type="button"
          className={`flex-1 py-3 px-4 rounded-lg border ${
            value === 'no' ? 'border-green-500 bg-green-50' : 'border-gray-300'
          }`}
          onClick={() => onChange(type, 'no')}
        >
          No
        </button>
      </div>
      <p className="text-sm text-gray-600 text-center">{hint}</p>
    </div>
  );
};

export default HabitsQuestion; 