// Definicja interfejsow dla autoryzacji

//Auth Api
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  email: string;
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export interface UserAccount {
  id: number;
  email: string;
  username: string;
}

//Auth hooks (ViewModels)
export type LoginErrors = {
  username?: string;
  password?: string;
  general?: string;
};

export interface RegisterErrors extends LoginErrors {
  email?: string;
}

// Auth State (Zustand useAuthStore)
export type User = {
  id: number;
  email: string;
  username: string;
};

export interface AuthState {
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
}
