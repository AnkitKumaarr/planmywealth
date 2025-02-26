import { useState } from "react";

const SavingsInvestmentsForm = ({ data, onChange, errors }) => {
  const formatToIndianCurrency = (num) => {
    if (!num) return "";
    return `₹ ${num.toLocaleString("en-IN")}`;
  };

  const formatToWords = (num) => {
    if (!num || isNaN(num)) return "";
    const value = Number(num);
    if (value < 1000) return `₹ ${value}`;
    if (value < 100000) return `₹ ${(value / 1000).toFixed(1)} thousand`;
    if (value < 10000000) return `₹ ${(value / 100000).toFixed(1)} lakh`;
    return `₹ ${(value / 10000000).toFixed(1)} crore`;
  };

  const [expenses, setExpenses] = useState(data.majorExpenses  || [{
    id: Date.now(),
    description: '',
    amount: ''
  }]);

  const handleAddExpense = () => {
    const newExpense = {
      id: Date.now(),
      description: '',
      amount: ''
    };
    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    onChange('majorExpenses', updatedExpenses);
    onChange('majorExpensesAmount', calculateTotalAmount(updatedExpenses));
  };

  const handleRemoveExpense = (id) => {
    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    setExpenses(updatedExpenses);
    onChange('majorExpenses', updatedExpenses);
    onChange('majorExpensesAmount', calculateTotalAmount(updatedExpenses));
  };

  const handleExpenseChange = (id, field, value) => {
    const updatedExpenses = expenses.map(expense => {
      if (expense.id === id) {
        return { ...expense, [field]: value };
      }
      return expense;
    });
    setExpenses(updatedExpenses);
    onChange('majorExpenses', updatedExpenses);
    if (field === 'amount') {
      onChange('majorExpensesAmount', calculateTotalAmount(updatedExpenses));
    }
  };

  const calculateTotalAmount = (expensesList) => {
    return expensesList.reduce((sum, expense) => sum + (Number(expense.amount) || 0), 0);
  };

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold text-center">
        Do you have any major upcoming expenses?
      </h2>
      <p className="text-center text-gray-500">
        Large expenses like spouse's higher education, sibling's higher
        education or wedding, paying off some financial liability on your
        family, etc.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
        <button
          type="button"
          className={`w-full sm:w-32 py-3 rounded-lg ${
            data.hasMajorExpenses === true
              ? "border border-green-500 bg-white"
              : "bg-gray-100"
          }`}
          onClick={() => onChange("hasMajorExpenses", true)}
        >
          Yes
        </button>

        <button
          type="button"
          className={`w-full sm:w-32 py-3 rounded-lg ${
            data.hasMajorExpenses === false
              ? "border border-green-500 bg-white"
              : "bg-gray-100"
          }`}
          onClick={() => onChange("hasMajorExpenses", false)}
        >
          No
        </button>
      </div>

      {data.hasMajorExpenses === true && (
        <div className="space-y-4 mt-6">
          {expenses.map((expense) => (
            <div key={expense.id} className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/2">
                <div className="relative bg-white rounded-lg border border-gray-200">
                  <input
                    type="text"
                    className="w-full p-4 outline-none rounded-lg"
                    placeholder="Enter expense description..."
                    value={expense.description}
                    onChange={(e) => handleExpenseChange(expense.id, 'description', e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full sm:w-1/2 flex gap-2">
                <div className="relative bg-white rounded-lg border border-gray-200 flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2">₹</span>
                  <input
                    type="text"
                    className="w-full p-4 pl-7 outline-none rounded-lg"
                    placeholder="Enter amount..."
                    value={expense.amount}
                    onChange={(e) => handleExpenseChange(expense.id, 'amount', e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveExpense(expense.id)}
                  className="p-4 text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddExpense}
            className="w-full p-3 border border-gray-400 rounded-lg text-gray-600 hover:bg-gray-50"
          >
            + Add Another Expense
          </button>

          <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
            <span className="font-medium">Total Expenses:</span>
            <span className="font-medium">
              {formatToIndianCurrency(data.majorExpensesAmount)}
            </span>
          </div>

          {errors?.majorExpensesAmount && (
            <div className="text-red-500 text-sm">Please enter at least one expense amount</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SavingsInvestmentsForm;
