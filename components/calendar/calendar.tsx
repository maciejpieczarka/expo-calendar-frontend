import { View } from 'react-native';
import MonthHeader from '@/components/calendar/monthHeader';
import WeekDaysRow from '@/components/calendar/weekDaysRow';
import MonthGrid from '@/components/calendar/monthGrid';
import { useCalendarViewModel } from '@/features/calendar/useCalendarViewModel';
import PagerView from 'react-native-pager-view';
import { useRef } from 'react';
import { MonthGridSkeleton } from '@/components/calendar/monthGridSkeleton';

function Calendar() {
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
  } = useCalendarViewModel();

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
      <MonthHeader
        selectedYear={currentYear}
        selectedMonth={currentMonthValue}
        yearOptions={availableYears}
        monthOptions={availableMonths}
        onDateChange={handleDateSelection}
        onReturnPress={handleReturnToToday}
      />
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
