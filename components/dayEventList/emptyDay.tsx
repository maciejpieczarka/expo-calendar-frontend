import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { CalendarIcon } from 'lucide-react-native';

export function EmptyDay() {
  return (
    <View className="flex-1 items-center justify-center mt-26 px-6">
      <View className="bg-zinc-100 p-4 rounded-full mb-4">
        <CalendarIcon size={32} className="text-zinc-400" />
      </View>
      <Text className="text-zinc-900  text-lg font-semibold text-center">
        No events scheduled
      </Text>
      <Text className="text-zinc-500 text-sm text-center mt-2">
        You have a free day! Take some time to relax.
      </Text>
    </View>
  );
}
