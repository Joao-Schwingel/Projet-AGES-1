import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { authService, AuthUser } from 'services';
import { userService } from 'services';

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState<AuthUser | undefined>();

  useEffect(() => {
    const validateToken = async () => {
      const rememberMe = authService.getRememberMe();
      if (rememberMe) {
        const token = authService.getToken();
        if (token) {
          const data = await authService.decodeToken(token);
          if (data) {
            setUser(data);
          }
        }
      }
      setLoading(false);
    };
    validateToken();
  }, []);

  const signIn = async (
    email: string,
    password: string,
    rememberMe: boolean
  ) => {
    authService.setRememberMe(rememberMe);
    const data = await authService.signIn(email, password);
    if (data.access_token) {
      const authUser = authService.decodeToken(data.access_token);
      if (authUser) {
        authService.setToken(data.access_token);
        userService.clearCache();
        const userData = {
          username: authUser.username,
          userId: authUser.userId,
          role: authUser.role,
        };
        setUser(userData);
        return true;
      }
    }
    return false;
  };

  const signOut = async () => {
    setUser(undefined);
    authService.removeToken();
    userService.clearCache();
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
