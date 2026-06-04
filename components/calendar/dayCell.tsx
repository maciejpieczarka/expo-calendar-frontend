import { View, StyleSheet, InteractionManager } from 'react-native';
import { JSX, memo, useState, useEffect } from 'react';
import { Text } from 'react-native';
import EventLine from '@/components/calendar/eventLine';
import { OptimizedCalendarEvent } from '@/features/calendar/calendar.types';

export interface DayCellProps {
  isCurrentMonth: boolean;
  isToday: boolean;
  id: string;
  dayNumber: number;
  events: OptimizedCalendarEvent[];
}

function DayCellComponent({
  isCurrentMonth,
  isToday,
  dayNumber,
  id,
  events
}: DayCellProps): JSX.Element {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const task = InteractionManager.runAfterInteractions(() => {
      setIsReady(true);
    });

    return () => task.cancel();
  }, []);

  return (
    <View style={styles.outer}>
      <View style={isCurrentMonth ? styles.inner : styles.innerMuted}>
        <Text style={isToday ? styles.dayNumberToday : styles.dayNumber}>
          {dayNumber}
        </Text>

        {isReady &&
          events.map(element => (
            <EventLine
              key={element.id}
              name={element.name}
              color={element.color}
            />
          ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    width: '14.28%',
    height: '16.6%',
    borderRadius: 10,
    padding: 2
  },
  inner: {
    flex: 1,
    backgroundColor: 'rgb(37 37 37)',
    borderRadius: 10
  },
  innerMuted: {
    flex: 1,
    backgroundColor: 'rgb(37 37 37)',
    borderRadius: 10,
    opacity: 0.85
  },
  dayNumber: {
    fontSize: 10,
    color: 'white',
    marginTop: 4,
    marginLeft: 8,
    marginBottom: 6
  },
  dayNumberToday: {
    fontSize: 10,
    color: '#f43f5e',
    fontWeight: '600',
    marginTop: 4,
    marginLeft: 8,
    marginBottom: 6
  }
});

const propEqualCheck = (prevProps: DayCellProps, nextProps: DayCellProps) => {
  return (
    prevProps.id === nextProps.id &&
    prevProps.events.length === nextProps.events.length &&
    prevProps.isCurrentMonth === nextProps.isCurrentMonth &&
    nextProps.isToday === prevProps.isToday &&
    areEventsEqual(prevProps.events, nextProps.events)
  );
};

const DayCell = memo(DayCellComponent, propEqualCheck);

export default DayCell;

const areEventsEqual = (
  prevEvents: OptimizedCalendarEvent[],
  nextEvents: OptimizedCalendarEvent[]
) => {
  if (prevEvents.length !== nextEvents.length) return false;

  for (let i = 0; i < prevEvents.length; i++) {
    const prev = prevEvents[i];
    const next = nextEvents[i];

    if (
      prev.id !== next.id ||
      prev.name !== next.name ||
      prev.color !== next.color
    ) {
      return false;
    }
  }

  return true;
};
