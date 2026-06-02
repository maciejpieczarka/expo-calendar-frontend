import { useCalendarStore } from '@/lib/calendarStore';
import { useEffect, useState } from 'react';

const useCalendarsList = () => {
  const { calendars, isLoading, error, fetchCalendars, createCalendar } =
    useCalendarStore();

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

  return {
    state: {
      error,
      calendars,
      isLoading,
      newCalendarName,
      issubmitting,
      isEmpty: calendars.length === 0
    },
    actions: {
      setNewCalendarName,
      handleCreate
    }
  };
};

export default useCalendarsList;
