import { create } from "zustand";
import { Friend } from "../types/calendar";

interface CalendarState {
  selectedSlots: Set<string>;
  originalState: Set<string>;
  currentFriend: Friend | null;
  selectedFriends: Friend[];
  overlaySlots: Map<string, Set<string>>;  // userId -> Set of slot keys
  
  toggleSlot: (slotKey: string) => void;
  saveChanges: () => void;
  resetChanges: () => void;
  setCurrentFriend: (friend: Friend) => void;
  initializeState: (slots: Set<string>) => void;
  addSelectedFriend: (friend: Friend) => void;
  removeSelectedFriend: (friendId: string) => void;
  addOverlaySlots: (userId: string, slots: string[]) => void;
  removeOverlaySlots: (userId: string) => void;
  setUserFreeTime: (slots: string[]) => void;
}

export const useCalendarStore = create<CalendarState>((set) => ({
  selectedSlots: new Set<string>(),
  originalState: new Set<string>(),
  currentFriend: null,
  selectedFriends: [],
  overlaySlots: new Map(),

  toggleSlot: (slotKey: string) => {
    set((state) => {
      const newSelected = new Set(state.selectedSlots);
      if (newSelected.has(slotKey)) {
        newSelected.delete(slotKey);
      } else {
        newSelected.add(slotKey);
      }
      return { selectedSlots: newSelected };
    });
  },

  saveChanges: () => {
    set((state) => ({
      originalState: new Set(state.selectedSlots) // 保存当前选择作为新的初始状态
    }));
  },

  resetChanges: () => {
    set((state) => ({
      selectedSlots: new Set(state.originalState) // 恢复到初始状态
    }));
  },

  setCurrentFriend: (friend: Friend) => {
    set({ currentFriend: friend });
  },

  initializeState: (slots: Set<string>) => {
    set({
      originalState: new Set(slots),
      selectedSlots: new Set(slots)
    });
  },

  addSelectedFriend: (friend: Friend) => {
    set((state) => ({
      selectedFriends: [...state.selectedFriends, friend]
    }));
  },

  removeSelectedFriend: (friendId: string) => {
    set((state) => ({
      selectedFriends: state.selectedFriends.filter(f => f.id !== friendId)
    }));
  },

  addOverlaySlots: (userId: string, slots: string[]) => 
    set(state => ({
      overlaySlots: new Map(state.overlaySlots).set(userId, new Set(slots))
    })),

  removeOverlaySlots: (userId: string) =>
    set(state => {
      const newMap = new Map(state.overlaySlots);
      newMap.delete(userId);
      return { overlaySlots: newMap };
    }),

  setUserFreeTime: (slots: string[]) => {
    set({
      selectedSlots: new Set(slots),
      originalState: new Set(slots)
    });
  }
}));
