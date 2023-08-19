import { ReactNode } from 'react';
import './content.scss';

export interface ContentProps {
  children?: ReactNode;
}

export const Content: React.FC<ContentProps> = ({ children }) => {
  return (
    <div className="content-container">
      <div>{children}</div>
    </div>
  );
};
