import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { useLogin } from '@/features/auth/hooks/useLogin';
import { Link } from 'expo-router';
import * as React from 'react';
import { ActivityIndicator, TextInput, View } from 'react-native';

export function SignInForm() {
  const passwordInputRef = React.useRef<TextInput>(null);

  // Inicjalizacja viewmodelu
  const { state, actions } = useLogin();

  function onUsernameSubmitEditting() {
    passwordInputRef.current?.focus();
  }

  function onSubmit() {
    actions.handleLogin();
  }

  return (
    <Card className="border-border/0  sm:border-border shadow-none sm:shadow-sm sm:shadow-black/5">
      <CardHeader>
        <CardTitle className="text-center text-xl sm:text-left">
          Sign in to your app
        </CardTitle>
        <CardDescription className="text-center sm:text-left">
          Welcome back! Please sign in to continue.
        </CardDescription>
      </CardHeader>
      <CardContent className="gap-6">
        {state.errors.general && (
          <View className="bg-red-500/10 p-3 rounded-lg border border-red-500/20">
            <Text className="text-red-500 text-center text-sm font-medium">
              {state.errors.general}
            </Text>
          </View>
        )}
        <View className="gap-6">
          {/* username */}
          <View className="gap-1.5">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={state.username}
              onChangeText={actions.setUsername}
              placeholder="JohnDoe"
              keyboardType="default"
              autoCapitalize="none"
              onSubmitEditing={onUsernameSubmitEditting}
              returnKeyType="next"
              submitBehavior="submit"
              className={
                state.errors.password ? 'border-red-500 bg-red-500/5' : ''
              }
            />
            {state.errors.username && (
              <Text className="text-red-500 text-xs ml-1">
                {state.errors.username}
              </Text>
            )}
          </View>
          {/* Password */}
          <View className="gap-1.5">
            <View className="flex-row items-center">
              <Label htmlFor="password">Password</Label>
            </View>
            <Input
              ref={passwordInputRef}
              value={state.password}
              onChangeText={actions.setPassword}
              id="password"
              secureTextEntry
              returnKeyType="send"
              onSubmitEditing={onSubmit}
              className={
                state.errors.password ? 'border-red-500 bg-red-500/5' : ''
              }
            />
            <Text className="text-red-500 text-xs ml-1">
              {state.errors.password}
            </Text>
          </View>
          <Button
            disabled={state.isLoading}
            className="w-full"
            onPress={onSubmit}
          >
            {state.isLoading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text>Continue</Text>
            )}
          </Button>
        </View>
        <View className="flex flex-row items-center justify-center gap-2">
          <Text className="text-center text-sm">
            Don&apos;t have an account?
          </Text>
          <Link href="/register">
            <Text className="text-sm underline underline-offset-4">
              Sign up
            </Text>
          </Link>
        </View>
      </CardContent>
    </Card>
  );
}
