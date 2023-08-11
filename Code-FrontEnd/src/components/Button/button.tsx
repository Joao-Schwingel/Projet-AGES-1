import { Button } from '@mui/material';
import '../Button/button.scss';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick: () => void;
  children: React.ReactNode;
}
export const ButtonSubmit: React.FC<ButtonProps> = ({
  type,
  onClick,
  children,
}) => {
  return (
    <Button variant="contained" type={type} onClick={onClick}>
      {children}
    </Button>
  );
};
