const ProgressIndicator = ({ currentStep, totalSteps, title }) => {

  return (
    <div className="flex flex-col items-center justify-between mb-4">
      <p className="font-medium text-center">
        {title}: Question {currentStep}/{totalSteps}
      </p>
      <div className="flex gap-1 mt-2 sm:mt-0">
        {[...Array(totalSteps)].map((_, i) => (
          <div
            key={i}
            className={`h-1 w-8 rounded-full ${
              i < currentStep ? "bg-green-500" : "bg-gray-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator; 