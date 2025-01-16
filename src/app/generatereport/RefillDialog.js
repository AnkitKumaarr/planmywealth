import { useRouter } from "next/navigation";
import React from "react";
import { MdOutlineRestartAlt } from "react-icons/md";

const RefillDialog = ({ handleDialogClose }) => {
  const router = useRouter();
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-2xl w-5/12">
        <div className="flex flex-col items-center justify-center">
          <MdOutlineRestartAlt className="text-4xl text-black" />
          <h2 className="text-xl font-bold mb-4">Start All Over again?</h2>
        </div>
        <p className="mb-4">
          Restarting the test means all questions would be reset and you will
          lose all the answers that you selected to begin with. Is that what you
          want?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={() => {
              /* Add logic to restart form */
              router.push("/");
            }}
          >
            Yes, let's start again
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleDialogClose}
          >
            No, I do not want to restart
          </button>
        </div>
      </div>
    </div>
  );
};

export default RefillDialog;
