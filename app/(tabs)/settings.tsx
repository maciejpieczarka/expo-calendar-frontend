import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useAuthStore } from '@/lib/authStore';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SettingsScreen = () => {
  const { logout } = useAuthStore();
  return (
    <SafeAreaView className="px-safe-offset-5 flex-1">
      <Text variant="h3">Settings</Text>

      <View className="flex-1 justify-end">
        <Button onPress={logout}>
          <Text>Log Out</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
