import DayCell from '@/features/calendar/components/dayCell';
import { DayCellData } from '@/features/calendar/calendar.types';
import { StyleSheet, View } from 'react-native';

export interface MonthGridProps {
  dayCells: DayCellData[];
}

function MonthGrid({ dayCells }: MonthGridProps) {
  return (
    <View style={styles.wrapper}>
      {dayCells.map((day, index) => (
        <DayCell key={`cell-slot-${index}`} dayCellData={day} />
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
