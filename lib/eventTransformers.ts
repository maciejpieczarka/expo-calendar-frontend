import { CalendarEvent } from '@/types/Models/EventModel';
import { format, parseISO } from 'date-fns';

//function that creates a map of CalendarEvents with date keys in format dd-MM-yyyy
export function mapEventsByDate(events: CalendarEvent[]) {
  const map: Record<string, CalendarEvent[]> = {};
  events.forEach(event => {
    const parsedDate = parseISO(event.startDate);
    const dateKey = format(new Date(parsedDate), 'yyyy-MM-dd');

    if (!map[dateKey]) map[dateKey] = [];

    map[dateKey].push({
      ...event
    });
  });
  return map;
}
