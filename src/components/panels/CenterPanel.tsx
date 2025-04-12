import React from "react";
import { useCalendarStore } from "../../stores/calendarStore";

interface CenterPanelProps {
  isEditing: boolean;
}

const CenterPanel: React.FC<CenterPanelProps> = ({ isEditing }) => {
  const { selectedSlots, toggleSlot } = useCalendarStore();

  // Generate array of next 7 days starting from today
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  // Generate time slots (48 slots, 30 min each)
  const timeSlots = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const minute = i % 2 === 0 ? '00' : '30';
    return `${hour.toString().padStart(2, '0')}:${minute}`;
  });

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleSlotClick = (dayIndex: number, slotIndex: number) => {
    if (!isEditing) return;
    const slotKey = `${dayIndex}-${slotIndex}`;
    toggleSlot(slotKey);
  };

  const getSlotColor = (dayIndex: number, slotIndex: number) => {
    const slotKey = `${dayIndex}-${slotIndex}`;
    return selectedSlots.has(slotKey) ? '#4ade80' : 'white';
  };

  return (
    <div className="w-full md:w-3/5 bg-gray-100 p-4 overflow-hidden">
      {/* Calendar Container */}
      <div className="flex overflow-x-auto">
        {/* Time Labels Column (Sticky) */}
        <div className="sticky left-0 z-10 bg-gray-100 pr-2">
          {/* Empty cell for alignment with day headers */}
          <div className="h-12 border-b border-gray-200"></div>
          {/* Time Labels */}
          {timeSlots.map((time, i) => (
            <div 
              key={time}
              className={`h-6 flex items-center justify-end pr-2 text-xs text-gray-500
                ${i % 2 === 0 ? 'font-semibold' : 'text-gray-400'}`}
            >
              {i % 2 === 0 ? time : ''}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="flex flex-1 min-w-0">
          {days.map((day, dayIndex) => (
            <div key={dayIndex} className="flex-1 min-w-[120px]">
              {/* Day Header */}
              <div className="h-12 border-b border-gray-200 flex items-center justify-center text-sm font-semibold">
                {formatDate(day)}
              </div>
              {/* Time Slots */}
              {timeSlots.map((_, slotIndex) => (
                <div
                  key={slotIndex}
                  onClick={() => handleSlotClick(dayIndex, slotIndex)}
                  className={`h-6 border-b border-r border-gray-100 ${
                    slotIndex % 2 === 0 ? 'border-gray-200' : 'border-gray-100'
                  }`}
                  style={{
                    backgroundColor: getSlotColor(dayIndex, slotIndex),
                    cursor: isEditing ? 'pointer' : 'default'
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CenterPanel;
