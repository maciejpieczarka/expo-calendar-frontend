import { NAV_THEME } from '@/core/theme/theme';
import { useAuthStore } from '@/features/auth/store/authStore';
import '@/global.css';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  const { _hasHydrated, isLoggedIn, hasCompletedOnboarding, checkAuth } =
    useAuthStore();

  useEffect(() => {
    if (_hasHydrated) {
      checkAuth();
      SplashScreen.hideAsync();
    }
  }, [_hasHydrated]);

  // NIE renderuj routingu dopóki zustand się nie zhydratuje
  if (!_hasHydrated) {
    return null;
  }
  return (
    <GestureHandlerRootView>
      <KeyboardProvider>
        <SafeAreaProvider>
          <ThemeProvider value={NAV_THEME[colorScheme ?? 'dark']}>
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
        </SafeAreaProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}
