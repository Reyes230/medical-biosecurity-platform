export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

export const ADMIN_TOKEN_KEY = 'mb_admin_token';

export const apiFetch = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  const token = localStorage.getItem(ADMIN_TOKEN_KEY);

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(token ? { 'X-Admin-Key': token } : {}),
    ...(options?.headers as Record<string, string>),
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.error || `API Error: ${response.status} ${response.statusText}`);
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
};