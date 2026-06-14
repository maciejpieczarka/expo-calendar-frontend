import { WINDOW_SIZE } from '@/constants/calendar.constants';
import { useCalendarStore } from '@/features/calendar/store/calendarStore';
import { useEventStore } from '@/features/events/store/eventStore';
import { getNextMonth } from '@/lib/dateUtils';
import { endOfMonth, startOfMonth } from 'date-fns';
import { useCallback, useEffect } from 'react';

export interface UseCalendarDataProps {
  calendarDesiredIds?: number[];
}

export interface UseCalendarData {
  isFetching: boolean;
  onActiveDateChange: (year: number, month: number) => void;
}

export const useCalendarData = ({
  calendarDesiredIds
}: UseCalendarDataProps): UseCalendarData => {
  const { fetchEventsForCalendars, isLoading } = useEventStore();
  const { calendars } = useCalendarStore();

  useEffect(() => {
    // const calendarsIds =
    //   calendarDesiredIds && calendarDesiredIds.length > 0
    //     ? calendarDesiredIds
    //     : calendars.map(calendarId => calendarId.id);
    const calendarsIds = calendars.map(calendarId => calendarId.id);
    const today = new Date();
    const to = endOfMonth(getNextMonth(today, WINDOW_SIZE));
    const from = startOfMonth(getNextMonth(today, -WINDOW_SIZE));

    fetchEventsForCalendars(calendarsIds, from.toISOString(), to.toISOString());
  }, [calendars, calendarDesiredIds]);

  const onActiveDateChange = useCallback(
    (year: number, month: number) => {
      // const calendarsIds =
      //   calendarDesiredIds && calendarDesiredIds.length > 0
      //     ? calendarDesiredIds
      //     : calendars.map(calendarId => calendarId.id);
      const calendarsIds = calendars.map(calendarId => calendarId.id);

      const date = new Date(year, month);

      const from = startOfMonth(getNextMonth(date, -WINDOW_SIZE));
      const to = endOfMonth(getNextMonth(date, WINDOW_SIZE));
      fetchEventsForCalendars(
        calendarsIds,
        from.toISOString(),
        to.toISOString()
      );
    },
    [calendars, calendarDesiredIds]
  );

  return {
    isFetching: isLoading,
    onActiveDateChange
  };
};
