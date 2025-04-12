import { create } from "zustand";
import { Friend } from "../types/calendar";

interface CalendarState {
  selectedSlots: Set<string>;
  originalState: Set<string>;
  currentFriend: Friend | null;
  
  // Actions
  toggleSlot: (slotKey: string) => void;
  saveChanges: () => void;
  resetChanges: () => void;
  setCurrentFriend: (friend: Friend) => void;
  initializeState: (slots: Set<string>) => void;
}

export const useCalendarStore = create<CalendarState>((set, get) => ({
  selectedSlots: new Set<string>(),
  originalState: new Set<string>(),
  currentFriend: null,

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
      originalState: new Set(state.selectedSlots)
    }));
  },

  resetChanges: () => {
    set((state) => ({
      selectedSlots: new Set(state.originalState)
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
  }
}));
