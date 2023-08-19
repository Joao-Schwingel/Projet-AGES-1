import { AuthContext } from 'contexts/Auth/AuthContext';
import { useContext } from 'react';

export const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};
