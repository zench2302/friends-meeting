import React from "react";
import { useCalendarStore } from "../../stores/calendarStore";
import { useAvailabilityStore } from "../../stores/availabilityStore";
import { ALL_USERS } from "../../constants/users";

interface LeftPanelProps {
  isEditing: boolean;
  onToggleEdit: () => void;
}

const LeftPanel: React.FC<LeftPanelProps> = ({ isEditing, onToggleEdit }) => {
  const { saveChanges, resetChanges, initializeState, selectedSlots } = useCalendarStore();
  const { currentUserId, setCurrentUser, updateCurrentUserAvailability, getCurrentUserAvailability } = useAvailabilityStore();
  const selectedUserIdsSet = useAvailabilityStore(state => state.getSelectedUserIdsAsSet());

  const currentUser = ALL_USERS.find(u => u.id === currentUserId);
  const availableUsers = ALL_USERS.filter(u => !selectedUserIdsSet.has(u.id));

  const handleDone = () => {
    if (isEditing) {
      const currentUser = ALL_USERS.find(u => u.id === currentUserId);
      // 保存当前选择的时间槽，包含用户信息
      updateCurrentUserAvailability({
        slots: Array.from(selectedSlots),
        user: {
          id: currentUserId,
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
    const newUserId = event.target.value;
    setCurrentUser(newUserId);

    // 获取当前用户的空闲时间
    const userAvailability = getCurrentUserAvailability();
    const availableSlots = userAvailability.flatMap(range => {
      const slots = [];
      for (let slot = range.startSlot; slot <= range.endSlot; slot++) {
        slots.push(`${range.dayIndex}-${slot}`);
      }
      return slots;
    });

    // 使用 initializeState 更新日历状态
    initializeState(new Set(availableSlots));
  };

  return (
    <div className="w-full md:w-1/5 bg-white p-4 overflow-y-auto border-r border-gray-200">
      <div className="mb-6">
        <select
          className="w-full p-2 border rounded-lg bg-gray-50"
          value={currentUserId}
          onChange={handleUserChange}
        >
          {availableUsers.map(user => (
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
    </div>
  );
};

export default LeftPanel;
