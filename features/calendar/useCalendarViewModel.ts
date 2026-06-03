import {
  MonthPageData,
  MonthSkeleton,
  OptimizedCalendarEvent
} from '@/features/calendar/calendar.types';

import { useState, useMemo } from 'react';
import { format } from 'date-fns';
import { CalendarService } from '@/features/calendar/calendarService';
import { INITIAL_INDEX, WINDOW_SIZE } from '@/constants/calendar.constants';
import { SelectOption } from '@/components/calendar/scrollableSelect';
import { CalendarEvent, User } from '@/types/ICalendar';

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
  calendarIds: number[];
}

const mockEvents: CalendarEvent[] = [
  {
    id: 1,
    name: 'Daily Standup',
    description: 'Team sync',
    startDate: '2026-06-15T08:00:00',
    endDate: '2026-06-15T08:30:00',
    calendars: [],
    participants: [],
    owner: {} as User,
    color: '#3B82F6'
  },
  {
    id: 2,
    name: 'Sprint Planning',
    description: 'Sprint planning session',
    startDate: '2026-06-15T08:45:00',
    endDate: '2026-06-15T09:30:00',
    calendars: [],
    participants: [],
    owner: {} as User,
    color: '#10B981'
  },
  {
    id: 3,
    name: 'Design Review',
    description: 'Review UI changes',
    startDate: '2026-06-15T09:00:00',
    endDate: '2026-06-15T10:00:00',
    calendars: [],
    participants: [],
    owner: {} as User,
    color: '#F59E0B'
  },
  {
    id: 4,
    name: 'Backend Sync',
    description: 'API discussion',
    startDate: '2026-06-15T09:45:00',
    endDate: '2026-06-15T10:15:00',
    calendars: [],
    participants: [],
    owner: {} as User,
    color: '#EF4444'
  },
  {
    id: 5,
    name: 'Product Meeting',
    description: 'Roadmap review',
    startDate: '2026-06-15T10:00:00',
    endDate: '2026-06-15T11:00:00',
    calendars: [],
    participants: [],
    owner: {} as User,
    color: '#8B5CF6'
  },
  {
    id: 6,
    name: '1:1 Meeting',
    description: 'Manager catch-up',
    startDate: '2026-06-15T10:30:00',
    endDate: '2026-06-15T11:00:00',
    calendars: [],
    participants: [],
    owner: {} as User,
    color: '#06B6D4'
  },
  {
    id: 7,
    name: 'Architecture Review',
    description: 'System design discussion',
    startDate: '2026-06-15T11:00:00',
    endDate: '2026-06-15T12:00:00',
    calendars: [],
    participants: [],
    owner: {} as User,
    color: '#84CC16'
  },
  {
    id: 8,
    name: 'Client Call',
    description: 'Project status update',
    startDate: '2026-06-15T11:15:00',
    endDate: '2026-06-15T12:15:00',
    calendars: [],
    participants: [],
    owner: {} as User,
    color: '#F97316'
  },
  {
    id: 9,
    name: 'Lunch Break',
    description: 'Lunch',
    startDate: '2026-06-15T12:00:00',
    endDate: '2026-06-15T13:00:00',
    calendars: [],
    participants: [],
    owner: {} as User,
    color: '#64748B'
  },
  {
    id: 10,
    name: 'QA Session',
    description: 'Testing review',
    startDate: '2026-06-15T13:00:00',
    endDate: '2026-06-15T14:00:00',
    calendars: [],
    participants: [],
    owner: {} as User,
    color: '#EC4899'
  },
  {
    id: 11,
    name: 'Bug Triage',
    description: 'Prioritize bugs',
    startDate: '2026-06-15T13:15:00',
    endDate: '2026-06-15T13:45:00',
    calendars: [],
    participants: [],
    owner: {} as User,
    color: '#14B8A6'
  },
  {
    id: 12,
    name: 'Feature Workshop',
    description: 'Discuss new feature',
    startDate: '2026-06-15T14:00:00',
    endDate: '2026-06-15T15:30:00',
    calendars: [],
    participants: [],
    owner: {} as User,
    color: '#A855F7'
  },
  {
    id: 13,
    name: 'Marketing Sync',
    description: 'Campaign planning',
    startDate: '2026-06-15T14:30:00',
    endDate: '2026-06-15T15:00:00',
    calendars: [],
    participants: [],
    owner: {} as User,
    color: '#22C55E'
  },
  {
    id: 14,
    name: 'Code Review',
    description: 'Review pull requests',
    startDate: '2026-06-15T15:00:00',
    endDate: '2026-06-15T16:00:00',
    calendars: [],
    participants: [],
    owner: {} as User,
    color: '#0EA5E9'
  },
  {
    id: 15,
    name: 'Tech Talk',
    description: 'Knowledge sharing',
    startDate: '2026-06-15T15:30:00',
    endDate: '2026-06-15T16:30:00',
    calendars: [],
    participants: [],
    owner: {} as User,
    color: '#EAB308'
  },
  {
    id: 16,
    name: 'Research Session',
    description: 'Investigate solutions',
    startDate: '2026-06-15T16:00:00',
    endDate: '2026-06-15T17:00:00',
    calendars: [],
    participants: [],
    owner: {} as User,
    color: '#DC2626'
  },
  {
    id: 17,
    name: 'Stakeholder Meeting',
    description: 'Project alignment',
    startDate: '2026-06-15T16:15:00',
    endDate: '2026-06-15T17:15:00',
    calendars: [],
    participants: [],
    owner: {} as User,
    color: '#7C3AED'
  },
  {
    id: 18,
    name: 'Deployment',
    description: 'Release to production',
    startDate: '2026-06-15T17:00:00',
    endDate: '2026-06-15T17:30:00',
    calendars: [],
    participants: [],
    owner: {} as User,
    color: '#059669'
  },
  {
    id: 19,
    name: 'Retrospective',
    description: 'Sprint retrospective',
    startDate: '2026-06-15T17:30:00',
    endDate: '2026-06-15T18:30:00',
    calendars: [],
    participants: [],
    owner: {} as User,
    color: '#D97706'
  },
  {
    id: 20,
    name: 'Wrap-up',
    description: 'End of day review',
    startDate: '2026-06-15T18:45:00',
    endDate: '2026-06-15T19:00:00',
    calendars: [],
    participants: [],
    owner: {} as User,
    color: '#475569'
  }
];

const optimizedEvents: OptimizedCalendarEvent[] = mockEvents.map(element => ({
  id: element.id,
  name: element.name,
  color: element.color
}));

export const useCalendarViewModel = ({
  calendarIds
}: CalendarViewModelProps): CalendarViewModel => {
  const [initialAnchorDate, setInitialAnchorDate] = useState(new Date());
  const [activeIndex, setActiveIndex] = useState(INITIAL_INDEX);
  const [isJumping, setIsJumping] = useState(false);

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

    // Calculate how many months away the target is from the anchor
    const anchorYear = initialAnchorDate.getFullYear();
    const anchorMonth = initialAnchorDate.getMonth();
    const monthDiff =
      (targetYear - anchorYear) * 12 + (targetMonth - anchorMonth);

    const targetIndex = INITIAL_INDEX + monthDiff;

    if (targetIndex >= 5 && targetIndex <= WINDOW_SIZE * 2 - 5) {
      setIsJumping(true);
      setTimeout(() => {
        setIsJumping(false);
      }, 750);
      setActiveIndex(targetIndex);
      return targetIndex;
    }
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
      const isNearActive = Math.abs(index - activeIndex) <= 1;

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
          events: optimizedEvents.slice(0, 5)
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
    onPageChange: (index: number) => setActiveIndex(index),
    isJumping
  };
};
