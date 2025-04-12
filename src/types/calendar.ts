export interface TimeSlot {
  dayIndex: number;
  startHour: number;
  endHour: number;
}

export interface Friend {
  id: string;
  name: string;
  emoji: string;
  avatar: string;
  freeTime: TimeSlot[];
  color: string;
}
