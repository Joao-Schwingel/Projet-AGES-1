import { useAuth } from 'hooks/auth';
import { Navigate } from 'react-router-dom';
import { ROUTES } from 'routes/constants';

export const HomePage = () => {
  const auth = useAuth();
  if (!auth.isLoading) {
    if (!auth.user) return <Navigate to={ROUTES.LOGIN()} />;
    if (auth.user?.role === 'admin') return <Navigate to={ROUTES.ADMIN()} />;
    if (auth.user?.role === 'institution')
      return <Navigate to={ROUTES.INSTITUTION()} />;
  }
  return null;
};
