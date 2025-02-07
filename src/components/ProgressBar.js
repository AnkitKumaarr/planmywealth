import RetakeButton from "./RetakeButton";

const ProgressBar = ({
  currentSection,
  sections,
  handleRetake,
  currentStep,
}) => {
  return (
    <div className="relative pt-4 bg-[#0e2b16] lg:bg-transparent">
      <div className="md:hidden sm:block flex justify-end">
        <RetakeButton handleRetake={handleRetake} currentStep={currentStep} />
      </div>
      <div className="flex justify-between overflow-x-auto no-scrollbar text-xs">

        {sections.map((section, index) => (
          <div
            key={section.id}
            className={` text-center flex-none mx-4 mb-2 ${
              index === currentSection
                ? "text-green-500 font-bold"
                : "text-gray-400"
            }`}
          >
            {section.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
