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
import { useRegister } from '@/features/auth/hooks/useRegister';
import { Link } from 'expo-router';
import * as React from 'react';
import { ActivityIndicator, TextInput, View } from 'react-native';

export function SignUpForm() {
  const passwordInputRef = React.useRef<TextInput>(null);
  const emailInputRef = React.useRef<TextInput>(null);

  const { state, actions } = useRegister();

  function onUsernameSubmitEditing() {
    emailInputRef.current?.focus();
  }

  function onEmailSubmitEditing() {
    passwordInputRef.current?.focus();
  }

  function onSubmit() {
    actions.handleRegister();
  }

  return (
    <Card className="border-border/0 z-10 sm:border-border shadow-none sm:shadow-sm sm:shadow-black/5">
      <CardHeader>
        <CardTitle className="text-center text-xl sm:text-left">
          Create your account
        </CardTitle>
        <CardDescription className="text-center sm:text-left">
          Welcome! Please fill in the details to get started.
        </CardDescription>
      </CardHeader>
      <CardContent className="gap-6">
        {/* Wyświetlanie błędu ogólnego z API, jeśli istnieje */}
        {state.errors.general && (
          <View className="bg-red-500/10 p-3 rounded-lg border border-red-500/20">
            <Text className="text-red-500 text-center text-sm font-medium">
              {state.errors.general}
            </Text>
          </View>
        )}

        {/* username */}
        <View className="gap-6">
          <View className="gap-1.5">
            <Label htmlFor="email">Username</Label>
            <Input
              id="username"
              value={state.username}
              onChangeText={actions.setUsername}
              placeholder="username"
              keyboardType="default"
              autoCapitalize="none"
              onSubmitEditing={onUsernameSubmitEditing}
              returnKeyType="next"
              submitBehavior="submit"
              className={
                state.errors.username ? 'border-red-500 bg-red-500/5' : ''
              }
            />
            {state.errors.username && (
              <Text className="text-red-500 text-xs ml-1">
                {state.errors.username}
              </Text>
            )}
          </View>

          {/* email */}
          <View className="gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              ref={emailInputRef}
              value={state.email} // Podpięcie pod ViewModel
              onChangeText={actions.setEmail} // Podpięcie pod ViewModel
              placeholder="m@example.com"
              keyboardType="email-address"
              autoComplete="email"
              autoCapitalize="none"
              onSubmitEditing={onEmailSubmitEditing}
              returnKeyType="next"
              submitBehavior="submit"
              className={
                state.errors.email ? 'border-red-500 bg-red-500/5' : ''
              }
            />
            {state.errors.email && (
              <Text className="text-red-500 text-xs ml-1">
                {state.errors.email}
              </Text>
            )}
          </View>
          {/* password */}
          <View className="gap-1.5">
            <View className="flex-row items-center">
              <Label htmlFor="password">Password</Label>
            </View>
            <Input
              ref={passwordInputRef}
              value={state.password} // Podpięcie pod ViewModel
              onChangeText={actions.setPassword} // Podpięcie pod ViewModel
              id="password"
              secureTextEntry
              returnKeyType="send"
              onSubmitEditing={onSubmit}
              className={
                state.errors.password ? 'border-red-500 bg-red-500/5' : ''
              }
            />
            {state.errors.password && (
              <Text className="text-red-500 text-xs ml-1">
                {state.errors.password}
              </Text>
            )}
          </View>
          <Button
            className="w-full"
            onPress={onSubmit}
            disabled={state.isLoading}
          >
            {state.isLoading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text>Continue</Text>
            )}
          </Button>
        </View>
        <View className="flex flex-row items-center justify-center gap-2">
          <Text className="text-center text-sm">Already have an account?</Text>
          <Link href="/login">
            <Text className="text-sm underline underline-offset-4">
              Sign in
            </Text>
          </Link>
        </View>
      </CardContent>
    </Card>
  );
}
