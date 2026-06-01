import { useAuthStore } from '@/lib/authStore';
import { RefreshCcw } from 'lucide-react-native';
import React from 'react';
import { Button } from './ui/button';
import { Icon } from './ui/icon';

const ResetOnboardingButton = () => {
  const { resetOnboarding } = useAuthStore();
  return (
    <Button
      className="absolute right-5 bg-red-100 bottom-16 z-20"
      variant="outline"
      size="icon"
      onPress={resetOnboarding}
    >
      <Icon as={RefreshCcw} />
    </Button>
  );
};

export default ResetOnboardingButton;
