import {
  CalendarEvent,
  MonthPageData,
  MonthSkeleton
} from '@/features/calendar/calendar.types';

import { useState, useMemo } from 'react';
import { format } from 'date-fns';
import { CalendarService } from '@/features/calendar/calendarService';
import { INITIAL_INDEX, WINDOW_SIZE } from '@/constants/calendar.constants';
import { SelectOption } from '@/components/calendar/scrollableSelect';

interface CalendarViewModel {
  currentMonthValue: SelectOption;
  currentYear: SelectOption;
  availableMonths: SelectOption[];
  availableYears: SelectOption[];
  jumpToDate: (year: string, month: string) => void;
  returnToToday: () => void;
  renderedMonths: MonthPageData[];
  INITIAL_INDEX: number;
  onPageChange: (index: number) => void;
}

export const useCalendarViewModel = (): CalendarViewModel => {
  const [initialAnchorDate, setInitialAnchorDate] = useState(new Date());
  const [activeIndex, setActiveIndex] = useState(INITIAL_INDEX);

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
  const jumpToDate = (year: string, month: string) => {
    console.log(year, month);
    setInitialAnchorDate(new Date(parseInt(year), parseInt(month), 1));
    setActiveIndex(INITIAL_INDEX);
  };

  const returnToToday = () => {
    const today = new Date();
    jumpToDate(today.getFullYear().toString(), today.getMonth().toString());
  };

  // skeletons without dayCells

  const monthSkeletons: MonthSkeleton[] = useMemo((): MonthSkeleton[] => {
    const pages: MonthSkeleton[] = [];

    for (let i = -WINDOW_SIZE; i <= WINDOW_SIZE; i++) {
      const pageDate = CalendarService.getNextMonth(initialAnchorDate, i);

      pages.push({
        // id: `page-${format(pageDate, 'yyyy-MM')}`,
        id: `page-${i}`,
        date: pageDate
      });
    }
    return pages;
  }, [initialAnchorDate]);

  // rendering MonthGrids the closest to user
  const renderedMonths = useMemo((): MonthPageData[] => {
    return monthSkeletons.map((page: MonthSkeleton, index): MonthPageData => {
      const today = new Date();
      const isNearActive = Math.abs(index - activeIndex) <= 2;

      if (!isNearActive) {
        return { ...page, dayCells: [] };
      }
      const baseDates = CalendarService.generateGrid(page.date);
      return {
        ...page,
        dayCells: baseDates.map(element => ({
          id: format(element, 'dd-MM-yyyy'),
          dayNumber: element.getDate(),
          isCurrentMonth: element.getMonth() === page.date.getMonth(),
          isToday:
            format(element, 'dd-MM-yyyy') === format(today, 'dd-MM-yyyy'),
          events: []
        }))
      };
    });
  }, [monthSkeletons, activeIndex]);

  const activeDateObj = CalendarService.getNextMonth(
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
    onPageChange: (index: number) => setActiveIndex(index)
  };
};
