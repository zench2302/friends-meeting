import React, { useState } from "react";

interface CenterPanelProps {
  isEditing: boolean;
}

const CenterPanel: React.FC<CenterPanelProps> = ({ isEditing }) => {
  // Add state for selected time slots
  const [selectedSlots, setSelectedSlots] = useState<Set<string>>(new Set());

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
    const newSelected = new Set(selectedSlots);

    if (newSelected.has(slotKey)) {
      newSelected.delete(slotKey);
    } else {
      newSelected.add(slotKey);
    }

    setSelectedSlots(newSelected);
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
              {timeSlots.map((_, slotIndex) => {
                const slotKey = `${dayIndex}-${slotIndex}`;
                const isSelected = selectedSlots.has(slotKey);

                return (
                  <div
                    key={slotIndex}
                    onClick={() => handleSlotClick(dayIndex, slotIndex)}
                    className={`h-6 border-b border-r border-gray-100 
                      ${isSelected ? 'bg-green-100' : 'bg-white'}
                      ${slotIndex % 2 === 0 ? 'border-gray-200' : 'border-gray-100'}
                      ${isEditing ? 'cursor-pointer hover:bg-gray-50' : ''}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CenterPanel;
