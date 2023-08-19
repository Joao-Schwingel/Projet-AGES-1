import { Navigate } from 'react-router-dom';
import { ROUTES } from 'routes/constants';

export const InstitutionHomePage: React.FC = () => {
  return <Navigate to={ROUTES.INSTITUTION_REQUESTS_RECEIVED()} replace />;
};
