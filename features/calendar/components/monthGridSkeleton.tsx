import { View } from 'react-native';

export function MonthGridSkeleton() {
  const emptyCells = Array.from({ length: 42 });

  return (
    <View
      style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}
    >
      {emptyCells.map((_, index) => (
        <View
          key={`skeleton-${index}`}
          style={{
            width: '14.28%',
            height: '16.6%',
            padding: 2
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgb(37 37 37)',
              borderRadius: 10,
              opacity: 1
            }}
          />
        </View>
      ))}
    </View>
  );
}
