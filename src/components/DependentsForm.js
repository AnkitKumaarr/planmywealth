import { useState } from 'react';
import Dialog from './Dialog';

const DependentsForm = ({ data, onChange }) => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newRelation, setNewRelation] = useState('');

  const defaultDependents = [
    { id: 'wife', label: 'Wife' },
    { id: 'children', label: 'Children' },
    { id: 'mother', label: 'Mother' },
    { id: 'father', label: 'Father' }
  ];

  const handleDependentToggle = (dependentId) => {
    const currentDependents = data.dependents || [];
    const isSelected = currentDependents.some(d => d.id === dependentId);

    if (isSelected) {
      onChange('dependents', currentDependents.filter(d => d.id !== dependentId));
    } else {
      const dependentToAdd = defaultDependents.find(d => d.id === dependentId);
      onChange('dependents', [...currentDependents, { ...dependentToAdd }]);
    }
  };

  const handleAddNewDependent = () => {
    if (newRelation) {
      const currentDependents = data.dependents || [];
      const newId = `custom-${Date.now()}`;
      onChange('dependents', [...currentDependents, {
        id: newId,
        label: newRelation
      }]);
      setShowAddDialog(false);
      setNewRelation('');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-center">
        Do you have family members who depend on your earnings?
      </h2>

      <div className="flex justify-center gap-8 mt-8">
        <div className={`w-64 h-40 flex items-center justify-center border rounded-lg cursor-pointer ${
          data.hasDependents === false ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-gray-50'
        }`}
          onClick={() => onChange('hasDependents', false)}
        >
          <span className="text-lg">No</span>
        </div>

        <div className={`w-64 relative ${data.hasDependents ? 'border-green-500' : 'border-gray-200'} border rounded-lg`}>
          <div 
            className={`h-40 flex flex-col items-center justify-center cursor-pointer ${
              data.hasDependents ? 'bg-green-50' : 'bg-gray-50'
            }`}
            onClick={() => onChange('hasDependents', true)}
          >
            <span className="text-lg">Yes</span>
            {data.hasDependents && (
              <p className="text-sm text-gray-600 mt-2">Choose as many as applicable</p>
            )}
          </div>

          {data.hasDependents && (
            <div className="p-4 space-y-2">
              {defaultDependents.map((dependent) => (
                <button
                  key={dependent.id}
                  type="button"
                  className={`w-full p-3 text-center border rounded-lg ${
                    (data.dependents || []).some(d => d.id === dependent.id)
                      ? 'border-green-500 bg-white relative'
                      : 'border-gray-200 bg-white'
                  }`}
                  onClick={() => handleDependentToggle(dependent.id)}
                >
                  {dependent.label}
                  {(data.dependents || []).some(d => d.id === dependent.id) && (
                    <div className="absolute -right-1 -top-1 bg-green-500 rounded-full p-1">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}

              {data.dependents?.filter(d => !defaultDependents.some(dd => dd.id === d.id)).map((dependent) => (
                <button
                  key={dependent.id}
                  type="button"
                  className="w-full p-3 text-center border border-green-500 bg-white rounded-lg relative"
                  onClick={() => handleDependentToggle(dependent.id)}
                >
                  {dependent.label}
                  <div className="absolute -right-1 -top-1 bg-green-500 rounded-full p-1">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </button>
              ))}

              <button
                type="button"
                onClick={() => setShowAddDialog(true)}
                className="w-full p-3 text-center text-green-500 border border-gray-200 rounded-lg bg-white"
              >
                + Add More
              </button>
            </div>
          )}
        </div>
      </div>

      {data.hasDependents === false && (
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-sm text-amber-800">
            If you do not have dependant family members, You do not require Term Insurance - do you want to still continue?
          </p>
        </div>
      )}

      <Dialog
        isOpen={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        onConfirm={handleAddNewDependent}
        title="Add New Dependent"
        customContent={
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Relation</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="e.g., Grandmother"
              value={newRelation}
              onChange={(e) => setNewRelation(e.target.value)}
            />
          </div>
        }
      />
    </div>
  );
};

export default DependentsForm; 