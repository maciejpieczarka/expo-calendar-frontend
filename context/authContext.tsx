import { authApi, User } from '@/api/auth';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react';

import * as SecureStore from 'expo-secure-store';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  loginUser: (email: string, password: string) => Promise<void>;
  registerUser: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  signOut: () => Promise<void>;
}

const authContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function verifySession() {
      try {
        const token = await SecureStore.getItemAsync('user_jwt');

        if (token) {
          // Token istnieje w telefonie, pobieramy aktualny profil z Postgresa przez apiClient
          const userData = await authApi.getProfile();
          setUser(userData);
        }
      } catch (error) {
        console.log('Sesja wygasła lub brak połączenia:', error);
        // W razie błędu (np. 401), nasz apiClient sam wyczyści token z SecureStore
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }
    verifySession();
  }, []);

  // Funkcja logowania dla ekranu login.tsx
  const loginUser = async (email: string, password: string) => {
    const { token, user: userData } = await authApi.login(email, password);
    await SecureStore.setItemAsync('user_jwt', token);
    setUser(userData); // Ochroniarz w app/_layout.tsx od razu przekieruje do (tabs)
  };

  // Funkcja rejestracji dla ekranu register.tsx
  const registerUser = async (
    name: string,
    email: string,
    password: string
  ) => {
    const { token, user: userData } = await authApi.register(
      name,
      email,
      password
    );
    await SecureStore.setItemAsync('user_jwt', token);
    setUser(userData);
  };

  // Funkcja wylogowania
  const signOut = async () => {
    await SecureStore.deleteItemAsync('user_jwt');
    setUser(null);
  };

  return (
    <authContext.Provider
      value={{ user, isLoading, loginUser, registerUser, signOut }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(authContext);

  if (!context) {
    throw new Error(
      'useAuth: Próbujesz użyć hooka useAuth() poza komponentem <AuthProvider>. ' +
        'Upewnij się, że plik, w którym wywołujesz useAuth zawarty w AuthProvider.'
    );
  }

  return context;
};
