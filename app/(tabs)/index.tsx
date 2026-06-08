import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MainCalendar } from '@/components/calendar/mainCalendar';

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
