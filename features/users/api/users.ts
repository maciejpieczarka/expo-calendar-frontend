import { fetchApi } from '@/core/api/client';
import { User } from '@/features/auth/AuthModel';

export const userApi = {
  // GET users with names starting with the given phrase
  getUsers: async (phrase: string): Promise<User[]> => {
    return fetchApi<User[]>(`/api/users/search/?v=${phrase}`, {
      method: 'GET'
    });
  }
};
