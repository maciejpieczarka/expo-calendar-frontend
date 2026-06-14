import { CalendarCheck } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';
import { Icon } from '../../../components/ui/icon';
import { Text } from '../../../components/ui/text';

const AppFormHeader = () => {
  return (
    <View className="flex flex-row items-end justify-center">
      <Icon as={CalendarCheck} size="76" />
      <Text variant="h1">SyncUp</Text>
    </View>
  );
};

export default AppFormHeader;
