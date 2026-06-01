import React, { useRef } from 'react';
import {
  NativeSelectScrollView,
  Option,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { ScrollView } from 'react-native-gesture-handler';

export interface SelectOption {
  value: string;
  label: string;
}

interface ScrollableSelectProps {
  options: SelectOption[];
  selectedValue: SelectOption;
  onValueChange: (value: SelectOption) => void;
  placeholder?: string;
  triggerWidth?: number;
  itemHeight?: number;
}

export function ScrollableSelect({
  options,
  selectedValue,
  onValueChange,
  placeholder = 'Select...',
  triggerWidth = 110,
  itemHeight = 35
}: ScrollableSelectProps) {
  const scrollViewRef = useRef<ScrollView>(null);

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      const selectedIndex = options.findIndex(
        opt => opt.value === selectedValue.value
      );
      if (selectedIndex === -1) return;

      setTimeout(() => {
        scrollViewRef.current?.scrollTo({
          y: selectedIndex * itemHeight,
          animated: false
        });
      }, 50);
    }
  };

  const customOnValueChange = (option: Option) => {
    let opt: SelectOption = { value: '', label: '' };
    if (option !== undefined) {
      opt = { value: option.value, label: option.label };
    }
    onValueChange(opt);
  };

  return (
    <Select
      onOpenChange={handleOpenChange}
      value={selectedValue}
      onValueChange={customOnValueChange}
    >
      <SelectTrigger style={{ width: triggerWidth }}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent style={{ width: triggerWidth }}>
        <NativeSelectScrollView ref={scrollViewRef}>
          {options.map(option => (
            <SelectItem
              key={option.value.toString()}
              label={option.label}
              value={option.value.toString()}
              style={{ height: itemHeight }}
            >
              {option.label}
            </SelectItem>
          ))}
        </NativeSelectScrollView>
      </SelectContent>
    </Select>
  );
}
