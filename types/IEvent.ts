import { User } from './Iauth';
import { Calendar } from './ICalendar';

export interface CreateEventData {
  id: number;
  description: string;
  startTime: string; // ISO 8601 format
  endTime: string; // ISO 8601 format
  calendarIds: number[];
  participantIds: number[];
  color: string;
}

export interface CalendarEvent {
  id: number;
  name: string;
  description: string;
  startTime: string; // ISO 8601 format
  endTime: string; // ISO 8601 format
  calendars: Calendar[];
  participants: User[];
  owner: User;
  color: string; // Hex color code for event display
}
