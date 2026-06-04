import { StyleSheet, View } from 'react-native';
import DayCell from '@/components/calendar/dayCell';
import { DayCellData } from '@/features/calendar/calendar.types';

export interface MonthGridProps {
  dayCells: DayCellData[];
}

function MonthGrid({ dayCells }: MonthGridProps) {
  return (
    <View style={styles.wrapper}>
      {dayCells.map((day, index) => (
        <DayCell
          key={`cell-slot-${index}`}
          id={day.id}
          isToday={day.isToday}
          isCurrentMonth={day.isCurrentMonth}
          dayNumber={day.dayNumber}
          events={day.events}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    flexWrap: 'wrap',
    width: '100%'
  }
});

export default MonthGrid;
