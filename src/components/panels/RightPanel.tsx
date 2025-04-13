import React, { useState, useCallback } from "react";
import { useAvailabilityStore } from "../../stores/availabilityStore";
import { useCalendarStore } from "../../stores/calendarStore";
import { ALL_USERS } from "../../constants/users";

const RightPanel: React.FC = () => {
  const { currentUserId, selectedUserIds, toggleUser, availabilities } = useAvailabilityStore();
  const { addSelectedFriend, removeSelectedFriend, addOverlaySlots, removeOverlaySlots } = useCalendarStore();

  const safeIncludes = useCallback((arr: any[] | unknown, item: unknown) => {
    return Array.isArray(arr) && arr.includes(item);
  }, []);

  const availableUsers = React.useMemo(() => 
    ALL_USERS.filter(u => 
      u.id !== currentUserId && !safeIncludes(selectedUserIds, u.id)
    ), [currentUserId, selectedUserIds, safeIncludes]);
  
  const selectedUsers = React.useMemo(() => 
    ALL_USERS.filter(u => safeIncludes(selectedUserIds, u.id)
  ), [selectedUserIds, safeIncludes]);

  const handleUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    const selectedUser = ALL_USERS.find(user => user.id === selectedId);
    const userAvailability = availabilities.find(a => a.userId === selectedId)?.availability || [];
    
    if (selectedUser) {
      toggleUser(selectedId);
      
      // Convert availability to slot keys
      const slotKeys = userAvailability.flatMap(range => {
        const slots = [];
        for (let slot = range.startSlot; slot <= range.endSlot; slot++) {
          slots.push(`${range.dayIndex}-${slot}`);
        }
        return slots;
      });
      
      addOverlaySlots(selectedId, slotKeys);
      addSelectedFriend({
        ...selectedUser,
        freeTime: userAvailability.map(slot => ({
          dayIndex: slot.dayIndex,
          startHour: Math.floor(slot.startSlot / 2),
          endHour: Math.floor(slot.endSlot / 2)
        }))
      });
    }
  };

  const handleUserRemove = (userId: string) => {
    const removedUser = selectedUsers.find(user => user.id === userId);
    if (removedUser) {
      toggleUser(userId);
      removeSelectedFriend(userId);
      removeOverlaySlots(userId);
    }
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
