import { useInvitationStore } from '@/lib/invitationStore';
import { CalendarInvitation } from '@/types/IInvitation';
import { useCalendarStore } from '@/lib/calendarStore';

export interface NotificationScreenState {
  receivedInvitations: CalendarInvitation[];
  handleAccept: (invitationId: number) => void;
  handleDecline: (invitationId: number) => void;
}

export const useNotificationScreen = (): NotificationScreenState => {
  //data from the store
  const receivedInvitations = useInvitationStore(
    state => state.receivedInvitations
  );

  //respond function from the store
  const respondToInvitation = useInvitationStore(
    state => state.respondToInvitation
  );

  const fetchCalendars = useCalendarStore(state => state.fetchCalendars);

  //handlers for user actions
  const handleAccept = (id: number) => {
    respondToInvitation(id, true).then(() => {
      fetchCalendars();
    });
  };
  const handleDecline = (id: number) => respondToInvitation(id, false);

  return {
    receivedInvitations,
    handleAccept,
    handleDecline
  };
};
