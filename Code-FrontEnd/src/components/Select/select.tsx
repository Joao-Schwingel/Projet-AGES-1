import { Autocomplete, TextField } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import './select.scss';
import { useState } from 'react';

interface SelectProps {
  options: string[];
  label?: string;
  placeholder?: string;
  required?: boolean;
  id: string;
  onChange: (v: string) => void;
  errorMessage?: string;
  value?: string;
  fixedWidth?: number;
  className?: string;
  showArrow?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  options,
  label,
  placeholder,
  id,
  onChange,
  errorMessage,
  value,
  required,
  fixedWidth,
  className,
  showArrow = false,
}) => {
  const [open, setOpen] = useState(false);

  const handleChange = (
    _: React.SyntheticEvent<Element, Event>,
    value: string | null
  ) => {
    onChange(value || '');
  };

  const handleArrowClick = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const labelObject = required ? (
    <>
      {label}
      <span className="select-component-required"> *</span>
    </>
  ) : (
    <>{label}</>
  );

  return (
    <div
      className={`select-component ${className || ''}`}
      style={{
        maxWidth: fixedWidth,
        width: fixedWidth,
      }}
    >
      {label && <p className="label">{labelObject}</p>}
      <Autocomplete
        id={id}
        className="select-component-autocomplete"
        disablePortal
        options={options}
        value={value}
        onChange={handleChange}
        onClose={handleClose}
        onOpen={handleOpen}
        disableClearable
        onInputChange={handleChange}
        open={open}
        classes={{
          inputRoot: className,
        }}
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
            size="small"
            InputProps={{
              ...params.InputProps,
              endAdornment: showArrow && (
                <ArrowDropDownIcon
                  className={`dropdown-icon ${open ? 'open' : ''}`}
                  onClick={handleArrowClick}
                />
              ),
            }}
          />
        )}
        style={{
          border:
            errorMessage !== undefined && errorMessage !== ''
              ? '1px solid red'
              : '',
        }}
      />
      {(value?.length ||
        (errorMessage !== undefined && errorMessage !== ' ')) && (
        <p className="error-label">{errorMessage}</p>
      )}
    </div>
  );
};
