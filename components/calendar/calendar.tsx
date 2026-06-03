import { View } from 'react-native';
import MonthPickerHeader from '@/components/calendar/monthPickerHeader';
import WeekDaysRow from '@/components/calendar/weekDaysRow';
import MonthGrid from '@/components/calendar/monthGrid';
import { useCalendarViewModel } from '@/features/calendar/useCalendarViewModel';
import PagerView from 'react-native-pager-view';
import { useRef } from 'react';
import { MonthGridSkeleton } from '@/components/calendar/monthGridSkeleton';
import { ReactNode } from 'react';
import { SelectOption } from '@/components/calendar/scrollableSelect';

export interface CalendarHeaderProps {
  selectedYear: SelectOption;
  selectedMonth: SelectOption;
  yearOptions: SelectOption[];
  monthOptions: SelectOption[];
  jumpToDate: (year: string, month: string) => void;
  returnToToday: () => void;
}

export interface CalendarProps {
  calendarIds: number[];
  renderHeader?: (props: CalendarHeaderProps) => ReactNode;
}

function Calendar({ calendarIds, renderHeader }: CalendarProps) {
  const {
    currentMonthValue,
    currentYear,
    availableMonths,
    availableYears,
    jumpToDate,
    returnToToday,
    renderedMonths,
    INITIAL_INDEX,
    onPageChange,
    isJumping
  } = useCalendarViewModel({ calendarIds });

  const pagerRef = useRef<PagerView>(null);

  const handleDateSelection = (year: string, month: string) => {
    const targetIndex = jumpToDate(year, month);
    setTimeout(() => {
      pagerRef.current?.setPageWithoutAnimation(targetIndex);
    }, 10);
  };

  const handleReturnToToday = () => {
    const targetIndex = returnToToday();
    setTimeout(() => {
      pagerRef.current?.setPageWithoutAnimation(targetIndex);
    }, 10);
  };

  return (
    <View className={'flex-1'}>
      {renderHeader &&
        renderHeader({
          selectedYear: currentYear,
          selectedMonth: currentMonthValue,
          yearOptions: availableYears,
          monthOptions: availableMonths,
          jumpToDate: handleDateSelection,
          returnToToday: handleReturnToToday
        })}
      <WeekDaysRow />
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            opacity: isJumping ? 0 : 1
          }}
          pointerEvents={isJumping ? 'none' : 'auto'}
        >
          <PagerView
            ref={pagerRef}
            style={{ flex: 1, width: '100%' }}
            initialPage={INITIAL_INDEX}
            onPageSelected={e => onPageChange(e.nativeEvent.position)}
            offscreenPageLimit={2}
          >
            {renderedMonths.map(monthPage => (
              <View key={monthPage.id} style={{ flex: 1 }}>
                {monthPage.dayCells.length > 0 ? (
                  <MonthGrid dayCells={monthPage.dayCells} />
                ) : (
                  <View style={{ flex: 1 }} />
                )}
              </View>
            ))}
          </PagerView>
        </View>

        {isJumping && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0
            }}
          >
            <MonthGridSkeleton />
          </View>
        )}
      </View>
    </View>
  );
}

export default Calendar;
