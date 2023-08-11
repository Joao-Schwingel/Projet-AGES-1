import { AuthContext } from 'contexts/Auth/AuthContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const HomeAdmin = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    auth.signout();
    navigate('/');
  };

  return (
    <div>
      <h2>Página Admin</h2>
      Olá {auth.user?.userName}, tudo bem?
      {auth.user && <button onClick={handleLogout}>Sair</button>}
    </div>
  );
};

export default HomeAdmin;
