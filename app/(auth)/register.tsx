import AppFormHeader from '@/features/auth/components/AppFormHeader';
import ResetOnboardingButton from '@/features/auth/components/ResetOnboardingButton';
import { SignUpForm } from '@/features/auth/components/sign-up-form';
import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
const RegisterScreen = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 items-stretch justify-start pt-safe-offset-36 gap-10"
    >
      <ResetOnboardingButton />
      <AppFormHeader />
      <SignUpForm />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
