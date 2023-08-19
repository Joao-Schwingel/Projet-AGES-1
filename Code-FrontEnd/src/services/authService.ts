import jwtDecode from 'jwt-decode';
import { httpService } from './httpService';

export interface AuthUser {
  username: string;
  userId: number;
  role: string;
}

export interface SignInResultDto {
  access_token: string;
}

export const authService = {
  setRememberMe(rememberMe: boolean) {
    localStorage.setItem('rememberMe', String(rememberMe));
  },

  getRememberMe() {
    return localStorage.getItem('rememberMe') === 'true';
  },

  removeToken: () => {
    localStorage.removeItem('authToken');
  },

  setToken: (token: string) => {
    localStorage.setItem('authToken', token);
  },

  getToken: () => {
    return localStorage.getItem('authToken') ?? undefined;
  },

  decodeToken: (token: string): AuthUser | undefined => {
    try {
      return jwtDecode(token);
    } catch (exc) {
      console.error('Token decoding failed:', exc);
    }
  },

  signIn: async (username: string, password: string) => {
    const response = await httpService.post<SignInResultDto>('auth/login', {
      username,
      password,
    });
    return response.data;
  },

  logout: async () => {
    return { status: true };
  },
};
