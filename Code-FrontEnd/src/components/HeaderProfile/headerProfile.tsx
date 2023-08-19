import React, { useContext, useEffect, useState } from 'react';

import './headerProfile.scss';
import getNameAbbreviation from 'utils/getNameAbbreviation';
import { AuthContext } from 'contexts/Auth/AuthContext';
import { useNavigate } from 'react-router';
import { ROUTES } from 'routes/constants';
import { userService } from 'services/userService';
import { CurrentUserDto } from 'models/currentUserDto';
import Tooltip from '@mui/material/Tooltip';

interface Props {
  name: string;
  type: 'institution' | 'admin';
  pictureUrl?: string;
}

const HeaderProfileComponent: React.FC<Props> = () => {
  const [currentUser, setCurrentUser] = useState<CurrentUserDto>();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignout = () => {
    auth.signOut();
    navigate(ROUTES.LOGIN());
  };

  useEffect(() => {
    (async () => {
      setCurrentUser(await userService.getCurrentUser());
    })();
  }, []);

  return (
    <div className="header-profile">
      <div className="header-profile-info-container">
        <div
          className="header-profile-info"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <div className="header-profile-text">
            <Tooltip title={currentUser?.name}>
              <h4>{currentUser?.name}</h4>
            </Tooltip>
            <p>
              {currentUser?.role === 'institution'
                ? 'Instituição de Saúde'
                : 'Administrador'}
            </p>
          </div>
          {currentUser?.photoURL ? (
            <img
              className="header-profile-picture"
              src={currentUser.photoURL}
              alt={currentUser.name}
            />
          ) : (
            <p className="header-profile-picture">
              {getNameAbbreviation(currentUser?.name || ' ')}
            </p>
          )}
        </div>
        {dropdownOpen && (
          <div className="header-profile-dropdown">
            <button
              className="header-profile-logout-button"
              onClick={handleSignout}
            >
              <img src="/assets/exit-icon.svg" alt="icon" />
              <p>Sair</p>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderProfileComponent;
