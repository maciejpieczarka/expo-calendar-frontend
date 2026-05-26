import { useAuth } from '@/context/authContext';
import '@/global.css';
import { AuthStore } from '@/lib/authStore';
import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

function RootLayoutContent() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={user === null}>
        <Stack.Screen name="index" />
      </Stack.Protected>

      <Stack.Protected guard={user === null}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>

      <Stack.Protected guard={user !== null}>
        <Stack.Screen name="(tabs)" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  const isLoggedIn = AuthStore(state => state.isLoggedIn);
  const isLoading = AuthStore(state => state.isLoading);
  const checkAuth = AuthStore(state => state.checkAuth);
  const hasCompletedOnboarding = AuthStore(
    state => state.hasCompletedOnboarding
  );

  // Sprawdzenie czy token jwt istnieje juz na urzadzeniu
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen name="(tabs)" />
        </Stack.Protected>

        <Stack.Protected guard={!isLoggedIn && !hasCompletedOnboarding}>
          <Stack.Screen name="index" />
        </Stack.Protected>

        <Stack.Protected guard={!isLoggedIn && hasCompletedOnboarding}>
          <Stack.Screen name="(auth)" />
        </Stack.Protected>
      </Stack>

      <PortalHost />
    </ThemeProvider>
  );
}
