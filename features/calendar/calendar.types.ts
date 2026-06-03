import { CalendarEvent } from '@/types/ICalendar';

export interface OptimizedCalendarEvent {
  id: number;
  name: string;
  color: string;
}

export interface DayCellData {
  id: string;
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: OptimizedCalendarEvent[];
}

export interface MonthPageData {
  id: string;
  date: Date;
  dayCells: DayCellData[];
}

export interface MonthSkeleton {
  id: string;
  date: Date;
}
