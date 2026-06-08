import { fetchApi } from '@/api/client';
import {
  CalendarEvent,
  CreateEventData,
  UpdateEventData
} from '@/types/IEvent';

export const eventApi = {
  // Create a new event
  createEvent: async (event: CreateEventData): Promise<CalendarEvent> => {
    return fetchApi<CalendarEvent>('/api/event', {
      method: 'POST',
      body: JSON.stringify(event)
    });
  },
  //   Get events by calendar IDs and date range
  getEventsByCalendars: async (params: {
    calendarIds: number[];
    dateFrom: string;
    dateTo: string;
  }): Promise<CalendarEvent[]> => {
    const queryParams = new URLSearchParams();

    queryParams.append('dateFrom', params.dateFrom);
    queryParams.append('dateTo', params.dateTo);

    params.calendarIds.forEach(id => {
      queryParams.append('calendarIds', id.toString());
    });

    const endpointWithParams = `/api/event/by-calendars?${queryParams.toString()}`;
    return fetchApi<CalendarEvent[]>(endpointWithParams, {
      method: 'GET'
    });
  },

  //  Get events assigned to the authenticated user within a date range
  getEventsByUser: async (params: {
    dateFrom: string;
    dateTo: string;
  }): Promise<CalendarEvent[]> => {
    const queryParams = new URLSearchParams();

    queryParams.append('dateFrom', params.dateFrom);
    queryParams.append('dateTo', params.dateTo);

    const endpointWithParams = `/api/event/for-user?${queryParams.toString()}`;
    return fetchApi<CalendarEvent[]>(endpointWithParams, {
      method: 'GET'
    });
  },
  //   Update event details
  updateEvent: async (
    eventId: number,
    eventData: UpdateEventData
  ): Promise<CalendarEvent> => {
    return fetchApi<CalendarEvent>(`/api/event/${eventId}`, {
      method: 'PUT',
      body: JSON.stringify(eventData)
    });
  },
  assignUserToEvent: async (
    eventId: number,
    userId: number
  ): Promise<CalendarEvent> => {
    return fetchApi<CalendarEvent>(`/api/event/${eventId}/assign/${userId}`, {
      method: 'PUT'
    });
  },
  //   Unassign user from event
  unassignUserFromEvent: async (
    eventId: number,
    userId: number
  ): Promise<CalendarEvent> => {
    return fetchApi<CalendarEvent>(`/api/event/${eventId}/unassign/${userId}`, {
      method: 'PUT'
    });
  },
  //   Delete event by ID
  deleteEvent: async (eventId: number): Promise<void> => {
    return fetchApi(`/api/event/${eventId}`, {
      method: 'DELETE'
    });
  },

  // Remove event from a specific calendar
  removeEventFromCalendar: async (
    eventId: number,
    calendarId: number
  ): Promise<CalendarEvent> => {
    return fetchApi<CalendarEvent>(
      `/api/event/${eventId}/remove-from-calendar/${calendarId}`,
      {
        method: 'PUT'
      }
    );
  },
  addEventToCalendar: async (
    eventId: number,
    calendarId: number
  ): Promise<CalendarEvent> => {
    return fetchApi<CalendarEvent>(
      `/api/event/${eventId}/add-to-calendar/${calendarId}`,
      {
        method: 'PUT'
      }
    );
  }
};
