import { Pressable, View, Text, Modal } from 'react-native';
import Calendar from '@/components/calendar/calendar';

interface CalendarModalProps {
  visible: boolean;
  onClose: () => void;
}

export function CalendarModal({ visible, onClose }: CalendarModalProps) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/60">
        <View className="bg-zinc-950 rounded-t-3xl h-[90%] w-full overflow-hidden">
          <Calendar
            calendarIds={[]}
            renderHeader={({ selectedMonth, selectedYear }) => (
              <View className="flex-row items-center justify-between px-6 py-5 border-b border-zinc-800/50">
                <Text className="text-white text-xl font-bold tracking-wide">
                  {selectedMonth.label} {selectedYear.label}
                </Text>
                <Pressable
                  onPress={onClose}
                  className="px-3 py-1 bg-zinc-800 rounded-full active:bg-zinc-700"
                >
                  <Text className="text-zinc-200 font-medium">Done</Text>
                </Pressable>
              </View>
            )}
          />
        </View>
      </View>
    </Modal>
  );
}
