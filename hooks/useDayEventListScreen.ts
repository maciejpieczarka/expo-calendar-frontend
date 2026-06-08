import { useEventStore } from '@/lib/eventStore';
import { CalendarEvent } from '@/types/IEvent';
import { useRouter } from 'expo-router';
import { useMemo } from 'react';

export interface UseDayEventListScreenProps {
  dateKey: string; // Oczekujemy formatu "YYYY-MM-DD"
}

export interface UseDayEventListScreen {
  dayEvents: CalendarEvent[];
  handleReturn: () => void;
}

export const useDayEventListScreen = ({
  dateKey
}: UseDayEventListScreenProps): UseDayEventListScreen => {
  const router = useRouter();
  const events = useEventStore(state => state.events);
  const selectedCalendarIds = useEventStore(state => state.selectedCalendarIds);

  const dayEvents = useMemo(() => {
    if (!events) return [];

    return events.filter(event => {
      // Wyciągamy samą datę z formatu ISO bazy danych (np. "2026-06-08T12:00:00" -> "2026-06-08")
      const eventDateStr = event.startDate.split('T')[0];
      const isSameDay = eventDateStr === dateKey;

      // Warunek dla modalu filtrów: sprawdzamy, czy wydarzenie należy do chociaż jednego z zaznaczonych kalendarzy
      // Jeśli selectedCalendarIds jest puste, to domyślnie pokazujemy wszystkie (lub na odwrót, zależnie od Waszych ustaleń)
      const matchesCalendar =
        selectedCalendarIds.length === 0 ||
        event.calendars.some(cal => selectedCalendarIds.includes(cal.id));

      return isSameDay && matchesCalendar;
    });
  }, [events, dateKey, selectedCalendarIds]);

  const handleReturn = () => {
    router.back();
  };
  return {
    dayEvents,
    handleReturn
  };
};
