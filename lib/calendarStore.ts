import { calendarApi } from '@/api/calendar';
import { CalendarEvent, CalendarState } from '@/types/ICalendar';
import { create } from 'zustand';

export const useCalendarStore = create<CalendarState>()((set, get) => ({
  calendars: [],
  allEvents: [],
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
      console.error(error);
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

  updateCalendarName: async (calendarId, name) => {
    set({ isLoading: true, error: null });
    try {
      const updatedCalendar = await calendarApi.updateCalendarName(
        calendarId,
        name
      );

      // Podmieniamy w tablicy tylko ten jeden zmodyfikowany obiekt kalendarza
      set(state => ({
        calendars: state.calendars.map(c =>
          c.id === calendarId ? updatedCalendar : c
        ),
        isLoading: false
      }));
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || 'Nie udało się zaktualizować nazwy'
      });
      throw error;
    }
  }
}));
