import { eventApi } from '@/api/events';
import { CreateEventData, EventState, UpdateEventData } from '@/types/IEvent';
import { mapEventsByDate } from '@/utils/eventTransformers';
import { create } from 'zustand';

export const useEventStore = create<EventState>()((set, get) => ({
  events: [],
  selectedCalendarIds: [],
  isLoading: false,
  error: null,
  //a map of CalendarEvents with date keys in format dd-MM-yyyy
  eventsMap: {},

  fetchEventsForCalendars: async (
    calendarIds: number[],
    dateFrom: string,
    dateTo: string
  ) => {
    if (calendarIds.length === 0) {
      set({ eventsMap: {}, events: [], isLoading: false });
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const data = await eventApi.getEventsByCalendars({
        calendarIds,
        dateFrom,
        dateTo
      });
      const map = mapEventsByDate(data);

      set({ eventsMap: map, events: data, isLoading: false });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || 'Blad pobierania wydarzen'
      });
    }
  },
  toggleCalendarFilter: async (
    calendarId: number,
    dateFrom: string,
    dateTo: string
  ) => {
    const currentIds = get().selectedCalendarIds;

    const nextIds = currentIds.includes(calendarId)
      ? currentIds.filter(id => id !== calendarId)
      : [...currentIds, calendarId];

    set({ selectedCalendarIds: nextIds });

    await get().fetchEventsForCalendars(nextIds, dateFrom, dateTo);
  },
  createNewEvent: async (eventData: CreateEventData) => {
    set({ isLoading: true, error: null });

    try {
      const newEvent = await eventApi.createEvent(eventData);

      const hasSelectedCalendar = newEvent.calendars.some(calendar =>
        get().selectedCalendarIds.includes(calendar.id)
      );
      set(state => ({
        events: hasSelectedCalendar
          ? [...state.events, newEvent]
          : state.events,
        isLoading: false
      }));
      return newEvent;
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || 'Blad podczas tworzenia eventu'
      });
      throw error;
    }
  },
  deleteEvent: async (eventId: number) => {
    set({ isLoading: true, error: null });
    try {
      await eventApi.deleteEvent(eventId);
      set(state => ({
        ...state,
        events: state.events.filter(event => event.id !== eventId),
        isLoading: false
      }));
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || 'Nie udało się usunąć wydarzenia'
      });
      throw error;
    }
  },
  updateEventDetails: async (eventId: number, eventData: UpdateEventData) => {
    set({ isLoading: true, error: null });

    try {
      const updatedEvent = await eventApi.updateEvent(eventId, eventData);

      set(state => ({
        events: state.events.map(event =>
          event.id === eventId ? updatedEvent : event
        ),
        isLoading: false
      }));
    } catch (error: any) {
      set({ error: error.message || 'Blad podczas aktualizowania eventu' });
      throw error;
    }
  },
  assignUserToEvent: async (eventId: number, userId: number) => {
    set({ isLoading: true, error: null });
    try {
      const updatedEvent = await eventApi.assignUserToEvent(eventId, userId);
      set(state => ({
        events: state.events.map(e => (e.id === eventId ? updatedEvent : e)),
        isLoading: false
      }));
    } catch (error: any) {
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },
  unassignUserFromEvent: async (eventId: number, userId: number) => {
    set({ isLoading: true, error: null });
    try {
      const updatedEvent = await eventApi.assignUserToEvent(eventId, userId);
      set(state => ({
        events: state.events.map(e => (e.id === eventId ? updatedEvent : e)),
        isLoading: false
      }));
    } catch (error: any) {
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },
  addEventToCalendar: async (eventId: number, calendarId: number) => {
    set({ isLoading: true, error: null });
    try {
      const updatedEvent = await eventApi.addEventToCalendar(
        eventId,
        calendarId
      );
      set(state => ({
        events: state.events.map(e => (e.id === eventId ? updatedEvent : e)),
        isLoading: false
      }));
    } catch (error: any) {
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },
  removeEventFromCalendar: async (eventId: number, calendarId: number) => {
    set({ isLoading: true, error: null });
    try {
      const updatedEvent = await eventApi.removeEventFromCalendar(
        eventId,
        calendarId
      );

      const currentFilters = get().selectedCalendarIds;
      const stillVisible = updatedEvent.calendars.some(c =>
        currentFilters.includes(c.id)
      );

      set(state => ({
        events: stillVisible
          ? state.events.map(e => (e.id === eventId ? updatedEvent : e))
          : state.events.filter(e => e.id !== eventId), // Czyścimy z UI, jeśli nie pasuje do filtrów
        isLoading: false
      }));
    } catch (error: any) {
      set({ isLoading: false, error: error.message });
      throw error;
    }
  }
}));
