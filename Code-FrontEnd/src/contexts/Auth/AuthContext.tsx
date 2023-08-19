import { createContext } from 'react';
import { AuthUser } from 'services';

export type AuthContextType = {
  user: AuthUser | undefined;
  isLoading: boolean;
  signIn: (
    email: string,
    password: string,
    rememberMe: boolean
  ) => Promise<boolean>;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextType>(null!);
