import { calendarApi } from '@/api/calendar';
import { Calendar, CalendarEvent, CalendarState } from '@/types/ICalendar';
import { create } from 'zustand';

export const useCalendarStore = create<CalendarState>()((set, get) => ({
  calendars: [],
  allEvents: [],
  selectedCalendarEvents: [],
  selectedCalendar: null,
  isLoading: false,
  error: null,

  fetchCalendars: async () => {
    set(state => {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    });

    try {
      const calendarData = await calendarApi.getCalendars();

      set(state => {
        return {
          ...state,
          calendars: calendarData,
          isLoading: false
        };
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || 'Nie udało się pobrać kalendarzy'
      });
    }
  },

  createCalendar: async (name: string) => {
    set({ isLoading: true, error: null });

    try {
      const newCalendar = await calendarApi.createCalendar(name);

      set(state => {
        return {
          ...state,
          calendars: [...state.calendars, newCalendar],
          isLoading: false
        };
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || 'Nie udało się utworzyć kalendarza'
      });
      throw error;
    }
  },

  deleteCalendar: async (id: number) => {
    set({ isLoading: true, error: null });

    try {
      await calendarApi.deleteCalendar(id);
      set(state => {
        return {
          ...state,
          calendars: state.calendars.filter(c => c.id !== id),
          selectedCalendar:
            state.selectedCalendar?.id === id ? null : state.selectedCalendar,
          isLoading: false
        };
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || 'Nie udało się usunąć kalendarza'
      });
    }
  },

  setSelectedCalendar: (calendar: Calendar | null) => {
    set({ selectedCalendar: calendar });
    if (calendar === null) {
      set({ selectedCalendarEvents: [] }); // Czyszczenie po zamknięciu modala
    }
  },

  fetchAllEvents: async () => {
    set({ isLoading: true, error: null });
    try {
      //TODO: Add api call
      const mockEvents: CalendarEvent[] = [];
      set({ allEvents: mockEvents, isLoading: false });
    } catch (error: any) {
      set({ isLoading: false, error: error.message });
    }
  },
  fetchEventsByCalendarId: async (calendarId: number) => {
    set({ isLoading: true, error: null });
    try {
      //TODO: Add api call
      const mockSelectedEvents: CalendarEvent[] = [];
      set({ selectedCalendarEvents: mockSelectedEvents, isLoading: false });
    } catch (error: any) {
      set({ isLoading: false, error: error.message });
    }
  }
}));
