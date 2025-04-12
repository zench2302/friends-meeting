import { create } from 'zustand';
import { Friend, TimeSlot } from '../types/calendar';

interface CalendarState {
  selectedFriends: Friend[];
  addFriend: (friend: Friend) => void;
  removeFriend: (friendId: string) => void;
  getFriendAtSlot: (dayIndex: number, hour: number) => Friend | null;
}

export const useCalendarState = create<CalendarState>((set, get) => ({
  selectedFriends: [],
  
  addFriend: (friend) => set((state) => ({
    selectedFriends: [...state.selectedFriends, friend]
  })),
  
  removeFriend: (friendId) => set((state) => ({
    selectedFriends: state.selectedFriends.filter(f => f.id !== friendId)
  })),
  
  getFriendAtSlot: (dayIndex, hour) => {
    const { selectedFriends } = get();
    return selectedFriends.find(friend => 
      friend.freeTime.some(slot => 
        slot.dayIndex === dayIndex && 
        hour >= slot.startHour && 
        hour < slot.endHour
      )
    ) || null;
  }
}));
