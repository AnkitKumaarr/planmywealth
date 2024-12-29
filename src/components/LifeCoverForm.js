import { useState } from 'react';

const LifeCoverForm = ({ data, onChange, errors }) => {
  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
        <h3 className="font-medium text-center sm:text-left">ASSETS & LIABILITIES: Question 5/5</h3>
        <div className="flex gap-1 mt-2 sm:mt-0">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className={`h-1 w-8 rounded-full ${i <= 4 ? 'bg-green-500' : 'bg-gray-200'}`}
            />
          ))}
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-center">
        Do you have an existing life cover?
      </h2>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
        <button
          type="button"
          className={`w-full sm:w-32 py-3 rounded-lg ${
            data.hasLifeCover === true 
              ? 'border border-green-500 bg-white' 
              : 'bg-gray-100'
          }`}
          onClick={() => onChange('hasLifeCover', true)}
        >
          Yes
        </button>

        <button
          type="button"
          className={`w-full sm:w-32 py-3 rounded-lg ${
            data.hasLifeCover === false 
              ? 'border border-green-500 bg-white' 
              : 'bg-gray-100'
          }`}
          onClick={() => onChange('hasLifeCover', false)}
        >
          No
        </button>
      </div>

      <button className="flex items-center justify-center sm:justify-start text-gray-500 text-sm mt-4">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Retake the test
      </button>
    </div>
  );
};

export default LifeCoverForm; 