import { apiFetch } from '../../../config/api.config';

export interface LoginResponse {
  authenticated: boolean;
  token: string;
}

export const authApi = {
  login: async (password: string): Promise<LoginResponse> => {
    return apiFetch<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ password }),
    });
  },
};