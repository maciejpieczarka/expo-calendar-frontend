import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { useDayEventListScreen } from '@/hooks/useDayEventListScreen';
import DayEventList from '@/components/dayEventList/dayEventList';

const DayEventListScreen = () => {
  const { date } = useLocalSearchParams<{ date: string }>();

  const { dayEvents, handleReturn } = useDayEventListScreen({ dateKey: date });

  return (
    <SafeAreaView className="flex-grow ">
      <DayEventList
        dayEvents={dayEvents}
        date={date}
        handleReturn={handleReturn}
      />
    </SafeAreaView>
  );
};

export default DayEventListScreen;
