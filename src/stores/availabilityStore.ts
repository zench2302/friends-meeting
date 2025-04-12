import { create } from 'zustand';

type TimeRange = {
  startSlot: number;  // 0-47 for half-hour slots
  endSlot: number;    // 0-47 for half-hour slots
  dayIndex: number;   // 0-6 for week days
};

interface UserAvailability {
  userId: string;
  availability: TimeRange;
}

interface AvailabilityState {
  selectedUserIds: Set<string>;
  availabilities: UserAvailability[];
  toggleUser: (userId: string) => void;
}

const getInitialAvailabilities = (): UserAvailability[] => {
  const hoursToSlot = (hours: number, minutes: number = 0) => hours * 2 + (minutes === 30 ? 1 : 0);
  
  return [
    {
      userId: '1',
      availability: {
        dayIndex: 2, // Apr 13
        startSlot: hoursToSlot(14),
        endSlot: hoursToSlot(16)
      }
    },
    {
      userId: '2',
      availability: {
        dayIndex: 3, // Apr 14
        startSlot: hoursToSlot(15),
        endSlot: hoursToSlot(17)
      }
    },
    {
      userId: '3',
      availability: {
        dayIndex: 3, // Apr 14
        startSlot: hoursToSlot(14),
        endSlot: hoursToSlot(16)
      }
    },
    {
      userId: '4',
      availability: {
        dayIndex: 2, // Apr 13
        startSlot: hoursToSlot(11),
        endSlot: hoursToSlot(15)
      }
    },
    {
      userId: '5',
      availability: {
        dayIndex: 4, // Apr 15
        startSlot: hoursToSlot(16),
        endSlot: hoursToSlot(20)
      }
    }
  ];
};

export const useAvailabilityStore = create<AvailabilityState>((set) => ({
  selectedUserIds: new Set<string>(),
  availabilities: getInitialAvailabilities(),
  toggleUser: (userId: string) => set((state) => {
    const newSelectedUserIds = new Set(state.selectedUserIds);
    if (newSelectedUserIds.has(userId)) {
      newSelectedUserIds.delete(userId);
    } else {
      newSelectedUserIds.add(userId);
    }
    return { selectedUserIds: newSelectedUserIds };
  })
}));
