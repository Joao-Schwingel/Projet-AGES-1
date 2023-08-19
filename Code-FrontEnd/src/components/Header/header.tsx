import { useState } from 'react';

import { HeaderItemsComponent } from 'components/HeaderItems/headerItemsComponent';
import ProfileComponent from 'components/HeaderProfile/headerProfile';

import './header.scss';
import { useNavigate } from 'react-router';
import { useContext, useEffect } from 'react';
import { AuthContext } from 'contexts/Auth/AuthContext';
import { useWindowSize } from 'hooks/windowSize';
import { ROUTES } from 'routes/constants';
import { userService } from 'services/userService';

export const Header: React.FC<any> = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [width, height] = useWindowSize();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (isSidebarOpen) setIsSidebarOpen(false);
  }, [width, height]);

  const isAdmin = auth?.user?.role === 'admin';
  const isDesktop = width >= 1024;

  const handleLogoClick = () => {
    if (isAdmin) {
      navigate(ROUTES.ADMIN());
    } else {
      navigate(ROUTES.HOME());
    }
  };

  return (
    <header
      className={`header-component ${isSidebarOpen ? 'header-side-open' : ''}`}
    >
      {(isDesktop || isSidebarOpen) && (
        <div className="header-component-content">
          <div className="header-component-logo">
            <div
              onClick={handleLogoClick}
              className="header-component-logo-content"
            >
              <img src="/assets/plus-logo.svg" alt="logo" />
              <div>
                <h3>Connect</h3>
                <h3>Pharmacy</h3>
              </div>
            </div>
          </div>
          <HeaderItemsComponent id="header-itens" />
          <ProfileComponent
            name="Connect Pharmacy"
            type={isAdmin ? 'admin' : 'institution'}
          />
        </div>
      )}
      <div
        className={`header-hamb-container ${
          isSidebarOpen ? 'header-hamb-open' : ''
        }`}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <span className="header-hamb-line header-hamb-line1"></span>
        <span className="header-hamb-line header-hamb-line2"></span>
        <span className="header-hamb-line header-hamb-line3"></span>
      </div>
    </header>
  );
};
