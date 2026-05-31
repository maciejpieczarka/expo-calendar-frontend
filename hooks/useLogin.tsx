import { useAuthStore } from '@/lib/authStore';
import { useRouter } from 'expo-router';
import { useState } from 'react';

type LoginErrors = {
  username?: string;
  password?: string;
  general?: string;
};

export const useLogin = () => {
  const router = useRouter();

  const { authenticate, isLoading } = useAuthStore();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<LoginErrors>({});

  // Prosta walidacja przed strzałem do API
  const validateForm = (): boolean => {
    const currentErrors: LoginErrors = {};
    let isValid = true;

    if (!username.trim()) {
      currentErrors.username = 'Wprowadź nazwę uzytkownika.';
      isValid = false;
    }

    if (!password) {
      currentErrors.password = 'Wprowadź hasło.';
      isValid = false;
    }

    setErrors(currentErrors);
    return isValid;
  };

  const handleLogin = async () => {
    setErrors({});
    if (!validateForm()) return;

    try {
      // Strzał do API / Zustand
      await authenticate(username, password);
    } catch (error: any) {
      const apiMessage = error.message || '';

      // Mapowanie błędów logowania z backendu
      if (
        apiMessage.toLowerCase().includes('not found') ||
        apiMessage.toLowerCase().includes('user')
      ) {
        setErrors({ username: 'Użytkownik o podanej nazwie nie istnieje.' });
      } else if (
        apiMessage.toLowerCase().includes('password') ||
        apiMessage.toLowerCase().includes('invalid')
      ) {
        setErrors({ password: 'Niepoprawne hasło.' });
      } else {
        setErrors({ general: apiMessage || 'Logowanie nie powiodło się.' });
      }
    }
  };

  return {
    state: {
      username,
      password,
      errors,
      isLoading
    },
    actions: {
      setUsername,
      setPassword,
      handleLogin
    }
  };
};
