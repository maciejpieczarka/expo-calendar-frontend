import { User } from './ICalendar';

export interface CalendarInvitation {
  id: number;
  creator: User;
  receiver: User;
  calendarId: number;
  calendarName: string;
  createdTime: string;
  expirationTime: string;
  accepted: boolean | null;
}

export type CreateCalendarInvitationModel = {
  receiverId: number;
  calendarId: number;
};

export type InvitationState = {
  //user's received invitations
  receivedInvitations: CalendarInvitation[];
  //user's sent invitations
  sentInvitations: CalendarInvitation[];
  //amount of pending incoming invitations
  pendingCount: number;
  isLoading: boolean;
  error: string | null;

  //fetches sent invitations
  fetchSent: () => Promise<void>;

  //fetches received invitations
  fetchReceived: () => Promise<void>;

  //send an invitations
  sendInvitation: (calendarId: number, receiverId: number) => Promise<void>;

  //accepts or declines the invitation
  respondToInvitation: (invitationId: number, accept: boolean) => Promise<void>;

  //adds new invitation from websocket
  addLiveInvitation: (invitation: CalendarInvitation) => void;
};
