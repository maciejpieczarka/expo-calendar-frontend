import DayEventList from '@/components/dayEventList/dayEventList';
import { useDayEventListScreen } from '@/hooks/dayEventsList/useDayEventListScreen';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

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
