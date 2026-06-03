import { View } from 'react-native';
import DayCell from '@/components/calendar/dayCell';
import { DayCellData } from '@/features/calendar/calendar.types';

export interface MonthGridProps {
  dayCells: DayCellData[];
}

function MonthGrid({ dayCells }: MonthGridProps) {
  return (
    <View
      className="flex flex-row flex-1 flex-wrap w-full"
      // renderToHardwareTextureAndroid={true}
    >
      {dayCells.map((day, index) => (
        <DayCell
          key={day.id}
          id={`cell-slot-${index}`}
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
