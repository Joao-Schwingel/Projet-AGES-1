import React from 'react';
import { TextField } from '@mui/material';

interface TextFieldProps {
  type?: string;
  value: string;
  placeholder: string;
  onPressEnter?: () => void;
  onChange: (vaue: string) => void;
}

export const TextFieldTeste: React.FC<TextFieldProps> = (props) => {
  return (
    <TextField
      type={props.type}
      value={props.value}
      placeholder={props.placeholder}
      onChange={(e) => props.onChange(e.target.value)}
      onKeyDown={(e) =>
        e.key === 'Enter'
          ? props.onPressEnter && props.onPressEnter()
          : undefined
      }
    />
  );
};
