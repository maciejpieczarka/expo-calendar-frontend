import { User } from './AuthModel';
import { Calendar } from './CalendarModel';

// Event api models
export type CreateEventData = {
  id: number;
  name: string;
  description?: string;
  startDate: string; // ISO 8601 format
  endDate: string; // ISO 8601 format
  calendarIds?: number[];
  participantIds?: number[];
  color?: string;
};

export type CalendarEvent = {
  id: number;
  name: string;
  description: string;
  startDate: string; // ISO 8601 format
  endDate: string; // ISO 8601 format
  calendars: Calendar[];
  participants: User[];
  owner: User;
  color: string; // Hex color code for event display
};

export type UpdateEventData = {
  name: string;
  description: string;
  startDate: string; // ISO 8601 format
  endDate: string; // ISO 8601 format
  color: string;
};

export type EventState = {
  events: CalendarEvent[]; // Przefiltrowana lista wydarzeń wyświetlana na aktywnym ekranie
  selectedCalendarIds: number[]; // ID kalendarzy zaznaczonych na ekranie głównym (nad kalendarzem)
  isLoading: boolean;
  error: string | null;

  // Pobieranie dla wielu kalendarzy (Ekran Główny / Filtry)
  fetchEventsForCalendars: (
    calendarIds: number[],
    dateFrom: string,
    dateTo: string
  ) => Promise<void>;

  // Zarządzanie filtrami (Przyciskami nad kalendarzem na głównej)
  toggleCalendarFilter: (
    calendarId: number,
    dateFrom: string,
    dateTo: string
  ) => Promise<void>;

  // Operacje na pojedynczych wydarzeniach
  createNewEvent: (eventData: CreateEventData) => Promise<CalendarEvent>;
  deleteEvent: (eventId: number) => Promise<void>;

  // Aktualizacje i zarzadzanie relacjami
  updateEventDetails: (
    eventId: number,
    eventData: UpdateEventData
  ) => Promise<void>;
  assignUserToEvent: (eventId: number, userId: number) => Promise<void>;
  unassignUserFromEvent: (eventId: number, userId: number) => Promise<void>;
  addEventToCalendar: (eventId: number, calendarId: number) => Promise<void>;
  removeEventFromCalendar: (
    eventId: number,
    calendarId: number
  ) => Promise<void>;
};
