export interface DayCellData {
  id: string;
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: CalendarEvent[];
}

export interface CalendarEvent {
  id: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  ownerId: number;
  calendarId: number;
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
