import { View } from 'react-native';
import { WEEKDAY_NAMES } from '@/constants/calendar.constants';
import { Text } from '@/components/ui/text';

function WeekDaysRow() {
  return (
    <View className="flex flex-row justify-center">
      {WEEKDAY_NAMES.map(name => (
        <Text
          style={{ width: '14%', fontSize: 14 }}
          className={'text-center'}
          key={name}
        >
          {name}
        </Text>
      ))}
    </View>
  );
}

export default WeekDaysRow;
