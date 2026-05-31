import { useAuthStore } from '@/lib/authStore';
import { useRouter } from 'expo-router';
import { useState } from 'react';

type LoginErrors = {
  email?: string;
  password?: string;
  general?: string;
};

export const useLogin = () => {
  const router = useRouter();

  const { authenticate, isLoading } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<LoginErrors>({});

  // Prosta walidacja przed strzałem do API
  const validateForm = (): boolean => {
    const currentErrors: LoginErrors = {};
    let isValid = true;

    if (!email.trim()) {
      currentErrors.email = 'Wprowadź adres e-mail.';
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
      await authenticate(email, password);
    } catch (error: any) {
      const apiMessage = error.message || '';

      // Mapowanie błędów logowania z backendu
      if (
        apiMessage.toLowerCase().includes('not found') ||
        apiMessage.toLowerCase().includes('user')
      ) {
        setErrors({ email: 'Użytkownik o podanym adresie nie istnieje.' });
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
      email,
      password,
      errors,
      isLoading
    },
    actions: {
      setEmail,
      setPassword,
      handleLogin
    }
  };
};
