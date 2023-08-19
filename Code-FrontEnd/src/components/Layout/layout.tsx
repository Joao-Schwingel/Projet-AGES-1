import { Header } from 'components/Header/header';
import { ReactNode } from 'react';
import './layout.scss';

export interface LayoutProps {
  children?: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout-container">
      <Header />
      <div className="layout-container-content">{children}</div>
    </div>
  );
};
