import { View } from 'react-native';
import {
  ScrollableSelect,
  SelectOption
} from '@/components/calendar/scrollableSelect';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Icon, Check, Undo2 } from 'lucide-react-native';

export interface MonthPickerHeaderProps {
  selectedYear: SelectOption;
  selectedMonth: SelectOption;
  yearOptions: SelectOption[];
  monthOptions: SelectOption[];
  onDateChange: (year: string, month: string) => void;
  onReturnPress: () => void;
}

function MonthPickerHeader({
  selectedMonth,
  selectedYear,
  monthOptions,
  yearOptions,
  onDateChange,
  onReturnPress
}: MonthPickerHeaderProps) {
  const [localYear, setLocalYear] = useState<SelectOption>(selectedYear);
  const [localMonth, setLocalMonth] = useState<SelectOption>(selectedMonth);

  useEffect(() => {
    setLocalYear(selectedYear);
    setLocalMonth(selectedMonth);
  }, [selectedYear, selectedMonth]);

  const handleMonthChange = (newMonthString: SelectOption) => {
    setLocalMonth(newMonthString);
  };

  const handleYearChange = (newYearString: SelectOption) => {
    setLocalYear(newYearString);
  };

  return (
    <View className="flex flex-row items-center p-2 gap-2">
      <ScrollableSelect
        options={yearOptions}
        selectedValue={localYear}
        placeholder={'Year'}
        onValueChange={handleYearChange}
      />
      <ScrollableSelect
        options={monthOptions}
        selectedValue={localMonth}
        placeholder={'Month'}
        onValueChange={handleMonthChange}
      />
      <Button
        className={'ps-3 pe-3'}
        onPress={() => onDateChange(localYear.value, localMonth.value)}
      >
        <Check color="white" size={20} />
      </Button>
      <Button className={'ps-3 pe-3'} onPress={onReturnPress}>
        <Undo2 color="white" size={20} />
      </Button>
    </View>
  );
}

export default MonthPickerHeader;
