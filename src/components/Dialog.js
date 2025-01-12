const Dialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  customContent,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed h-screen inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        {message && <p className="text-gray-600 mb-6">{message}</p>}
        {customContent}
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:text-gray-800"
          >
            No, let me re-enter
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Yes, Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
