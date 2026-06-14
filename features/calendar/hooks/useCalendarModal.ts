import { useEventStore } from '@/features/events/store/eventStore';
import { useMemo } from 'react';
import { CalendarEvent } from '@/features/events/EventModel';

export const useCalendarModal = (selectedCalendarId: number) => {
  const events = useEventStore(state => state.events);

  const modalEventsMap = useMemo(() => {
    const filteredMap: Record<string, CalendarEvent[]> = {};

    (events || []).forEach(event => {
      if (!event.startDate) return;

      const belongsToCalendar = event.calendars.some(
        cal => cal.id === selectedCalendarId
      );

      if (belongsToCalendar) {
        const dateKey = event.startDate.split('T')[0];

        if (!filteredMap[dateKey]) {
          filteredMap[dateKey] = [];
        }
        filteredMap[dateKey].push(event);
      }
    });

    return filteredMap;
  }, [events, selectedCalendarId]);

  return {
    modalEventsMap
  };
};
