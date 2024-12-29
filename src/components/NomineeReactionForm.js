const NomineeReactionForm = ({ data, onChange }) => {
  const options = [
    {
      id: 'confident',
      label: 'Will Be Able To Manage It Confidently - Without A Sweat'
    },
    {
      id: 'reliable',
      label: 'Will Have Reliable People To Depend On To Manage The Money'
    },
    {
      id: 'nervous',
      label: 'Is Likely To Get Nervous / Panic Without Support'
    },
    {
      id: 'tricked',
      label: 'Might Get Tricked Into Buying Unnecessary Financial Products'
    }
  ];

  const handleOptionSelect = (optionId) => {
    onChange('nomineeReaction', optionId);
  };

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8">
      <div className="text-center space-y-2">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold">
          How will your nominee react if they suddenly receive a INR 2 Crores in their bank account?
        </h2>
      </div>

      <div className="space-y-3 mt-8">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            className={`w-full p-4 text-left border rounded-lg relative ${
              data.nomineeReaction === option.id
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 bg-gray-50 hover:border-gray-300'
            }`}
            onClick={() => handleOptionSelect(option.id)}
          >
            {option.label}
            {data.nomineeReaction === option.id && (
              <div className="absolute -left-3 top-1/2 -translate-y-1/2">
                <div className="bg-green-500 rounded-full p-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="flex items-center text-gray-500 text-sm cursor-pointer mt-4">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Retake the test
      </div>
    </div>
  );
};

export default NomineeReactionForm; 