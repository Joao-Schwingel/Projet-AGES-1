import { Checkbox } from '@mui/material';
import './checkbox.scss';

interface CheckboxProps {
  id: string;
  label: string;
  value?: boolean;
  onChange?: (value: boolean) => void;
  defaultValue?: boolean;
}
export const CheckBox: React.FC<CheckboxProps> = ({
  id,
  label,
  value,
  onChange,
  defaultValue = false,
}) => {
  return (
    <div className="checkbox-component" id={id}>
      <Checkbox
        checked={value}
        defaultChecked={defaultValue}
        onChange={(e) => {
          onChange?.(e.target.checked);
        }}
      />
      <p>{label}</p>
    </div>
  );
};
