import { User } from '@/features/auth/AuthModel';
import { useAuthStore } from '@/features/auth/store/authStore';
import { useInvitationStore } from '@/features/notifications/store/invitationStore';
import { userApi } from '@/features/users/api/users';
import { useEffect, useMemo, useState } from 'react';

export const useInviteUserModal = (
  calendarId: number,
  visible: boolean,
  existingMemberIds: number[] = []
) => {
  const currentUser = useAuthStore(state => state.user);
  const sendInvitation = useInvitationStore(state => state.sendInvitation);
  const sentInvitations = useInvitationStore(state => state.sentInvitations);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const [localInvitedIds, setLocalInvitedIds] = useState<Set<number>>(
    new Set()
  );

  const historicalInvitedIds = useMemo(() => {
    return new Set(
      sentInvitations
        .filter(inv => inv.calendarId === calendarId)
        .map(inv => inv.receiver.id)
    );
  }, [sentInvitations, calendarId]);

  const memberIdsSet = useMemo(
    () => new Set(existingMemberIds),
    [existingMemberIds]
  );

  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const delayDebounceFn = setTimeout(async () => {
      try {
        const users = await userApi.getUsers(searchQuery.trim());
        const filteredUsers = users
          .filter(u => u.id !== currentUser?.id)
          .slice(0, 5);
        setSearchResults(filteredUsers);
      } catch (error) {
        console.error('Failed to search users', error);
      } finally {
        setIsSearching(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, currentUser]);

  useEffect(() => {
    if (!visible) {
      setSearchQuery('');
      setSearchResults([]);
      setLocalInvitedIds(new Set());
    }
  }, [visible]);

  const handleInvite = async (receiverId: number) => {
    try {
      await sendInvitation(calendarId, receiverId);
      setLocalInvitedIds(prev => new Set(prev).add(receiverId));
    } catch (error) {
      console.error('Invite failed', error);
    }
  };

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    localInvitedIds,
    historicalInvitedIds,
    memberIdsSet,
    handleInvite
  };
};
