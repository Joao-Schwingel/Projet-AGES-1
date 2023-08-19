import { Navigate } from 'react-router-dom';
import { ROUTES } from 'routes/constants';

export const AdminHomePage: React.FC = () => {
  return <Navigate to={ROUTES.ADMIN_REQUESTS()} replace />;
};
