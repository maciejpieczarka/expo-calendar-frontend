import { useEventStore } from '@/lib/eventStore';
import { CalendarEvent } from '@/types/IEvent';
import { useCallback } from 'react';
import { useRouter } from 'expo-router';

export interface UseDayEventListScreenProps {
  dateKey: string;
}

export interface UseDayEventListScreen {
  dayEvents: CalendarEvent[];
  handleReturn: () => void;
}

export const useDayEventListScreen = ({
  dateKey
}: UseDayEventListScreenProps): UseDayEventListScreen => {
  const router = useRouter();
  const { eventsMap } = useEventStore();

  const handleReturn = () => {
    router.back();
  };
  return {
    dayEvents: eventsMap[dateKey],
    handleReturn
  };
};
