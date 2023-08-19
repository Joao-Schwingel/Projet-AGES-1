import { useRef, useState } from 'react';
import { ButtonComponent } from '../../components/Button/button';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { TextField } from 'components/TextFields/textfield';
import { CheckBox } from 'components/CheckBox/checkbox';
import { ROUTES } from 'routes/constants';
import { useAuth } from 'hooks/auth';
import './login.scss';

export const LoginPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [loginError, setLoginError] = useState({ user: false, pass: false });
  const [rememberMe, setRememberMe] = useState<boolean>(true);

  const counter = useRef(0);
  const imageLoaded = () => {
    counter.current += 1;
    if (counter.current >= 2) {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setLoginError({ user: false, pass: false });
    if (!username) {
      setLoginError({ ...loginError, user: true });
      return;
    }
    if (!password) {
      setLoginError({ ...loginError, pass: true });
      return;
    }
    try {
      await auth.signIn(username, password, rememberMe);
      const redirectToUrl = searchParams.get('redirectTo');
      if (redirectToUrl) {
        navigate(redirectToUrl);
      } else {
        navigate(ROUTES.HOME());
      }
    } catch (err) {
      setLoginError({ user: true, pass: true });
    }
  };

  return (
    <div className="login-page">
      {loading && (
        <div className="login-page-loading-container">
          <img src="/assets/loading-animation.svg" alt="loading" />
          <p>Carregando... aguarde</p>
        </div>
      )}
      <img
        onLoad={imageLoaded}
        className="login-page-logo"
        src="/assets/connect-pharmacy-logo-1.svg"
        alt="connect-pharmacy-logo"
      />
      <div className="login-page-container">
        <div className="login-page-left-img-wrapper">
          <img
            onLoad={imageLoaded}
            src="/assets/imgs/login-background.png"
            alt="login-background"
          />
        </div>
        <div className="login-page-right-container">
          <span className="login-page-circle login-page-circle-1"></span>
          <span className="login-page-circle login-page-circle-2"></span>
          <h1>Entrar</h1>
          <form>
            <TextField
              value={username}
              placeholder="Insira seu usuário"
              onChange={(newValue) => setUsername(newValue)}
              id="login-username-field"
              label="Usuário"
              errormessage={loginError.user ? ' ' : ''}
            />

            <TextField
              value={password}
              placeholder="Insira sua senha"
              hidepassword
              onChange={(newValue) => setPassword(newValue)}
              id="login-password-field"
              label="Senha"
              errormessage={loginError.pass ? ' ' : ''}
            />

            <CheckBox
              onChange={(newRememberMe) => {
                setRememberMe(newRememberMe);
              }}
              value={rememberMe}
              id="checkbox"
              label="Lembrar de mim"
            />

            {(loginError.pass || loginError.user) && (
              <p className="login-page-error-msg">Usuário ou senha inválidos</p>
            )}

            <ButtonComponent
              type="primary"
              onClick={handleLogin}
              size={2}
              id="login-button-submit"
            >
              Entrar
            </ButtonComponent>
          </form>
        </div>
      </div>
    </div>
  );
};
