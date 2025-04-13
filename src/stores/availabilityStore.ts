import { create } from 'zustand';
import { sync } from '@tonk/keepsync';
import { CURRENT_USER_ID } from '../constants/user';
import { UserData } from '../constants/users';

type TimeRange = {
  startSlot: number;
  endSlot: number;
  dayIndex: number;
  userName?: string;
  userEmoji?: string;
  userAvatar?: string;
};

interface UserAvailability {
  userId: string;
  availability: TimeRange[];
  userName?: string;
  userEmoji?: string;
  userAvatar?: string;
}

interface SaveAvailabilityParams {
  slots: string[];
  user: UserData;
}

interface AvailabilityState {
  selectedUserIds: string[];
  availabilities: UserAvailability[];
  currentUserId: string;
  toggleUser: (userId: string) => void;
  updateUserAvailability: (userId: string, availability: TimeRange[]) => void;
  setCurrentUser: (userId: string) => void;
  getSelectedUserIdsAsSet: () => Set<string>;
  updateCurrentUserAvailability: (params: SaveAvailabilityParams) => void;
  getCurrentUserAvailability: () => TimeRange[];
}

export const useAvailabilityStore = create<AvailabilityState>(
  sync(
    (set, get) => {
      let selectedUsersSet: Set<string> | null = null;

      const ensureArray = (value: unknown): string[] => {
        if (Array.isArray(value)) return value;
        return [];
      };

      return {
        selectedUserIds: [],
        availabilities: [],
        currentUserId: CURRENT_USER_ID,

        toggleUser: (userId: string) => {
          const { currentUserId, selectedUserIds } = get();
          if (userId === currentUserId) return;

          const safeSelectedUserIds = ensureArray(selectedUserIds);
          const index = safeSelectedUserIds.indexOf(userId);
          const newSelected = index > -1
            ? safeSelectedUserIds.filter(id => id !== userId)
            : [...safeSelectedUserIds, userId];

          selectedUsersSet = null;
          set({ selectedUserIds: newSelected });
        },

        updateUserAvailability: (userId: string, availability: TimeRange[]) => {
          const { availabilities } = get();
          const current = availabilities.find(a => a.userId === userId);

          if (current && JSON.stringify(current.availability) === JSON.stringify(availability)) {
            return;
          }

          const newAvailabilities = [
            ...availabilities.filter(a => a.userId !== userId),
            { userId, availability }
          ];

          set({ availabilities: newAvailabilities });
        },

        setCurrentUser: (userId: string) => {
          const { currentUserId, availabilities } = get();
          if (userId === currentUserId) return;

          selectedUsersSet = null;
          set({
            currentUserId: userId,
            selectedUserIds: [],
            availabilities
          });
        },

        getSelectedUserIdsAsSet: () => {
          const safeSelectedUserIds = ensureArray(get().selectedUserIds);
          if (!selectedUsersSet) {
            selectedUsersSet = new Set(safeSelectedUserIds);
          }
          return selectedUsersSet;
        },

        updateCurrentUserAvailability: ({ slots, user }: SaveAvailabilityParams) => {
          const { currentUserId } = get();
          const availability = slots.map(slot => {
            const [dayIndex, timeSlot] = slot.split('-').map(Number);
            return {
              dayIndex,
              startSlot: timeSlot,
              endSlot: timeSlot,
              userName: user.name,
              userEmoji: user.emoji,
              userAvatar: user.avatar
            };
          });

          // Merge consecutive slots
          const mergedAvailability = availability.reduce((acc, curr) => {
            const last = acc[acc.length - 1];
            if (last && 
                last.dayIndex === curr.dayIndex && 
                last.endSlot + 1 === curr.startSlot &&
                last.userName === curr.userName) {
              last.endSlot = curr.endSlot;
              return acc;
            }
            return [...acc, curr];
          }, [] as TimeRange[]);

          set(state => ({
            availabilities: [
              ...state.availabilities.filter(a => a.userId !== currentUserId),
              { 
                userId: currentUserId, 
                availability: mergedAvailability,
                userName: user.name,
                userEmoji: user.emoji,
                userAvatar: user.avatar
              }
            ]
          }));
        },

        getCurrentUserAvailability: () => {
          const { currentUserId, availabilities } = get();
          return availabilities.find(a => a.userId === currentUserId)?.availability || [];
        }
      };
    },
    {
      docId: 'availability-data',
      collection: 'calendar',
      initializeAsync: false,
      syncOptions: {
        throttle: 200,
        blacklist: ['getSelectedUserIdsAsSet'],
        batchSize: 1,
        debounce: true,
        onLoad: (state) => ({
          ...state,
          selectedUserIds: Array.isArray(state.selectedUserIds) ? state.selectedUserIds : []
        })
      }
    }
  )
);
