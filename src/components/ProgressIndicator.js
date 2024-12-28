const ProgressIndicator = ({ currentStep, totalSteps, title }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div className="space-y-2">
        <div className="flex space-x-4">
          {[...Array(totalSteps)].map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index < currentStep ? 'bg-green-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
        <div className="text-sm text-gray-600">
          {title}: Question {currentStep}/{totalSteps}
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator; 