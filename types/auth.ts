// types/auth.ts
export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  email: string;
  username: string;
  token: string;
}

export interface User {
  email: string;
  username: string;
}

export interface AuthContextType {
  isLoading: boolean;
  user: User | null;
  isLoggedIn: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}
