import { MainCalendar } from '@/features/calendar/components/mainCalendar';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MainScreen = () => {
  return (
    <SafeAreaView className={'flex-1'}>
      <View className={'flex-1'}>
        <MainCalendar />
      </View>
    </SafeAreaView>
  );
};

export default MainScreen;
