import { View } from 'react-native';
import DayCell from '@/components/calendar/dayCell';
import { DayCellData } from '@/features/calendar/calendar.types';

export interface MonthGridProps {
  dayCells: DayCellData[];
}

function MonthGrid({ dayCells }: MonthGridProps) {
  return (
    <View className="flex flex-row flex-1 flex-wrap w-full">
      {dayCells.map(day => (
        <DayCell
          key={day.id}
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

export default MonthGrid;
