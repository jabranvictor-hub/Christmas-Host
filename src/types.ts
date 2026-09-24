export type ClassStatus = 'Not Started' | 'LIVE' | 'PAUSED' | 'ENDED';

export type HostStatus = 'Ready' | 'LIVE' | 'On Break' | 'Rehearsing';

export interface HostInfo {
  name: string;
  role: string;
  school: string;
  program: string;
  location: string;
  bio: string;
  quote: string;
  hostId: string;
  micConnected: boolean;
  avatarUrl: string;
}

export interface Student {
  id: string;
  name: string;
  grade: string;
  status: 'present' | 'absent';
  avatarInitials: string;
  avatarColor: string;
  notes?: string;
  stars: number;
}

export interface TimetableItem {
  id: string;
  time: string;
  title: string;
  description: string;
  icon: string;
  durationMinutes: number;
  status: 'upcoming' | 'current' | 'completed';
  cueNotes?: string;
}

export type GameStatus = 'idle' | 'running' | 'paused' | 'ended';

export interface GameQuestion {
  question: string;
  options?: string[];
  answer: string;
  clue?: string;
}

export interface ChristmasGame {
  id: string;
  title: string;
  icon: string;
  category: string;
  description: string;
  status: GameStatus;
  currentRound: number;
  totalRounds: number;
  timerSeconds: number;
  initialTimerSeconds: number;
  questions: GameQuestion[];
  scores: Record<string, number>; // studentId -> score
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  category: 'General' | 'Urgent' | 'Activity' | 'Greeting';
  author: string;
  isPinned?: boolean;
}

export interface SchoolEvent {
  id: string;
  title: string;
  icon: string;
  time: string;
  description: string;
  isHostReady: boolean;
  status: 'scheduled' | 'active' | 'completed';
  highlight: string;
}

export interface MemoryItem {
  id: string;
  title: string;
  caption: string;
  imageUrl: string;
  timestamp: string;
  tag: string;
  likes: number;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  icon: string;
  unread: boolean;
  type: 'class' | 'game' | 'gift' | 'photo' | 'general';
}

export interface SchoolPortal {
  id: string;
  title: string;
  person: string;
  icon: string;
  roleDescription: string;
  status: string;
  isCurrentPortal: boolean;
  badge: string;
  accentColor: string;
  url?: string;
}

export type NavigationTab =
  | 'dashboard'
  | 'controls'
  | 'hosting'
  | 'timetable'
  | 'games'
  | 'attendance'
  | 'announcements'
  | 'events'
  | 'memories'
  | 'notifications'
  | 'profile'
  | 'settings';
