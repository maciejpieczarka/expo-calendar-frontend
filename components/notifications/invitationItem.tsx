import { IconButton } from '@/components/ui/iconButton';
import { Check, Clock, X } from 'lucide-react-native';
import { View, Text } from 'react-native';
import { CalendarInvitation } from '@/types/IInvitation';
import { format, parseISO } from 'date-fns';

export interface InvitationItemProps {
  item: CalendarInvitation;
  onAccept: (id: number) => void;
  onDecline: (id: number) => void;
}

export function InvitationItem({
  item,
  onAccept,
  onDecline
}: InvitationItemProps) {
  const formattedDate = format(parseISO(item.expirationTime), 'MMM d, h:mm a');

  return (
    <View className="flex-row items-center p-4 mb-3 bg-zinc-100 rounded-2xl border border-zinc-200">
      <View className="flex-1 pr-4">
        <Text className="text-zinc-900 text-base font-semibold mb-1">
          {item.calendarName}
        </Text>

        <Text className="text-zinc-600  text-sm mb-2 leading-tight">
          <Text className="font-medium text-zinc-800 ">
            {item.creator.username}
          </Text>{' '}
          invited you to join this calendar.
        </Text>
        <View className="flex-row items-center">
          <Clock size={12} color="#71717a" />
          <Text className="text-zinc-500 text-xs ml-1.5 font-medium">
            Expires: {formattedDate}
          </Text>
          <View className="flex-row flex-1 justify-end gap-2">
            <IconButton
              Icon={Check}
              handlePress={() => onAccept(item.id)}
              borderRadius={3}
              containerSize={30}
              iconSize={27}
            />
            <IconButton
              Icon={X}
              iconSize={27}
              handlePress={() => onDecline(item.id)}
              borderRadius={3}
              containerSize={30}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
