import React from "react";
import { useCalendarStore } from "../../stores/calendarStore";

interface LeftPanelProps {
  isEditing: boolean;
  onToggleEdit: () => void;
}

const LeftPanel: React.FC<LeftPanelProps> = ({ isEditing, onToggleEdit }) => {
  const { saveChanges, resetChanges } = useCalendarStore();

  const handleDone = () => {
    if (isEditing) {
      saveChanges();
    }
    onToggleEdit();
  };

  const handleReset = () => {
    resetChanges();
  };

  return (
    <div className="w-full md:w-1/5 bg-white p-4 overflow-y-auto border-r border-gray-200">
      {/* User Profile Section */}
      <div className="flex items-center gap-4 mb-6">
        {/* User Avatar */}
        <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
          <img
            src="/default-avatar.png"
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        {/* User Name */}
        <h2 className="text-xl font-semibold text-gray-800">Jia</h2>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between gap-2">
        <button 
          className={`px-4 py-2 text-white rounded-lg font-['Arial'] ${
            isEditing 
              ? 'bg-gray-500 hover:bg-gray-600' 
              : 'bg-green-500 hover:bg-green-600'
          }`}
          onClick={handleDone}
        >
          {isEditing ? 'Done' : 'Add on'}
        </button>
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded-lg font-['Arial'] hover:bg-blue-600"
          onClick={handleReset}
          disabled={!isEditing}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default LeftPanel;
