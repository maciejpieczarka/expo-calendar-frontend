import {
  AuthResponse,
  LoginCredentials,
  RegisterData,
  UserAccount
} from '@/features/auth/AuthModel';
import { fetchApi } from '../../../core/api/client';

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
  },

  getAccount: async (): Promise<UserAccount> => {
    return fetchApi('/api/account', {
      method: 'GET'
    });
  }
};
