import { fetchApi } from '@/api/client';
import {
  CalendarInvitation,
  CreateCalendarInvitationModel
} from '@/types/IInvitation';

export const invitationApi = {
  // GET received invitations
  getReceivedInvitations: async (): Promise<CalendarInvitation[]> => {
    return fetchApi<CalendarInvitation[]>('/api/calendar-invitation/received', {
      method: 'GET'
    });
  },

  // GET sent invitations
  getSentInvitations: async (): Promise<CalendarInvitation[]> => {
    return fetchApi<CalendarInvitation[]>('/api/calendar-invitation/sent', {
      method: 'GET'
    });
  },

  // POST /api/calendar-invitation/send
  sendInvitation: async (
    data: CreateCalendarInvitationModel
  ): Promise<CalendarInvitation> => {
    return fetchApi<CalendarInvitation>('/api/calendar-invitation/send', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  // PUT /api/calendar-invitation/respond/{invitationId}
  respondToInvitation: async (
    invitationId: number,
    accept: boolean
  ): Promise<CalendarInvitation> => {
    return fetchApi<CalendarInvitation>(
      `/api/calendar-invitation/respond/${invitationId}`,
      {
        method: 'PUT',
        body: JSON.stringify(accept)
      }
    );
  }
};
