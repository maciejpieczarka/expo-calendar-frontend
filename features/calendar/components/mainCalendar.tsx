import { useCalendarData } from '@/features/calendar/hooks/useCalendarData';
import React from 'react';
import { View } from 'react-native';
import Calendar, { CalendarHeaderProps } from './calendar';
import MonthPickerHeader from './monthPickerHeader';

export function MainCalendar() {
  const { isFetching, onActiveDateChange } = useCalendarData({});
  return (
    <View className={'flex-1'}>
      <Calendar
        renderHeader={(props: CalendarHeaderProps) => (
          <MonthPickerHeader
            selectedMonth={props.selectedMonth}
            selectedYear={props.selectedYear}
            monthOptions={props.monthOptions}
            yearOptions={props.yearOptions}
            onReturnPress={props.returnToToday}
            onDateChange={props.jumpToDate}
          />
        )}
        handleEventDataChange={(year: number, month: number) => {
          onActiveDateChange(year, month);
        }}
      />
    </View>
  );
}
