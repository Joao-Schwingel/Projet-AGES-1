import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    navigate('/login');
  };

  return (
    <div>
      <h2>Página Home</h2>
      <button onClick={handleLogout}>Login</button>
    </div>
  );
};

export default Home;
