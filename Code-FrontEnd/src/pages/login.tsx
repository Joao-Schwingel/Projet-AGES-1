import { useContext, useRef, useState } from 'react';

import { TextFieldTeste } from '../components/Input/input';
import { ButtonSubmit } from '../components/Button/button';
import { AuthContext } from 'contexts/Auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const inputPasswordRef = useRef<HTMLInputElement>(null);

  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');

  const handleLogin = async () => {
    if (userName && password) {
      const isLogged = await auth.signin(userName, password);
      if (isLogged) {
        navigate('/admin');
      } else {
        alert('Não seu certo');
      }
    }
  };

  return (
    <form>
      <TextFieldTeste
        type="text"
        value={userName}
        placeholder="UserName"
        onChange={(newValue) => setUserName(newValue)}
        onPressEnter={() => inputPasswordRef.current?.focus()}
      />

      <TextFieldTeste
        type="password"
        value={password}
        placeholder="Senha"
        onChange={(newValue) => setPassword(newValue)}
        onPressEnter={() => inputPasswordRef.current?.focus()}
      />

      <ButtonSubmit type="button" onClick={handleLogin}>
        Logar
      </ButtonSubmit>
    </form>
  );
};

export default Login;
