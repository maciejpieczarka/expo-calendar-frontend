import { Text, View } from 'react-native';
import React from 'react';
import { UserRound, Users } from 'lucide-react-native';
import { CalendarEvent } from '@/types/IEvent';

export function EventCard({ event }: { event: CalendarEvent }) {
  return (
    <View
      style={{ backgroundColor: event.color }}
      className="flex-1 rounded-2xl p-4 min-h-[75px] justify-center"
    >
      <Text className="text-white text-lg font-bold tracking-tight mb-2">
        {event.name}
      </Text>

      <View className="flex-row items-center gap-x-4">
        <View className="flex-row items-center">
          <UserRound size={14} color="rgba(255,255,255,0.8)" />
          <Text className="text-white/90 text-sm font-medium ml-1.5">
            {event.owner.username}
          </Text>
        </View>

        <View className="flex-row items-center">
          <Users size={14} color="rgba(255,255,255,0.8)" />
          <Text className="text-white/90 text-sm font-medium ml-1.5">
            {event.participants.length}
          </Text>
        </View>
      </View>
    </View>
  );
}
