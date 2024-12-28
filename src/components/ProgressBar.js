const ProgressBar = ({ currentSection, currentStep, totalSteps }) => {
  const sections = [
    { id: "basic", label: "1. BASIC" },
    { id: "income", label: "2. INCOME" },
    { id: "dependants", label: "3. DEPENDANTS" },
    { id: "assets", label: "4. ASSETS & LIABILITIES" },
  ];

  return (
    <div className="relative mb-8 px-4 sm:px-6 lg:px-8">
      <div className="flex overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 mb-2 text-xs sm:text-sm lg:text-base">
        {sections.map((section, index) => (
          <div
            key={section.id}
            className={`font-medium text-center flex-none mx-4 ${
              index === currentSection ? "text-green-500" : "text-gray-500"
            }`}
          >
            {section.label}
          </div>
        ))}
      </div>
      <div className="h-1 bg-gray-200 rounded-full">
        <div
          className="h-full bg-green-500 rounded-full transition-all duration-300"
          style={{
            width: `${(currentSection / (sections.length - 1)) * 100}%`,
          }}
        />
      </div>
      {currentSection === 1 && (
        <div className="mt-2 flex justify-center gap-2">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`w-3 h-3 rounded-full ${
                step <= currentStep - 3 ? "bg-green-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
