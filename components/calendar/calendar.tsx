import { View } from 'react-native';
import MonthHeader from '@/components/calendar/monthHeader';
import WeekDaysRow from '@/components/calendar/weekDaysRow';
import MonthGrid from '@/components/calendar/monthGrid';
import { useCalendarViewModel } from '@/features/calendar/useCalendarViewModel';
import PagerView from 'react-native-pager-view';
import { useRef } from 'react';

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
    onPageChange
  } = useCalendarViewModel();

  const pagerRef = useRef<PagerView>(null);

  const handleDateSelection = (year: string, month: string) => {
    jumpToDate(year, month);
    setTimeout(() => {
      pagerRef.current?.setPageWithoutAnimation(INITIAL_INDEX);
    }, 10);
  };

  const handleReturnToToday = () => {
    returnToToday();
    setTimeout(() => {
      pagerRef.current?.setPageWithoutAnimation(INITIAL_INDEX);
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
  );
}

export default Calendar;
