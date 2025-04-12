import React, { useState } from "react";

interface User {
  id: string;
  name: string;
  emoji: string;
  avatar: string;
}

const initialUsers: User[] = [
  { id: '1', name: 'Iheb', emoji: '😄', avatar: '👤' },
  { id: '2', name: 'Himanshu', emoji: '😢', avatar: '👤' },
  { id: '3', name: 'Rio', emoji: '😂', avatar: '👤' },
  { id: '4', name: 'Kevin', emoji: '😍', avatar: '👤' },
  { id: '5', name: 'Nuel', emoji: '😇', avatar: '👤' },
];

const RightPanel: React.FC = () => {
  const [availableUsers, setAvailableUsers] = useState<User[]>(initialUsers);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const handleUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    const selectedUser = availableUsers.find(user => user.id === selectedId);
    
    if (selectedUser) {
      setSelectedUsers([...selectedUsers, selectedUser]);
      setAvailableUsers(availableUsers.filter(user => user.id !== selectedId));
    }
  };

  const handleUserRemove = (userId: string) => {
    const removedUser = selectedUsers.find(user => user.id === userId);
    if (removedUser) {
      setSelectedUsers(selectedUsers.filter(user => user.id !== userId));
      setAvailableUsers([...availableUsers, removedUser]);
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

export default RightPanel;
