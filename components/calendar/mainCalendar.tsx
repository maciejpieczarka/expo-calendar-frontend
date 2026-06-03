import { View } from 'react-native';
import Calendar, { CalendarHeaderProps } from '@/components/calendar/calendar';
import MonthPickerHeader from '@/components/calendar/monthPickerHeader';

export function MainCalendar() {
  return (
    <View className={'flex-1'}>
      <Calendar
        calendarIds={[]}
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
      />
    </View>
  );
}
