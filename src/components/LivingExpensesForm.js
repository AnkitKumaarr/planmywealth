import { useState } from 'react';

const LivingExpensesForm = ({ data, onChange, errors }) => {
  const [expenses, setExpenses] = useState({
    houseRent: '',
    schoolFees: '',
    utilities: '',
    vehicleMaintenance: '',
    salaries: '',
    groceries: '',
    foodEntertainment: '',
    other: ''
  });

  const handleOptionSelect = (knowsExpenses) => {
    onChange('knowsLivingExpenses', knowsExpenses);
  };

  const handleExpenseChange = (category, value) => {
    // Update only the specific category
    const newExpenses = { ...expenses, [category]: value };
    setExpenses(newExpenses);
    
    // Calculate total separately
    const total = Object.values(newExpenses).reduce((sum, val) => sum + (Number(val) || 0), 0);
    onChange('totalMonthlyExpenses', total); // Store total in a different field
  };

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

  const expenseCategories = [
    { id: 'houseRent', label: 'House Rent' },
    { id: 'schoolFees', label: 'School Fees' },
    { id: 'utilities', label: 'Utilities', subtitle: '(Electricity + Gas + Internet + house maintenance etc.)' },
    { id: 'vehicleMaintenance', label: 'Vehicle Maintenance & Fuel' },
    { id: 'salaries', label: 'Salaries to maids/drivers' },
    { id: 'groceries', label: 'Groceries' },
    { id: 'foodEntertainment', label: 'Food/Entertainment', subtitle: '(Subscriptions)' },
    { id: 'other', label: 'Other' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">ASSETS & LIABILITIES: Question 1/5</h3>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className={`h-1 w-8 rounded-full ${i === 0 ? 'bg-green-500' : 'bg-gray-200'}`}
            />
          ))}
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-center">
        Do you know the living expenses of your dependent family members?
      </h2>

      <div className="flex justify-center gap-4 mt-8">
        <button
          type="button"
          className={`px-12 py-3 rounded-lg ${
            data.knowsLivingExpenses === true 
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
            data.knowsLivingExpenses === false 
              ? 'border border-green-500 bg-white' 
              : 'bg-gray-100'
          }`}
          onClick={() => handleOptionSelect(false)}
        >
          No, Help Me Calculate
        </button>
      </div>

      {data.knowsLivingExpenses === true && (
        <div className="max-w-md mx-auto mt-6">
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2">₹</span>
              <input
                type="text"
                className={`w-full p-3 pl-7 border rounded-lg ${
                  errors?.monthlyExpenses ? 'border-red-500' : 'border-gray-200'
                }`}
                placeholder="15000"
                value={data.monthlyExpenses || ''}
                onChange={(e) => onChange('monthlyExpenses', Number(e.target.value))}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                per month
              </span>
            </div>
          </div>
          {errors?.monthlyExpenses && (
            <div className="text-red-500 text-sm mt-1">
              Please enter the monthly expenses
            </div>
          )}
          {data.monthlyExpenses > 0 && (
            <div className="text-sm text-gray-500 mt-2 text-right">
              {formatToWords(data.monthlyExpenses)}
            </div>
          )}
        </div>
      )}

      {data.knowsLivingExpenses === false && (
        <div className="space-y-4 mt-6">
          {expenseCategories.map((category) => (
            <div key={category.id} className="flex gap-4">
              <div className="w-1/2">
                <div className="bg-gray-200 p-4 rounded-lg">
                  <div className="font-medium">{category.label}</div>
                  {category.subtitle && (
                    <div className="text-sm text-gray-600">{category.subtitle}</div>
                  )}
                </div>
              </div>
              <div className="w-1/2">
                <div className="relative bg-white rounded-lg border border-gray-200">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                  <input
                    type="text"
                    className="w-full p-4 pl-7 outline-none rounded-lg"
                    placeholder="Enter estimate..."
                    value={expenses[category.id]}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Only update this specific field
                      setExpenses(prev => ({
                        ...prev,
                        [category.id]: value
                      }));
                      // Update total
                      const newTotal = Object.entries({
                        ...expenses,
                        [category.id]: value
                      }).reduce((sum, [key, val]) => sum + (Number(val) || 0), 0);
                      onChange('totalMonthlyExpenses', newTotal);
                    }}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    per month
                  </span>
                </div>
                {expenses[category.id] && Number(expenses[category.id]) > 0 && (
                  <div className="text-sm text-gray-500 mt-1 text-right">
                    {formatToWords(expenses[category.id])}
                  </div>
                )}
              </div>
            </div>
          ))}

          <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
            <span className="font-medium">Total Expenses:</span>
            <span className="font-medium">
              {formatToIndianCurrency(data.totalMonthlyExpenses)}
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

export default LivingExpensesForm; 