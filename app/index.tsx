import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useAuthStore } from '@/lib/authStore';
import { useRouter } from 'expo-router';
import React from 'react';
import { ImageBackground, View } from 'react-native';

const LandingScreen = () => {
  const { completeOnboarding } = useAuthStore();
  const router = useRouter();
  return (
    <ImageBackground
      className="absolute inset-0"
      source={require('@/assets/images/landingBackground.jpg')}
      resizeMode="cover"
    >
      <View className=" flex-1 px-safe-offset-5 py-safe-offset-10 bg-slate-900/85 absolute inset-0 items-stretch justify-around">
        <View className="flex items-stretch ">
          <Text variant="h1" className=" text-slate-50 text-5xl text-center">
            The best way to organize your daily life.
          </Text>
          <Text className="pt-1 text-center text-slate-50" variant="p">
            Every event you need in one app.
          </Text>
        </View>

        <View className="flex items-stretch">
          <Button
            size="lg"
            variant="secondary"
            className="mb-4"
            onPress={() => {
              completeOnboarding();
              router.replace('/register');
            }}
          >
            <Text className="font-bold">Get Started</Text>
          </Button>

          <Button
            variant="link"
            onPress={() => {
              completeOnboarding();
            }}
          >
            <Text className="text-center  text-slate-50">
              Already have an Account?
            </Text>
          </Button>
        </View>
      </View>
    </ImageBackground>
  );
};

export default LandingScreen;
