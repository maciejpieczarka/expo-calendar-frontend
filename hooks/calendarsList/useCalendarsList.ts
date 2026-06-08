import { useCalendarStore } from '@/lib/calendarStore';
import { useEffect, useState } from 'react';

const useCalendarsList = () => {
  const { calendars, isLoading, error, fetchCalendars, createCalendar } =
    useCalendarStore();

  //selected calendar and modal state
  const [selectedId, setSelectedId] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Lokalny stan dla nowego kalendarza
  const [newCalendarName, setNewCalendarName] = useState('');
  const [issubmitting, setIsSubmitting] = useState(false);

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

  return {
    state: {
      error,
      calendars,
      isLoading,
      newCalendarName,
      issubmitting,
      isEmpty: calendars.length === 0,
      selectedId,
      isModalOpen
    },
    actions: {
      setNewCalendarName,
      handleCreate,
      setSelectedId,
      setIsModalOpen,
      openModal,
      closeModal
    }
  };
};

export default useCalendarsList;
