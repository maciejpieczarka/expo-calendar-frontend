import { View } from 'react-native';
import { JSX, memo } from 'react';
import { Text } from '@/components/ui/text';
import { CalendarEvent } from '@/features/calendar/calendar.types';
export interface DayCellProps {
  isCurrentMonth: boolean;
  isToday: boolean;
  id: string;
  dayNumber: number;
  events: CalendarEvent[];
}

function DayCellComponent({
  isCurrentMonth,
  isToday,
  dayNumber,
  id,
  events
}: DayCellProps): JSX.Element {
  return (
    <View
      // collapsable={false}
      style={{
        width: '14.28%',
        height: '16.6%',
        borderRadius: 10,
        padding: 2
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgb(37 37 37)',
          borderRadius: 10
        }}
        className={!isCurrentMonth ? 'opacity-85' : ''}
      >
        <Text
          style={{
            fontSize: 10
          }}
          className={`${isToday ? 'text-rose-500 font-semibold' : 'text-white'} +  mt-0 ml-2`}
        >
          {dayNumber}
        </Text>
      </View>
    </View>
  );
}

const propEqualCheck = (prevProps: DayCellProps, nextProps: DayCellProps) => {
  return (
    prevProps.id === nextProps.id &&
    prevProps.events.length === nextProps.events.length &&
    prevProps.isCurrentMonth === nextProps.isCurrentMonth &&
    nextProps.isToday === prevProps.isToday
  );
};

const DayCell = memo(DayCellComponent, propEqualCheck);

export default DayCell;
