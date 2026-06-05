import React from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { CalendarEvent } from '@/types/IEvent';
import { EmptyDay } from '@/components/dayEventList/emptyDay';
import { EventListItem } from '@/components/dayEventList/eventListItem';
import { ArrowLeft, PlusIcon } from 'lucide-react-native';
import { usePressState } from '@/hooks/dayEventsList/usePressState';
import { Button } from '@/components/ui/button';
import { IconButton } from '@/components/dayEventList/iconButton';

export interface DayEventListProps {
  dayEvents: CalendarEvent[];
  date: string;
  handleReturn: () => void;
}

export default function DayEventList({
  dayEvents,
  date,
  handleReturn
}: DayEventListProps) {
  return (
    <View className="flex-1 bg-white ">
      <View className="px-6 ps-3 pt-6 pb-4 border-b w-full flex flex-row items-center">
        <IconButton handlePress={handleReturn} Icon={ArrowLeft} />
        <View className={' flex-grow ml-5'}>
          <Text className="text-zinc-500 font-medium uppercase tracking-wider  mb-1">
            Schedule
          </Text>
          <Text className="text-2xl font-bold text-zinc-900 ">{date}</Text>
        </View>
        <IconButton Icon={PlusIcon} />
      </View>

      <FlatList
        data={dayEvents}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <EventListItem event={item} />}
        ListEmptyComponent={<EmptyDay />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingTop: 24,
    paddingBottom: 40,
    flexGrow: 1
  }
});
