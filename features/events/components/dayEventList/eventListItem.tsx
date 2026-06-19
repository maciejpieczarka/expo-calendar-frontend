import { Text } from '@/components/ui/text';
import { CalendarEvent } from '@/features/events/EventModel';
import { format, parseISO } from 'date-fns';
import { TouchableOpacity, View } from 'react-native';
import { EventCard } from './eventCard';

export function EventListItem({
  event,
  onPress
}: {
  event: CalendarEvent;
  onPress: (event: CalendarEvent) => void;
}) {
  const startTime = format(parseISO(event.startDate), 'HH:mm');
  const endTime = format(parseISO(event.endDate), 'HH:mm');

  return (
    <TouchableOpacity
      onPress={() => onPress(event)}
      activeOpacity={0.8}
      className="w-full"
    >
      <View className="flex-row w-full mb-4 px-4">
        <View className="w-16 items-center justify-start pt-2 pr-3">
          <Text className="text-zinc-900  font-semibold text-base">
            {startTime}
          </Text>
          <Text className="text-zinc-500  text-xs mt-1 font-medium">
            {endTime}
          </Text>
        </View>
        <EventCard event={event} />
      </View>
    </TouchableOpacity>
  );
}
