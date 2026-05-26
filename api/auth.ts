import { fetchApi } from './client';

export interface LoginCredentials {
  email: string;
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

export const authApi = {
  // Call na endpoint do autoryzacji, przekazujemy dane - dostajemy token
  authenticate: async (
    credentials: LoginCredentials
  ): Promise<AuthResponse> => {
    return fetchApi<AuthResponse>('/api/auth/authenticate', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  },

  register: async (data: RegisterData): Promise<void> => {
    return fetchApi('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
};
