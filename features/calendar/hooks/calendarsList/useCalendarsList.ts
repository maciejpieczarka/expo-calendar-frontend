import { useAuthStore } from '@/features/auth/store/authStore';
import { useCalendarStore } from '@/features/calendar/store/calendarStore';
import { useInvitationStore } from '@/features/notifications/store/invitationStore';
import { useEffect, useState } from 'react';

const useCalendarsList = () => {
  const { calendars, isLoading, error, fetchCalendars, createCalendar } =
    useCalendarStore();

  const user = useAuthStore(state => state.user);
  const fetchSent = useInvitationStore(state => state.fetchSent);

  //selected calendar and modal state
  const [selectedId, setSelectedId] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [selectedModificationCalendarId, setSelectedModificationCalendarId] =
    useState<number>(0);

  // Lokalny stan dla nowego kalendarza
  const [newCalendarName, setNewCalendarName] = useState('');
  const [issubmitting, setIsSubmitting] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const calendarIdsForInvite = calendars
    .filter(calendar => calendar.owner.id === user?.id)
    .map(calendar => calendar.id);

  useEffect(() => {
    fetchCalendars();
  }, [fetchCalendars]);

  const handleCreate = async () => {
    if (!newCalendarName.trim()) return null;

    setIsSubmitting(true);
    try {
      await createCalendar(newCalendarName);
      setNewCalendarName('');
    } catch (error: any) {
      console.error('Błąd tworzenia kalendarza w ViewModelu:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  //handler for opening the modal with the selected calendar id
  const openModal = (calendarId: number) => {
    setSelectedId([calendarId]);
    setIsModalOpen(true);
  };

  //handler to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openInviteModal = (calendarId: number) => {
    setSelectedModificationCalendarId(calendarId);
    setIsInviteModalOpen(true);
  };

  const closeInviteModal = () => {
    setIsInviteModalOpen(false);
    fetchSent();
  };

  const handleCalendarItemLongPress = (calendarId: number) => {
    setSelectedModificationCalendarId(calendarId);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  return {
    state: {
      error,
      calendars,
      isLoading,
      newCalendarName,
      issubmitting,
      isEmpty: calendars.length === 0,
      selectedId,
      isModalOpen,
      isInviteModalOpen,
      selectedModificationCalendarId: selectedModificationCalendarId,
      calendarIdsForInvite,
      selectedCalendar: calendars.find(
        calendar => calendar.id === selectedModificationCalendarId
      ),
      isEditModalOpen
    },
    actions: {
      setNewCalendarName,
      handleCreate,
      setSelectedId,
      setIsModalOpen,
      openModal,
      closeModal,
      openInviteModal,
      closeInviteModal,
      closeEditModal,
      handleCalendarItemLongPress
    }
  };
};

export default useCalendarsList;
