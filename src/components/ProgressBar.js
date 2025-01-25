const ProgressBar = ({ currentSection, sections }) => {
  return (
    <div className="relative py-4 bg-[#0e2b16] lg:bg-transparent">
      <div className="flex justify-between overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 mb-1 text-xs">
        {sections.map((section, index) => (
          <div
            key={section.id}
            className={` text-center flex-none mx-4 ${
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
