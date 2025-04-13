import { create } from 'zustand';
import { UserAvailability } from '../types/calendar';

interface AvailabilityStore {
  currentUserId: string;
  selectedUserIds: string[];
  availabilityMap: { [userId: string]: UserAvailability[] };
  setCurrentUser: (userId: string) => void;
  updateCurrentUserAvailability: (availability: { slots: string[]; user: { id: string; name: string; emoji: string; avatar: string } }) => void;
  getCurrentUserAvailability: () => UserAvailability[];
  getSelectedUserIdsAsSet: () => Set<string>;
  initializeSelectedUsers: (userIds: string[]) => void;
  toggleUser: (userId: string) => void;
}

const useAvailabilityStore = create<AvailabilityStore>((set, get) => ({
  currentUserId: '',
  selectedUserIds: [], // Initialize as empty array
  availabilityMap: {},
  
  setCurrentUser: (userId: string) => set({ currentUserId: userId }),
  
  updateCurrentUserAvailability: (availability) => {
    set((state) => ({
      availabilityMap: {
        ...state.availabilityMap,
        [availability.user.id]: []
      }
    }));
  },
  
  getCurrentUserAvailability: () => {
    const state = get();
    return state.availabilityMap[state.currentUserId] || [];
  },

  getSelectedUserIdsAsSet: () => new Set(get().selectedUserIds),

  initializeSelectedUsers: (userIds: string[]) => {
    // Only update the availability map, don't auto-select users
    set((state) => ({
      availabilityMap: {
        ...state.availabilityMap,
        ...Object.fromEntries(userIds.map(id => [id, []]))
      }
    }));
  },

  toggleUser: (userId: string) => {
    set((state) => {
      const newSelectedUserIds = state.selectedUserIds.includes(userId)
        ? state.selectedUserIds.filter(id => id !== userId)
        : [...state.selectedUserIds, userId];
      
      return {
        selectedUserIds: newSelectedUserIds,
      };
    });
  }
}));

export { useAvailabilityStore };
