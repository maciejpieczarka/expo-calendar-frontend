import { View } from 'react-native';
import Calendar, { CalendarHeaderProps } from '@/components/calendar/calendar';
import MonthPickerHeader from '@/components/calendar/monthPickerHeader';
import React from 'react';
import { useCalendarData } from '@/hooks/calendar/useCalendarData';

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
