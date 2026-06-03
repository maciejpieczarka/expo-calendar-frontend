import { View } from 'react-native';
import { Text } from 'react-native';

export interface EventLineProps {
  name: string;
  color: string;
}

function EventLine({ name, color }: EventLineProps) {
  return (
    <Text
      numberOfLines={1}
      style={{
        fontSize: 8,
        backgroundColor: color,
        marginBottom: 2,
        borderRadius: 2
      }}
      className={'m-0 p-0 text-ellipsis '}
    >
      {name}
    </Text>
  );
}

export default EventLine;
