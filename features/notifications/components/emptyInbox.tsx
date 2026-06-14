import { BellPlus } from 'lucide-react-native';
import { View, Text } from 'react-native';

export function EmptyInbox() {
  return (
    <View className="flex-1 items-center justify-center mt-32 px-6">
      <View className="bg-zinc-100  p-4 rounded-full mb-4">
        <BellPlus size={32} className="text-zinc-400 " />
      </View>
      <Text className="text-zinc-900 text-lg font-semibold text-center">
        No new notifications yet.
      </Text>
      <Text className="text-zinc-500  text-sm text-center mt-2">
        You&#39;re all caught up! New notifications will appear here.
      </Text>
    </View>
  );
}
