import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import './dropdownFilter.scss';
import { InputLabel } from '@mui/material';

interface Item {
  label: string;
  value: string | number;
}

interface DropdownProps {
  value?: string;
  onChange: (value: string) => void;
  items: Item[];
  label?: string;
  clearable?: boolean;
  width?: number;
}

export const DropdownFilter: React.FC<DropdownProps> = ({
  value,
  onChange,
  items,
  label,
  clearable = true,
  width = 120,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    onChange(value);
  };

  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="select-status-component-container">
      <FormControl sx={{ m: 1, minWidth: width }} size="small">
        <InputLabel id="select-label">{label}</InputLabel>
        <Select
          id="select-component"
          labelId="select-label"
          label={label}
          onChange={handleChange}
          value={value}
          sx={{
            '& .MuiSelect-iconOutlined': {
              display: value && clearable ? 'none' : '',
            },
          }}
          endAdornment={
            value &&
            clearable && (
              <HighlightOffIcon
                className="select-filter-remove-value"
                onClick={handleClear}
              />
            )
          }
        >
          {items.map((x, i) => (
            <MenuItem key={i} value={x.value}>
              {x.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
