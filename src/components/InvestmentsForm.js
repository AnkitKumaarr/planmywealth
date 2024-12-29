import { useState } from 'react';

const InvestmentsForm = ({ data, onChange, errors }) => {
  const [investments, setInvestments] = useState([
    { type: '', amount: '' }
  ]);

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

  const handleOptionSelect = (knowsInvestments) => {
    onChange('knowsInvestments', knowsInvestments);
  };

  const handleInvestmentChange = (index, value) => {
    const newInvestments = [...investments];
    newInvestments[index].amount = value;
    setInvestments(newInvestments);
    
    // Calculate total
    const total = newInvestments.reduce((sum, inv) => sum + (Number(inv.amount) || 0), 0);
    onChange('totalInvestments', total);
  };

  const addNewInvestment = () => {
    setInvestments([...investments, { type: '', amount: '' }]);
  };

  const removeInvestment = (index) => {
    const newInvestments = investments.filter((_, i) => i !== index);
    setInvestments(newInvestments);
    
    // Recalculate total
    const total = newInvestments.reduce((sum, inv) => sum + (Number(inv.amount) || 0), 0);
    onChange('totalInvestments', total);
  };

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
        <h3 className="font-medium text-center sm:text-left">ASSETS & LIABILITIES: Question 4/5</h3>
        <div className="flex gap-1 mt-2 sm:mt-0">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className={`h-1 w-8 rounded-full ${i <= 3 ? 'bg-green-500' : 'bg-gray-200'}`}
            />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-center">
          Do you know your total investments?
        </h2>
        <p className="text-gray-600 text-center mt-2">
          Your existing investments help us calculate a suitable cover amount for your family. 
          We will never share this information with any third party.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
        <button
          type="button"
          className={`px-12 py-3 rounded-lg ${
            data.knowsInvestments === true 
              ? 'border border-green-500 bg-white' 
              : 'bg-gray-100'
          }`}
          onClick={() => handleOptionSelect(true)}
        >
          Yes
        </button>

        <button
          type="button"
          className={`px-12 py-3 rounded-lg ${
            data.knowsInvestments === false 
              ? 'border border-green-500 bg-white' 
              : 'bg-gray-100'
          }`}
          onClick={() => handleOptionSelect(false)}
        >
          No, Help Me Calculate
        </button>
      </div>

      {data.knowsInvestments === true && (
        <div className="max-w-md mx-auto mt-6">
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2">₹</span>
              <input
                type="text"
                className={`w-full p-3 pl-7 border rounded-lg ${
                  errors?.totalInvestments ? 'border-red-500' : 'border-gray-200'
                }`}
                placeholder="Enter total investments..."
                value={data.totalInvestments || ''}
                onChange={(e) => onChange('totalInvestments', Number(e.target.value))}
              />
            </div>
          </div>
          {errors?.totalInvestments && (
            <div className="text-red-500 text-sm mt-1">
              Please enter your total investments
            </div>
          )}
          {data.totalInvestments > 0 && (
            <div className="text-sm text-gray-500 mt-2 text-right">
              {formatToWords(data.totalInvestments)}
            </div>
          )}
        </div>
      )}

      {data.knowsInvestments === false && (
        <div className="space-y-4 mt-6">
          {investments.map((investment, index) => (
            <div key={index} className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/2">
                <div className="bg-gray-200 p-4 rounded-lg">
                  <select
                    className="w-full bg-transparent outline-none"
                    value={investment.type}
                    onChange={(e) => {
                      const newInvestments = [...investments];
                      newInvestments[index].type = e.target.value;
                      setInvestments(newInvestments);
                    }}
                  >
                    <option value="">Select Investment Type</option>
                    <option value="fd">Fixed Deposits</option>
                    <option value="stocks">Stocks</option>
                    <option value="mf">Mutual Funds</option>
                    <option value="ppf">PPF</option>
                    <option value="epf">EPF</option>
                    <option value="rd">Recurring Deposits</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="w-full sm:w-1/2">
                <div className="relative bg-white rounded-lg border border-gray-200">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                  <input
                    type="text"
                    className="w-full p-4 pl-7 outline-none rounded-lg"
                    placeholder="Enter amount..."
                    value={investment.amount}
                    onChange={(e) => handleInvestmentChange(index, e.target.value)}
                  />
                </div>
                {investment.amount && Number(investment.amount) > 0 && (
                  <div className="text-sm text-gray-500 mt-1 text-right">
                    {formatToWords(investment.amount)}
                  </div>
                )}
              </div>
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeInvestment(index)}
                  className="text-gray-500 hover:text-red-500"
                >
                  ✕
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addNewInvestment}
            className="text-green-500 hover:text-green-600 flex items-center gap-2"
          >
            + Add More Investments
          </button>

          <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
            <span className="font-medium">Total Investments:</span>
            <span className="font-medium">
              {formatToIndianCurrency(data.totalInvestments)}
            </span>
          </div>
        </div>
      )}

      <button className="flex items-center text-gray-500 text-sm">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Retake the test
      </button>
    </div>
  );
};

export default InvestmentsForm; 