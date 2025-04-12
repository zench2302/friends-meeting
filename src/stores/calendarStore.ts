import { create } from "zustand";
import { Friend } from "../types/calendar";

interface CalendarState {
  selectedSlots: Set<string>;
  originalState: Set<string>;
  currentFriend: Friend | null;
  selectedFriends: Friend[];
  
  toggleSlot: (slotKey: string) => void;
  saveChanges: () => void;
  resetChanges: () => void;
  setCurrentFriend: (friend: Friend) => void;
  initializeState: (slots: Set<string>) => void;
  addSelectedFriend: (friend: Friend) => void;
  removeSelectedFriend: (friendId: string) => void;
}

export const useCalendarStore = create<CalendarState>((set) => ({
  selectedSlots: new Set<string>(),
  originalState: new Set<string>(),
  currentFriend: null,
  selectedFriends: [],

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
  }
}));
