export type User = {
  id: number;
  username: string;
  email: string;
};

export type Calendar = {
  id: number;
  name: string;
  owner: User;
  participants: User[];
};

export interface CalendarEvent {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  calendars: Calendar[];
  participants: User[];
  owner: User;
  color: string;
}

export interface CalendarState {
  calendars: Calendar[];

  // Stan UI
  isLoading: boolean;
  error: string | null;

  //Akcje dla kalendarzy
  fetchCalendars: () => Promise<void>;
  createCalendar: (name: string) => Promise<void>;
  deleteCalendar: (id: number) => Promise<void>;
  updateCalendarName: (calendarId: number, name: string) => Promise<void>;
}
