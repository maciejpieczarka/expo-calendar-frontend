import { fetchApi } from '@/core/api/client';

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface Calendar {
  id: number;
  name: string;
  owner: User;
  participants: User[];
}

export const calendarApi = {
  createCalendar: async (name: string): Promise<Calendar> => {
    return fetchApi<Calendar>('/api/calendar', {
      method: 'POST',
      body: JSON.stringify({ name })
    });
  },
  getCalendars: async (): Promise<Calendar[]> => {
    return fetchApi<Calendar[]>('/api/calendar', {
      method: 'GET'
    });
  },
  getCalendarParticipants: async (calendarId: number): Promise<User[]> => {
    return fetchApi<User[]>(`/api/calendar/${calendarId}/users`, {
      method: 'GET'
    });
  },
  updateCalendarName: async (
    calendarId: number,
    name: string
  ): Promise<Calendar> => {
    return fetchApi<Calendar>(`/api/calendar/${calendarId}`, {
      method: 'PUT',
      body: JSON.stringify({ name })
    });
  },
  deleteCalendar: async (calendarId: number): Promise<void> => {
    return fetchApi(`/api/calendar/${calendarId}`, {
      method: 'DELETE'
    });
  }
};
