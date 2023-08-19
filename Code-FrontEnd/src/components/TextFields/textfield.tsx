import React, { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import InputMask from 'react-input-mask';

import './textfield.scss';

interface ITextField {
  id: string;
  label: string;
  placeholder: string;
  required?: boolean;
  errormessage?: string;
  hidepassword?: boolean;
  value?: string;
  number?: boolean;
  onChange?: (v: string) => void;
  mask?: string | (string | RegExp)[];
  endAdornment?: ReactNode;
  validate?: (v?: string) => boolean;
}

export const TextField: React.FC<ITextField> = ({
  label,
  placeholder,
  required,
  errormessage,
  hidepassword,
  value = '',
  onChange,
  mask,
  id,
  endAdornment,
  validate,
}) => {
  const [internalValue, setInternalValue] = useState<string>(value);
  const [errorMessage, setErrorMessage] = useState(errormessage);
  const [isVisible, setIsVisible] = useState(!hidepassword);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (validate && !validate(val)) return;
    setInternalValue(val);
    const filteredValue = val.replaceAll('_', '');
    if (mask) {
      if (filteredValue.length > mask.length) {
        onChange?.('');
        setErrorMessage('Formato inválido');
      } else {
        onChange?.(filteredValue);
        setErrorMessage('');
      }
    } else {
      onChange?.(filteredValue);
      setErrorMessage('');
    }
  };

  useEffect(() => {
    setErrorMessage(errormessage);
  }, [errormessage]);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  return (
    <div className="textfield-component" id={id}>
      <label htmlFor={`${id}-input`}>
        {label} {required && <span>*</span>}
      </label>
      <div className="textfield-component-input-container">
        <InputMask
          mask={mask ? mask : ''}
          value={internalValue}
          id={`${id}-input`}
          type={isVisible ? 'text' : 'password'}
          required={required}
          placeholder={placeholder}
          onChange={handleChange}
          style={{
            borderColor:
              errorMessage !== undefined && errorMessage !== ''
                ? 'red'
                : 'transparent',
          }}
        ></InputMask>
        {hidepassword !== undefined && hidepassword && (
          <img
            src={isVisible ? '/assets/eye.svg' : '/assets/closedeye.svg'}
            alt="Eyeicon"
            onClick={() => setIsVisible(!isVisible)}
          />
        )}
        {endAdornment && <div className="end-adornment">{endAdornment}</div>}
      </div>
      {(internalValue?.length ||
        (errorMessage !== undefined && errorMessage !== ' ')) && (
        <p>{errorMessage}</p>
      )}
    </div>
  );
};
