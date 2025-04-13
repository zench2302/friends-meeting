import React, { useMemo } from "react";
import { useCalendarStore } from "../../stores/calendarStore";
import { UserData } from "../../types";

interface RightPanelProps {
  selectedUserIds: string[];
  activeUserId: string;
  onUserSelect: (userId: string) => void;
  onUserRemove: (userId: string) => void;
  allUsers: UserData[];
}

const RightPanel: React.FC<RightPanelProps> = ({
  selectedUserIds,
  activeUserId,
  onUserSelect,
  onUserRemove,
  allUsers
}) => {
  const { addOverlaySlots, removeOverlaySlots } = useCalendarStore();

  // Get available users (not selected and not active)
  const availableUsers = useMemo(() => 
    allUsers.filter(u => 
      u.id !== activeUserId && !selectedUserIds.includes(u.id)
    ), [allUsers, activeUserId, selectedUserIds]);
  
  // Get selected users
  const selectedUsers = useMemo(() => 
    allUsers.filter(u => selectedUserIds.includes(u.id)
  ), [allUsers, selectedUserIds]);

  const handleUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    if (selectedId) {
      onUserSelect(selectedId);
      addOverlaySlots(selectedId, []); // Initialize with empty slots
    }
  };

  const handleUserRemove = (userId: string) => {
    onUserRemove(userId);
    removeOverlaySlots(userId);
  };

  return (
    <div className="w-full md:w-1/5 bg-white p-4 overflow-y-auto border-l border-gray-200">
      <h2 className="text-2xl font-bold mb-6 animate-bounce bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
        Pick a legend here!
      </h2>

      <select
        className="w-full p-2 mb-6 border rounded-lg bg-gray-50"
        onChange={handleUserSelect}
        value=""
      >
        <option value="" disabled>Select a friend...</option>
        {availableUsers.map(user => (
          <option key={user.id} value={user.id}>
            {user.avatar} {user.name} {user.emoji}
          </option>
        ))}
      </select>

      {selectedUsers.length > 0 && (
        <div className="border-t pt-4">
          <h3 className="text-sm font-semibold text-gray-600 mb-3">Selected Friends:</h3>
          <div className="space-y-2">
            {selectedUsers.map(user => (
              <div 
                key={user.id} 
                className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <span>{user.avatar}</span>
                  <span>{user.name}</span>
                  <span>{user.emoji}</span>
                </div>
                <button
                  onClick={() => handleUserRemove(user.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(RightPanel);
