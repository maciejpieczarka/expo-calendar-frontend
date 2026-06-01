import * as SecureStore from 'expo-secure-store';
const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json'
  };

  try {
    const zustandStorage = await SecureStore.getItemAsync('auth-storage');
    if (zustandStorage) {
      const parsedStorage = JSON.parse(zustandStorage);
      const token = parsedStorage?.state?.token;

      if (token) {
        defaultHeaders['Authorization'] = `Bearer ${token}`;
      }
    }
  } catch (e) {
    console.error('Błąd odczytu tokenu ze struktury Zustand:', e);
  }
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers
    }
  });

  if (response.status === 401) {
    throw new Error('Podano nieprawidłowe dane');
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}
