import { authApi } from '@/api/auth';
import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type User = {
  email: string;
  username: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  hasCompletedOnboarding: boolean;
  error: string | null;
  _hasHydrated: boolean;

  authenticate: (username: string, password: string) => Promise<void>;
  register: (
    email: string,
    username: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  completeOnboarding: () => void;

  clearError: () => void;
  // Metoda developerska do resetowania landingScreenu
  resetOnboarding: () => void;
  setHasHydrated: (value: boolean) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoggedIn: false,
      isLoading: false,
      hasCompletedOnboarding: false,
      error: null,
      _hasHydrated: false,

      authenticate: async (username: string, password: string) => {
        set(state => {
          return { ...state, isLoading: true, error: null };
        });

        try {
          const response = await authApi.authenticate({ username, password });

          set(state => {
            return {
              ...state,
              token: response.token
            };
          });
          const accountData = await authApi.getAccount();
          set(state => {
            return {
              ...state,
              isLoading: false,
              isLoggedIn: true,
              user: {
                email: accountData.email,
                username: accountData.username
              }
            };
          });
        } catch (error: any) {
          set(state => {
            return {
              ...state,

              isLoading: false,
              error: error.message || 'Błąd logowania',
              isLoggedIn: false,
              token: null,
              user: null
            };
          });
          throw error;
        }
      },

      // Rejestracja
      register: async (email: string, username: string, password: string) => {
        set(state => {
          return { ...state, isLoading: true, error: null };
        });

        try {
          await authApi.register({ email, username, password });
          set(state => {
            return { ...state, isLoading: false };
          });
        } catch (error: any) {
          set(state => {
            return {
              ...state,
              isLoading: false,
              error: error.message || 'Błąd rejestracji'
            };
          });
          throw error;
        }
      },

      //   wylogowanie
      logout: () => {
        set(state => {
          return {
            ...state,
            user: null,
            token: null,
            isLoggedIn: false,
            error: null
          };
        });
      },

      // Czy token istnieje przy starcie apki
      checkAuth: async () => {
        set(state => {
          return { ...state, isLoading: true };
        });
        const { token } = get();

        if (token) {
          set(state => {
            return { ...state, isLoggedIn: true, isLoading: false };
          });
        } else {
          set(state => {
            return { ...state, isLoggedIn: false, isLoading: false };
          });
        }
      },

      completeOnboarding: () => {
        set(state => {
          return {
            ...state,
            hasCompletedOnboarding: true
          };
        });
      },

      resetOnboarding: () => {
        set(state => {
          return {
            ...state,
            hasCompletedOnboarding: false
          };
        });
      },

      clearError: () => {
        set(state => {
          return {
            ...state,
            error: null
          };
        });
      },

      setHasHydrated: (value: boolean) => {
        set(state => ({
          ...state,
          _hasHydrated: value
        }));
      }
    }),
    {
      name: 'auth-storage', // Klucz w SecureStore
      storage: createJSONStorage(() => ({
        getItem: SecureStore.getItemAsync,
        setItem: SecureStore.setItemAsync,
        removeItem: SecureStore.deleteItemAsync
      })),
      partialize: state => ({
        // Tylko te pola są zapisywane do SecureStore
        token: state.token,
        user: state.user,
        isLoggedIn: state.isLoggedIn,
        hasCompletedOnboarding: state.hasCompletedOnboarding
      }),
      onRehydrateStorage: () => {
        return (state, error) => {
          if (error) {
            console.error('Błąd hydracji store:', error);
          } else {
            state?.setHasHydrated(true);
          }
        };
      }
    }
  )
);
