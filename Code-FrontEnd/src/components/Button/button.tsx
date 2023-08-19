import { Button } from '@mui/material';
import '../Button/button.scss';

interface ButtonProps {
  type: 'primary' | 'secondary';
  onClick: () => void;
  children: React.ReactNode;
  size: 3 | 2 | 1;
  icon?: React.ReactNode;
  borderRadius?: number;
  id: string;
  fullWidth?: boolean;
}
export const ButtonComponent: React.FC<ButtonProps> = ({
  type,
  onClick,
  children,
  size,
  icon,
  borderRadius = 5,
  id,
  fullWidth,
}) => {
  return (
    <Button
      id={id}
      className={`button-container button-container-${type} button-container-size-${size}`}
      style={{ borderRadius: borderRadius + 'px' }}
      color="primary"
      variant="contained"
      onClick={onClick}
      fullWidth={fullWidth}
    >
      <div>
        {icon !== undefined && icon}
        {children}
      </div>
    </Button>
  );
};
