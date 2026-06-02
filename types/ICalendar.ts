type User = {
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
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  calendarId: number;
}

export interface CalendarState {
  calendars: Calendar[];
  allEvents: CalendarEvent[];
  selectedCalendarEvents: CalendarEvent[]; // Wydarzenia tylko dla wybranego kalendarza (do modala)
  selectedCalendar: Calendar | null; // Obecnie kliknięty kalendarz

  // Stan UI
  isLoading: boolean;
  error: string | null;

  //Akcje dla kalendarzy
  fetchCalendars: () => Promise<void>;
  createCalendar: (name: string) => Promise<void>;
  deleteCalendar: (id: number) => Promise<void>;
  setSelectedCalendar: (calendar: Calendar | null) => void;

  fetchAllEvents: () => Promise<void>;
  fetchEventsByCalendarId: (calendarId: number) => Promise<void>;
}
