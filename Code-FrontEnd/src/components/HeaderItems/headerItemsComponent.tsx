import React, { useContext } from 'react';

import './headerItemsComponent.scss';
import { AuthContext } from 'contexts/Auth/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from 'routes/constants';

interface IHeaderItem {
  name: string;
  url: string;
  id: string;
}

const institutionItems: IHeaderItem[] = [
  {
    name: 'Recebidas',
    url: ROUTES.INSTITUTION_REQUESTS_RECEIVED(),
    id: 'header-item-instit-receb',
  },
  {
    name: 'Enviadas',
    url: ROUTES.INSTITUTION_REQUESTS_SENT(),
    id: 'header-item-instit-envia',
  },
];

const adminItems: IHeaderItem[] = [
  { name: 'Home', url: ROUTES.ADMIN_REQUESTS(), id: 'header-item-adm-home' },
  {
    name: 'Instituições',
    url: ROUTES.ADMIN_INSTITUTIONS(),
    id: 'header-item-adm-instit',
  },
  {
    name: 'Medicamentos',
    url: ROUTES.ADMIN_MEDICAMENTS(),
    id: 'header-item-adm-medic',
  },
  {
    name: 'Transporte',
    url: ROUTES.ADMIN_TRANSPORTS(),
    id: 'header-item-adm-transp',
  },
];

export const HeaderItemsComponent: React.FC<{ id: string }> = ({ id }) => {
  const auth = useContext(AuthContext);
  const { pathname } = useLocation();

  const displayedItems =
    auth.user?.role === 'admin' ? adminItems : institutionItems;

  return (
    <ul id={id} className="header-items-component-container">
      {displayedItems?.map((x, i) => (
        <li
          key={i}
          id={x.id}
          className={`${pathname === x.url ? 'header-item-selected' : ''}`}
        >
          <Link to={x.url}>{x.name}</Link>
        </li>
      ))}
    </ul>
  );
};
