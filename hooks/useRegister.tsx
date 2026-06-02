import { useAuthStore } from '@/lib/authStore';
import { RegisterErrors } from '@/types/Iauth';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export const useRegister = () => {
  const router = useRouter();

  // Pobieramy potrzebne elementy z Modelu
  const { register, isLoading } = useAuthStore();

  // Lokalny stan formularza
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<RegisterErrors>({});

  const validateForm = (): boolean => {
    const currentErrors: RegisterErrors = {};
    let isValid = true;

    if (!username.trim()) {
      currentErrors.username = 'Nazwa użytkownika jest wymagana.';
      isValid = false;
    } else if (username.length < 3) {
      currentErrors.username = 'Minimum 3 znaki.';
      isValid = false;
    }

    if (!email.trim()) {
      currentErrors.email = 'Adres e-mail jest wymagany.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      currentErrors.email = 'Wprowadź poprawny adres e-mail.';
      isValid = false;
    }

    if (!password) {
      currentErrors.password = 'Hasło jest wymagane.';
      isValid = false;
    } else if (password.length < 6) {
      currentErrors.password = 'Hasło musi mieć min. 6 znaków.';
      isValid = false;
    }

    setErrors(currentErrors);
    return isValid;
  };

  const handleRegister = async () => {
    setErrors({});

    if (!validateForm()) return;

    try {
      await register(email, username, password);

      router.replace('/(auth)/login');
    } catch (error: any) {
      const apiMessage = error.message || '';

      if (apiMessage.toLowerCase().includes('email')) {
        setErrors({ email: 'Ten e-mail jest już zajęty.' });
      } else if (apiMessage.toLowerCase().includes('username')) {
        setErrors({ username: 'Ta nazwa użytkownika jest już zajęta.' });
      } else {
        setErrors({
          general: apiMessage || 'Coś poszło nie tak, spróbuj ponownie.'
        });
      }
    }
  };
  return {
    state: {
      username,
      email,
      password,
      errors,
      isLoading
    },
    actions: {
      setUsername,
      setEmail,
      setPassword,
      handleRegister,
      navigateToLogin: () => router.push('/(auth)/login')
    }
  };
};
