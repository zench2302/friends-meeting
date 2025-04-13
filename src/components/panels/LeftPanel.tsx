import React, { useState } from "react";
import { useCalendarStore } from "../../stores/calendarStore";
import { useAvailabilityStore } from "../../stores/availabilityStore";
import { HIGHLIGHT_COLOR } from "../../constants/colors";
import CreateLegendModal from "../modals/CreateLegendModal";
import { UserData } from "../../types";

interface LeftPanelProps {
  isEditing: boolean;
  onToggleEdit: () => void;
  activeUserId: string;
  onUserSelect: (userId: string) => void;
  allUsers: UserData[];
}

const LeftPanel: React.FC<LeftPanelProps> = ({ 
  isEditing, 
  onToggleEdit, 
  activeUserId, 
  onUserSelect,
  allUsers 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { saveChanges, resetChanges, initializeState, selectedSlots } = useCalendarStore();
  const { updateCurrentUserAvailability, getCurrentUserAvailability } = useAvailabilityStore();

  const handleDone = () => {
    if (isEditing) {
      const currentUser = allUsers.find(u => u.id === activeUserId);
      updateCurrentUserAvailability({
        slots: Array.from(selectedSlots),
        user: {
          id: activeUserId,
          name: currentUser?.name || '',
          emoji: currentUser?.emoji || '',
          avatar: currentUser?.avatar || ''
        }
      });
      saveChanges();
    }
    onToggleEdit();
  };

  const handleReset = () => {
    resetChanges();
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    if (newValue === 'new') {
      setIsModalOpen(true);
      return;
    }
    onUserSelect(newValue);

    const userAvailability = getCurrentUserAvailability();
    const availableSlots = userAvailability.flatMap(range => {
      const slots = [];
      for (let slot = range.startSlot; slot <= range.endSlot; slot++) {
        slots.push(`${range.dayIndex}-${slot}`);
      }
      return slots;
    });

    initializeState(new Set(availableSlots));
  };

  const handleCreateLegend = (name: string) => {
    const newUser = {
      id: `user-${Date.now()}`,
      name,
      emoji: "👤",
      avatar: "👤",
      color: HIGHLIGHT_COLOR.BASE
    };
    allUsers.push(newUser);
    onUserSelect(newUser.id);
    initializeState(new Set());
    setIsModalOpen(false);
  };

  return (
    <div className="w-full md:w-1/5 bg-white p-4 overflow-y-auto border-r border-gray-200">
      <div className="mb-6">
        <select
          className="w-full p-2 border rounded-lg bg-gray-50"
          value={activeUserId}
          onChange={handleUserChange}
        >
          <option value="" disabled>Select a legend...</option>
          <option value="new" className="font-semibold text-purple-600">+ New Legend</option>
          {allUsers.map(user => (
            <option key={user.id} value={user.id}>
              {user.avatar} {user.name} {user.emoji}
            </option>
          ))}
        </select>
      </div>

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

      <CreateLegendModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleCreateLegend}
      />
    </div>
  );
};

export default LeftPanel;
