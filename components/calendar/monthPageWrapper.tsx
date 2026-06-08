// components/calendar/monthPageWrapper.tsx
import { View, StyleSheet } from 'react-native';
import { memo } from 'react';
import MonthGrid from '@/components/calendar/monthGrid';
import { MonthPageData } from '@/features/calendar/calendar.types';

interface Props {
  monthPage: MonthPageData;
}

function MonthPageWrapperComponent({ monthPage }: Props) {
  return (
    <View style={styles.wrapper}>
      {monthPage.dayCells.length > 0 ? (
        <MonthGrid dayCells={monthPage.dayCells} />
      ) : (
        <View style={styles.wrapper} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  }
});

const areEqual = (prevProps: Props, nextProps: Props) => {
  if (
    prevProps.monthPage.dayCells.length === 0 &&
    nextProps.monthPage.dayCells.length === 0
  ) {
    return true;
  }
  return false;
};

export const MonthPageWrapper = memo(MonthPageWrapperComponent, areEqual);
