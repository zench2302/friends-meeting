export interface TimeSlot {
  dayIndex: number;
  startHour: number;
  endHour: number;
}

export interface UserAvailability {
  dayIndex: number;
  startSlot: number;
  endSlot: number;
}

export interface Friend {
  id: string;
  name: string;
  emoji: string;
  avatar: string;
  freeTime: TimeSlot[];
  color: string;
}
