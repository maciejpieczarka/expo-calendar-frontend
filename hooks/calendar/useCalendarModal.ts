import { useEventStore } from '@/lib/eventStore';
import { useMemo } from 'react';

export const useCalendarModal = (selectedCalendarId: number) => {
  const eventsMap = useEventStore(state => state.eventsMap);

  const modalEventsMap = useMemo(() => {
    const filteredMap: Record<string, any[]> = {};

    Object.keys(eventsMap).forEach(dateKey => {
      const dayEvents = eventsMap[dateKey];

      const validEvents = dayEvents.filter(event =>
        event.calendars.some(cal => cal.id === selectedCalendarId)
      );

      if (validEvents.length > 0) {
        filteredMap[dateKey] = validEvents;
      }
    });

    return filteredMap;
  }, [eventsMap, selectedCalendarId]);

  return {
    modalEventsMap
  };
};
