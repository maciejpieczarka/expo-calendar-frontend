import AppFormHeader from '@/components/AppFormHeader';
import ResetOnboardingButton from '@/components/ResetOnboardingButton';
import { SignInForm } from '@/components/sign-in-form';
import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

const LoginScreen = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 items-stretch justify-start pt-safe-offset-36 gap-10"
    >
      <ResetOnboardingButton />
      <AppFormHeader />
      <SignInForm />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
