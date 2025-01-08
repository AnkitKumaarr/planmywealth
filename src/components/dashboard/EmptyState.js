export default function EmptyState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] bg-white rounded-lg shadow p-8">
      <div className="w-16 h-16 mb-4">
        <svg
          className="w-full h-full text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <h3 className="text-xl font-medium text-gray-900 mb-1">
        {message || "No data available"}
      </h3>
    </div>
  );
} 