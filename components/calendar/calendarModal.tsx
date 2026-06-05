import { Pressable, View, Text, Modal } from 'react-native';
import Calendar from '@/components/calendar/calendar';
import { useCalendarData } from '@/hooks/calendar/useCalendarData';
import { Button } from '@/components/ui/button';

interface CalendarModalProps {
  visible: boolean;
  onClose: () => void;
  calendarIds: number[];
}

export function CalendarModal({
  visible,
  onClose,
  calendarIds
}: CalendarModalProps) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/70">
        <View className="bg-white rounded-t-3xl h-[90%] w-full overflow-hidden">
          <Calendar
            renderHeader={({ selectedMonth, selectedYear }) => (
              <View className="flex-row items-center justify-between px-6 py-5 border-b border-zinc-800/50">
                <Text className="text-black text-xl font-bold tracking-wide">
                  {selectedMonth.label} {selectedYear.label}
                </Text>
                <Button
                  onPress={onClose}
                  className={
                    'px-3 py-1 bg-zinc-800 rounded-full active:bg-zinc-700'
                  }
                >
                  <Text className="text-zinc-200 font-medium">Done</Text>
                </Button>
              </View>
            )}
            calendarIds={calendarIds}
          />
        </View>
      </View>
    </Modal>
  );
}
