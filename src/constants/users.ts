import { HIGHLIGHT_COLOR } from "./colors";

export interface UserData {
  id: string;
  name: string;
  emoji: string;
  avatar: string;
  color: string;
}

export const ALL_USERS: UserData[] = [
  { 
    id: '0',
    name: 'Jia',
    emoji: '🎯',
    avatar: '👤',
    color: HIGHLIGHT_COLOR.BASE
  },
  { 
    id: '1', 
    name: 'Iheb', 
    emoji: '😄', 
    avatar: '👤',
    color: HIGHLIGHT_COLOR.BASE
  },
  { 
    id: '2', 
    name: 'Himanshu', 
    emoji: '😢', 
    avatar: '👤',
    color: HIGHLIGHT_COLOR.BASE
  },
  { 
    id: '3', 
    name: 'Rio', 
    emoji: '😂', 
    avatar: '👤',
    color: HIGHLIGHT_COLOR.BASE
  },
  { 
    id: '4', 
    name: 'Kevin', 
    emoji: '😍', 
    avatar: '👤',
    color: HIGHLIGHT_COLOR.BASE
  },
  { 
    id: '5', 
    name: 'Nuel', 
    emoji: '😇', 
    avatar: '👤',
    color: HIGHLIGHT_COLOR.BASE
  }
];
