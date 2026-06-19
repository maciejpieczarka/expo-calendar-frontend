import { IconButton } from '@/components/ui/iconButton';
import { CalendarEvent } from '@/features/events/EventModel';
import { ArrowLeft, PlusIcon } from 'lucide-react-native';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import AddEventModal from '../AddEventModal';
import EventDetailModal from '../EventDetailModal';
import { EmptyDay } from './emptyDay';
import { EventListItem } from './eventListItem';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );

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
        <IconButton Icon={PlusIcon} handlePress={() => setIsModalOpen(true)} />
      </View>

      <FlatList
        data={dayEvents}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <EventListItem event={item} onPress={setSelectedEvent} />
        )}
        ListEmptyComponent={<EmptyDay />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
      <AddEventModal
        isOpen={isModalOpen}
        selectedDate={date}
        onClose={() => setIsModalOpen(false)}
      />
      {selectedEvent && (
        <EventDetailModal
          isOpen={!!selectedEvent}
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
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
