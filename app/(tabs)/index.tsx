import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Calendar from '@/components/calendar/calendar';

const MainScreen = () => {
  return (
    <SafeAreaView className={'flex-1'}>
      <View className={'flex-1'}>
        <Calendar />
      </View>
    </SafeAreaView>
  );
};

export default MainScreen;
