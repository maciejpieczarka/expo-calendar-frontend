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

  const responseText = await response.text();

  if (!response.ok) {
    let errorMessage = `HTTP error! status: ${response.status}`;
    try {
      if (responseText) {
        const errorJson = JSON.parse(responseText);
        if (errorJson.message) {
          errorMessage = errorJson.message;
        }
      }
    } catch (_) {}
    throw new Error(errorMessage);
  }

  if (response.status === 204 || !responseText.trim()) {
    return {} as T;
  }

  return JSON.parse(responseText);
}

