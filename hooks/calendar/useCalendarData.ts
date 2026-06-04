import { useEffect, useCallback } from 'react';
import { useEventStore } from '@/lib/eventStore';
import { getNextMonth } from '@/utils/dateUtils';
import { WINDOW_SIZE } from '@/constants/calendar.constants';
import { endOfMonth, startOfMonth } from 'date-fns';

export function useCalendarData() {
  const { fetchEventsForCalendars, isLoading } = useEventStore();

  useEffect(() => {
    const today = new Date();
    const to = startOfMonth(getNextMonth(today, WINDOW_SIZE));
    const from = endOfMonth(getNextMonth(today, -WINDOW_SIZE));
    fetchEventsForCalendars([], from.toISOString(), to.toISOString());
  }, []);

  const onActiveDateChange = useCallback((year: number, month: number) => {
    const date = new Date(year, month);
    const from = startOfMonth(getNextMonth(date, WINDOW_SIZE));
    const to = endOfMonth(getNextMonth(date, -WINDOW_SIZE));
    fetchEventsForCalendars([], from.toISOString(), to.toISOString());
  }, []);

  return {
    isFetching: isLoading,
    onActiveDateChange
  };
}
