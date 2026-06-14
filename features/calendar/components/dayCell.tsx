import EventLine from '@/features/calendar/components/eventLine';
import {
  DayCellData,
  OptimizedCalendarEvent
} from '@/features/calendar/calendar.types';
import { JSX, memo, useEffect, useState } from 'react';
import {
  InteractionManager,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';

export interface DayCellProps {
  dayCellData: DayCellData;
}

function DayCellComponent({ dayCellData }: DayCellProps): JSX.Element {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const task = InteractionManager.runAfterInteractions(() => {
      setIsReady(true);
    });

    return () => task.cancel();
  }, []);

  const handlePress = () => {
    dayCellData.onCellPress && dayCellData.onCellPress(dayCellData.id);
  };

  return (
    <View style={styles.outer}>
      <Pressable
        style={dayCellData.isCurrentMonth ? styles.inner : styles.innerMuted}
        onPress={handlePress}
      >
        <Text
          style={dayCellData.isToday ? styles.dayNumberToday : styles.dayNumber}
        >
          {dayCellData.dayNumber}
        </Text>

        {isReady &&
          dayCellData.events.map(element => (
            <EventLine
              key={element.id}
              name={element.name}
              color={element.color}
            />
          ))}
      </Pressable>
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
    prevProps.dayCellData.id === nextProps.dayCellData.id &&
    prevProps.dayCellData.events.length ===
      nextProps.dayCellData.events.length &&
    prevProps.dayCellData.isCurrentMonth ===
      nextProps.dayCellData.isCurrentMonth &&
    nextProps.dayCellData.isToday === prevProps.dayCellData.isToday &&
    areEventsEqual(prevProps.dayCellData.events, nextProps.dayCellData.events)
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
