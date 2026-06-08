import { CalendarEvent } from '@/types/IEvent';
import { View } from 'react-native';
import { EventCard } from '@/components/dayEventList/eventCard';
import { Text } from '@/components/ui/text';
import { format, parseISO } from 'date-fns';

export function EventListItem({ event }: { event: CalendarEvent }) {
  const startTime = format(parseISO(event.startDate), 'HH:mm');
  const endTime = format(parseISO(event.endDate), 'HH:mm');

  return (
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
  );
}
