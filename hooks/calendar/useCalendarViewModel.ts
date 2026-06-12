import {
  MonthPageData,
  MonthSkeleton,
  OptimizedCalendarEvent
} from '@/types/calendar.types';

import { SelectOption } from '@/components/calendar/scrollableSelect';
import { INITIAL_INDEX, WINDOW_SIZE } from '@/constants/calendar.constants';
import { generateGrid, getNextMonth } from '@/lib/dateUtils';
import { useEventStore } from '@/lib/stores/eventStore';
import { format } from 'date-fns';
import { useRouter } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';

interface CalendarViewModel {
  currentMonthValue: SelectOption;
  currentYear: SelectOption;
  availableMonths: SelectOption[];
  availableYears: SelectOption[];
  jumpToDate: (year: string, month: string) => number;
  returnToToday: () => number;
  renderedMonths: MonthPageData[];
  INITIAL_INDEX: number;
  onPageChange: (index: number) => void;
  isJumping: boolean;
}

interface CalendarViewModelProps {
  handleEventDataChange?: (year: number, month: number) => void;
  calendarIds?: number[];
}

export const useCalendarViewModel = ({
  handleEventDataChange,
  calendarIds
}: CalendarViewModelProps): CalendarViewModel => {
  const [initialAnchorDate, setInitialAnchorDate] = useState(new Date());
  const [activeIndex, setActiveIndex] = useState(INITIAL_INDEX);
  const [isJumping, setIsJumping] = useState(false);

  // ZMIANA: Pobieramy czystą tablicę events z Zustand store zamiast eventsMap
  const events = useEventStore(state => state.events);
  const isLoading = useEventStore(state => state.isLoading);

  // POPRAWKA: Dzisiejsza data musi mieć ten sam format klucza, czyli yyyy-MM-dd, aby "isToday" działało poprawnie
  const todayStr = format(new Date(), 'yyyy-MM-dd');
  const router = useRouter();

  //months for select
  const availableMonths = useMemo((): SelectOption[] => {
    return Array.from({ length: 12 }, (_, i) => ({
      value: i.toString(),
      label: format(new Date(2026, i, 1), 'MMMM')
    }));
  }, []);

  //years for select
  const availableYears = useMemo((): SelectOption[] => {
    const years: number[] = [];
    const currentY = new Date().getFullYear();
    for (let i = currentY - 30; i <= currentY + 30; i++) {
      years.push(i);
    }

    return years.map(value => ({
      value: value.toString(),
      label: value.toString()
    }));
  }, []);

  //function for changing the anchor date
  const jumpToDate = (year: string, month: string): number => {
    const targetYear = parseInt(year);
    const targetMonth = parseInt(month);

    const anchorYear = initialAnchorDate.getFullYear();
    const anchorMonth = initialAnchorDate.getMonth();
    const monthDiff =
      (targetYear - anchorYear) * 12 + (targetMonth - anchorMonth);

    const targetIndex = INITIAL_INDEX + monthDiff;

    if (targetIndex == activeIndex) {
      return targetIndex;
    }

    if (targetIndex >= 5 && targetIndex <= WINDOW_SIZE * 2 - 5) {
      setIsJumping(true);
      setTimeout(() => {
        setIsJumping(false);
      }, 750);
      setActiveIndex(targetIndex);
      return targetIndex;
    }

    handleEventDataChange && handleEventDataChange(targetYear, targetMonth);

    setIsJumping(true);
    setTimeout(() => {
      setIsJumping(false);
    }, 1000);
    setInitialAnchorDate(new Date(targetYear, targetMonth, 1));
    setActiveIndex(INITIAL_INDEX);

    return INITIAL_INDEX;
  };

  const returnToToday = (): number => {
    const today = new Date();
    return jumpToDate(
      today.getFullYear().toString(),
      today.getMonth().toString()
    );
  };

  // skeletons without dayCells
  const monthSkeletons: MonthSkeleton[] = useMemo((): MonthSkeleton[] => {
    const pages: MonthSkeleton[] = [];

    for (let i = -WINDOW_SIZE; i <= WINDOW_SIZE; i++) {
      const pageDate = getNextMonth(initialAnchorDate, i);

      pages.push({
        id: `page-${i}`,
        date: pageDate
      });
    }
    return pages;
  }, [initialAnchorDate]);

  const openDayEventList = useCallback(
    (dateKey: string) => {
      router.push(`../eventsList/${dateKey}`);
    },
    [router]
  );

  // rendering MonthGrids the closest to user
  const renderedMonths = useMemo((): MonthPageData[] => {
    return monthSkeletons.map((page: MonthSkeleton, index): MonthPageData => {
      const isNearActive = Math.abs(index - activeIndex) <= 2;

      if (!isNearActive) {
        return { ...page, dayCells: [] };
      }
      const baseDates = generateGrid(page.date);

      return {
        ...page,
        dayCells: baseDates.map(element => {
          const dateKey = format(element, 'yyyy-MM-dd');

          // ZMIANA: Zamiast mapy filtrujemy tablicę w locie dla tego konkretnego dnia
          const rawDayEvents = (events || []).filter(event => {
            if (!event.startDate) return false;
            return event.startDate.split('T')[0] === dateKey;
          });

          const filteredEvents =
            calendarIds && calendarIds.length > 0
              ? rawDayEvents.filter(event =>
                  event.calendars.some(cal => calendarIds.includes(cal.id))
                )
              : rawDayEvents;

          const optimizedEvents: OptimizedCalendarEvent[] = filteredEvents
            .map(event => ({
              id: event.id,
              name: event.name,
              color: event.color
            }))
            .slice(0, 4);

          return {
            id: dateKey,
            dayNumber: element.getDate(),
            isCurrentMonth: element.getMonth() === page.date.getMonth(),
            isToday: dateKey === todayStr,
            events: optimizedEvents,
            onCellPress: openDayEventList
          };
        })
      };
    });
    // ZMIANA: Podmieniono eventsMap na events w tablicy zależności useMemo
  }, [
    monthSkeletons,
    activeIndex,
    events,
    calendarIds,
    openDayEventList,
    todayStr
  ]);

  const activeDateObj = getNextMonth(
    initialAnchorDate,
    activeIndex - INITIAL_INDEX
  );

  return {
    currentMonthValue: {
      value: activeDateObj.getMonth().toString(),
      label: format(activeDateObj, 'MMMM')
    },
    currentYear: {
      value: activeDateObj.getFullYear().toString(),
      label: activeDateObj.getFullYear().toString()
    },
    availableMonths,
    availableYears,
    jumpToDate,
    returnToToday,
    renderedMonths,
    INITIAL_INDEX,
    onPageChange: (index: number) => setActiveIndex(index),
    isJumping
  };
};
