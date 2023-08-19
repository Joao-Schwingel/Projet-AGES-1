import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTES } from 'routes/constants';
import { AuthContext } from './AuthContext';

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { user, isLoading } = useContext(AuthContext);
  if (!user && !isLoading)
    return (
      <Navigate to={`${ROUTES.LOGIN()}?redirectTo=${location.pathname}`} />
    );
  return children;
};
