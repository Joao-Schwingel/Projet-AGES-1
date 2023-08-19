import { useState } from 'react';
import './textFilter.scss';
import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface TextFilterProps {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}
export const TextFilterComponent: React.FC<TextFilterProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  const [internalValue, setInternalValue] = useState(value);

  const handleChangeValue = (v: string) => {
    onChange(v);
    setInternalValue(v);
  };

  return (
    <div className="medicine-filter-component">
      <TextField
        value={internalValue}
        type="text"
        label={placeholder}
        onChange={(e) => handleChangeValue(e.target.value)}
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <SearchIcon className="search-icon" />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};
