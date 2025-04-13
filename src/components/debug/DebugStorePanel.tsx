import React, { useCallback } from 'react';
import { useStore } from 'zustand';
import { useAvailabilityStore } from '../../stores/availabilityStore';
import { useCalendarStore } from '../../stores/calendarStore';

const DebugStorePanel: React.FC = () => {
  const availabilityStore = useStore(useAvailabilityStore);
  const calendarStore = useStore(useCalendarStore);

  const formatStore = useCallback((store: any) => {
    const filtered = { ...store };
    // Remove functions
    Object.keys(filtered).forEach(key => {
      if (typeof filtered[key] === 'function') {
        delete filtered[key];
      }
    });
    return JSON.stringify(filtered, null, 2);
  }, []);

  const handleCopy = async () => {
    const text = JSON.stringify({
      availability: formatStore(availabilityStore),
      calendar: formatStore(calendarStore)
    }, null, 2);
    await navigator.clipboard.writeText(text);
  };

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-gray-800 text-gray-100 rounded-lg shadow-lg opacity-90 z-50">
      <div className="flex items-center justify-between p-3 border-b border-gray-700">
        <h3 className="font-semibold">Store Debug Panel</h3>
        <button
          onClick={handleCopy}
          className="px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded"
        >
          Copy JSON
        </button>
      </div>
      <div className="overflow-auto max-h-96">
        <div className="p-3 border-b border-gray-700">
          <h4 className="text-sm font-semibold mb-2">Current User</h4>
          <div className="text-xs font-mono">
            {availabilityStore.currentUserId}
          </div>
        </div>
        <div className="p-3">
          <pre className="text-xs font-mono whitespace-pre-wrap">
            {formatStore({ availability: availabilityStore, calendar: calendarStore })}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default DebugStorePanel;
