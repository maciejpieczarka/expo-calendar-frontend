import { User } from './ICalendar';

export interface CalendarInvitation {
  id: number;
  creator: User;
  receiver: User;
  calendarId: number;
  calendarName: string;
  createdTime: string;
  expirationTime: string;
  accepted: boolean;
}

export type CreateCalendarInvitationModel = {
  receiverId: number;
  calendarId: number;
};
