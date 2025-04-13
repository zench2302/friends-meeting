import { create } from 'zustand';
import { UserAvailability } from '../types/calendar';
import { sync } from '@tonk/keepsync';

interface UserAvailabilityWithMeta {
  name: string;
  availability: UserAvailability[];
}

interface AvailabilityStore {
  currentUserId: string;
  selectedUserIds: string[];
  availabilityMap: { [userId: string]: UserAvailabilityWithMeta };
  setCurrentUser: (userId: string) => void;
  updateCurrentUserAvailability: (availability: { slots: string[]; user: { id: string; name: string; emoji: string; avatar: string } }) => void;
  getCurrentUserAvailability: () => UserAvailability[];
  getUserAvailability: (userId: string) => UserAvailability[];
  getSelectedUserIdsAsSet: () => Set<string>;
  initializeSelectedUsers: (userIds: string[]) => void;
  toggleUser: (userId: string) => void;
}

const useAvailabilityStore = create<AvailabilityStore>(
  sync(
    (set, get) => ({
      currentUserId: '',
      selectedUserIds: [],
      availabilityMap: {},
      
      setCurrentUser: (userId: string) => set({ currentUserId: userId }),
      
      updateCurrentUserAvailability: (availability) => {
        // Convert slot strings (dayIndex-slotIndex) to UserAvailability ranges
        const ranges: UserAvailability[] = [];
        const slots = [...availability.slots].sort();
        
        if (slots.length > 0) {
          let current: UserAvailability | null = null;
          
          slots.forEach(slot => {
            const [dayIndex, slotIndex] = slot.split('-').map(Number);
            
            if (!current) {
              current = { dayIndex, startSlot: slotIndex, endSlot: slotIndex };
            } else if (current.dayIndex === dayIndex && current.endSlot + 1 === slotIndex) {
              current.endSlot = slotIndex;
            } else {
              ranges.push(current);
              current = { dayIndex, startSlot: slotIndex, endSlot: slotIndex };
            }
          });
          
          if (current) {
            ranges.push(current);
          }
        }

        // Update the availabilityMap with both availability and user name
        set((state) => ({
          availabilityMap: {
            ...state.availabilityMap,
            [availability.user.id]: {
              name: availability.user.name,
              availability: ranges
            }
          }
        }));
      },
      
      getCurrentUserAvailability: () => {
        const state = get();
        return state.availabilityMap[state.currentUserId]?.availability || [];
      },

      getUserAvailability: (userId: string) => {
        const state = get();
        return state.availabilityMap[userId]?.availability || [];
      },

      getSelectedUserIdsAsSet: () => new Set(get().selectedUserIds),

      initializeSelectedUsers: (userIds: string[]) => {
        set((state) => ({
          availabilityMap: {
            ...state.availabilityMap,
            ...Object.fromEntries(userIds.map(id => [
              id, 
              state.availabilityMap[id] || { name: '', availability: [] }
            ]))
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
    }),
    {
      docId: 'user-availability', // 唯一的文档ID，用于tonk存储
      // 可选：配置初始化超时
      initTimeout: 30000,
      // 可选：处理初始化错误
      onInitError: (error) => console.error('Sync initialization error:', error)
    }
  )
);

export { useAvailabilityStore };
