import { useState } from 'react';

const LoansAdvancesForm = ({ data, onChange, errors }) => {
  const formatToIndianCurrency = (num) => {
    if (!num) return '';
    return `₹ ${num.toLocaleString('en-IN')}`;
  };

  const formatToWords = (num) => {
    if (!num || isNaN(num)) return '';
    const value = Number(num);
    if (value < 1000) return `₹ ${value}`;
    if (value < 100000) return `₹ ${(value/1000).toFixed(1)} thousand`;
    if (value < 10000000) return `₹ ${(value/100000).toFixed(1)} lakh`;
    return `₹ ${(value/10000000).toFixed(1)} crore`;
  };

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
        <h3 className="font-medium text-center sm:text-left">ASSETS & LIABILITIES: Question 2/5</h3>
        <div className="flex gap-1 mt-2 sm:mt-0">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className={`h-1 w-8 rounded-full ${i <= 1 ? 'bg-green-500' : 'bg-gray-200'}`}
            />
          ))}
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-center">
        Have you taken any large loans or advances?
      </h2>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
        <button
          type="button"
          className={`w-full sm:w-32 py-3 rounded-lg ${
            data.hasLoans === true 
              ? 'border border-green-500 bg-white' 
              : 'bg-gray-100'
          }`}
          onClick={() => onChange('hasLoans', true)}
        >
          Yes
        </button>

        <button
          type="button"
          className={`w-full sm:w-32 py-3 rounded-lg ${
            data.hasLoans === false 
              ? 'border border-green-500 bg-white' 
              : 'bg-gray-100'
          }`}
          onClick={() => onChange('hasLoans', false)}
        >
          No
        </button>
      </div>

      {data.hasLoans === true && (
        <div className="max-w-md mx-auto mt-6">
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2">₹</span>
              <input
                type="text"
                className={`w-full p-3 pl-7 border rounded-lg ${
                  errors?.loanAmount ? 'border-red-500' : 'border-gray-200'
                }`}
                placeholder="Enter loan amount..."
                value={data.loanAmount || ''}
                onChange={(e) => onChange('loanAmount', Number(e.target.value))}
              />
            </div>
          </div>
          {errors?.loanAmount && (
            <div className="text-red-500 text-sm mt-1">
              Please enter the loan amount
            </div>
          )}
          {data.loanAmount > 0 && (
            <div className="text-sm text-gray-500 mt-2 text-right">
              {formatToWords(data.loanAmount)}
            </div>
          )}
        </div>
      )}

      <button className="flex items-center text-gray-500 text-sm mt-4">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Retake the test
      </button>
    </div>
  );
};

export default LoansAdvancesForm; 