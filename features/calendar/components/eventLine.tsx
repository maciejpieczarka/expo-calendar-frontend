import { Text, StyleSheet } from 'react-native';
import { useMemo } from 'react';

export interface EventLineProps {
  name: string;
  color: string;
}

function EventLine({ name, color }: EventLineProps) {
  const colorStyle = useMemo(() => ({ backgroundColor: color }), [color]);
  return (
    <Text numberOfLines={1} style={[styles.text, colorStyle]}>
      {name}
    </Text>
  );
}

export default EventLine;

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 8,
    marginBottom: 2,
    borderRadius: 2,
    marginLeft: 3,
    marginRight: 3,
    padding: 0
  }
});
