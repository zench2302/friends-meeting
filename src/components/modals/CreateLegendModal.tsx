import React, { useState } from 'react';
import { ALL_USERS } from '../../constants/users';
import { HIGHLIGHT_COLOR } from '../../constants/colors';

interface CreateLegendModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
}

const CreateLegendModal: React.FC<CreateLegendModalProps> = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    if (!name.trim()) {
      setError('Please enter a name');
      return;
    }

    if (ALL_USERS.some(user => user.name.toLowerCase() === name.trim().toLowerCase())) {
      setError('This name already exists');
      return;
    }

    onSave(name.trim());
    setName('');
    setError('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
        <h2 className="text-xl font-bold mb-4">Create New Legend</h2>
        <div className="space-y-4">
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
              placeholder="Enter legend name"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              autoFocus
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateLegendModal;
