import * as React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/pt-br';
import './dataRange.scss';
import dayjs, { Dayjs } from 'dayjs';

interface DatarangeProps {
  value: Date | undefined;
  onChange: (value: Date | undefined) => void;
}

export const Datarange: React.FC<DatarangeProps> = ({ value, onChange }) => {
  return (
    <div className="data-ranger-picker-component">
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'pt-br'}>
        <DatePicker
          label="Data"
          value={value ? dayjs(value) : undefined}
          onChange={(value: Dayjs | null) => {
            onChange(value?.toDate());
          }}
          slotProps={{ textField: { size: 'small' } }}
        />
      </LocalizationProvider>
    </div>
  );
};
