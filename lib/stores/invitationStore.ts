import { invitationApi } from '@/api/invitation';
import { InvitationState } from '@/types/InvitationModel';
import { create } from 'zustand';

export const useInvitationStore = create<InvitationState>((set, get) => ({
  receivedInvitations: [],
  sentInvitations: [],
  pendingCount: 0,
  isLoading: false,
  error: null,

  fetchReceived: async () => {
    set({ isLoading: true });
    try {
      const invitations = await invitationApi.getReceivedInvitations();
      set({
        receivedInvitations: invitations,
        isLoading: false,
        pendingCount: invitations.filter(el => el.accepted == null).length
      });
    } catch (error: any) {
      console.error(error);
      set({
        isLoading: false,
        error: error.message || 'fetching received invitations has failed'
      });
    }
  },
  fetchSent: async () => {
    set({ isLoading: true });
    try {
      const invitations = await invitationApi.getSentInvitations();
      set({ sentInvitations: invitations, isLoading: false });
    } catch (error: any) {
      console.error(error);
      set({
        isLoading: false,
        error: error.message || 'fetching sent invitations has failed'
      });
    }
  },
  sendInvitation: async (calendarId, receiverId) => {
    set({ isLoading: true });
    try {
      await invitationApi.sendInvitation({ calendarId, receiverId });
      get().fetchSent();
    } catch (error: any) {
      console.error(error);
      set({
        isLoading: false,
        error: error.message || 'sending invitation  has failed'
      });
    }
  },
  respondToInvitation: async (invitationId, accept) => {
    set({ isLoading: true });
    try {
      await invitationApi.respondToInvitation(invitationId, accept);

      set(state => ({
        receivedInvitations: state.receivedInvitations.filter(
          el => el.id !== invitationId
        ),
        pendingCount: state.pendingCount - 1
      }));
    } catch (error: any) {
      console.error(error);
      set({
        isLoading: false,
        error: error.message || 'responding to invitation has failed'
      });
    }
  },
  addLiveInvitation: invitation => {
    console.log(invitation);
    set(state => ({
      receivedInvitations: [...state.receivedInvitations, invitation],
      pendingCount: state.pendingCount + 1
    }));
  }
}));
