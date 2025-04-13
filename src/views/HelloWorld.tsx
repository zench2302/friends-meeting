import React, { useState, useEffect } from "react";
import { LeftPanel, CenterPanel, RightPanel } from "../components/panels";
import DebugStorePanel from "../components/debug/DebugStorePanel";
import { syncExternalUsers } from "../services/userSync";
import { ALL_USERS } from "../constants/users";

const HelloWorld = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [syncError, setSyncError] = useState<string | null>(null);
  const [activeUserId, setActiveUserId] = useState<string>('');
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // User sync effect
  useEffect(() => {
    const initializeUsers = async () => {
      const result = await syncExternalUsers();
      if (result.success && result.userIds.length > 0) {
        // Don't automatically select users from sync
        setActiveUserId(result.userIds[0]); // Only set the active user
      } else {
        setSyncError(result.error || "No matching users found");
      }
    };

    initializeUsers();
  }, []);

  const handleUserSelect = (userId: string) => {
    setActiveUserId(userId);
  };

  const handleFriendSelect = (userId: string) => {
    setSelectedUserIds(prev => [...prev, userId]);
  };

  const handleFriendRemove = (userId: string) => {
    setSelectedUserIds(prev => prev.filter(id => id !== userId));
  };

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="p-4 md:p-6 lg:p-8 pb-0">
        <div className="max-w-7xl mx-auto w-full">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 animate-fade-in-down">
              Legend meetings!
            </h1>
            <div className="mt-2 text-gray-600 flex items-center gap-4">
              <span>{currentTime.toLocaleDateString()}</span>
              <span className="font-mono text-lg text-purple-600">
                {formatTime(currentTime)}
              </span>
              {syncError && (
                <span className="text-orange-500 text-sm">{syncError}</span>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow flex overflow-hidden p-4 md:p-6 lg:p-8 pt-4">
        <div className="max-w-7xl mx-auto w-full flex">
          <LeftPanel
            isEditing={isEditing}
            onToggleEdit={() => setIsEditing(!isEditing)}
            activeUserId={activeUserId}
            onUserSelect={handleUserSelect}
            allUsers={ALL_USERS}
          />
          <CenterPanel isEditing={isEditing} />
          <RightPanel 
            selectedUserIds={selectedUserIds}
            activeUserId={activeUserId}
            onUserSelect={handleFriendSelect}
            onUserRemove={handleFriendRemove}
            allUsers={ALL_USERS}
          />
        </div>
      </main>

      <DebugStorePanel />
    </div>
  );
};

export default HelloWorld;
