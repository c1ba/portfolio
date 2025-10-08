import React from 'react';
import {FieldWrapper} from '../FieldWrapper';
import {InputFieldProps} from '../types';

type TextInputProps = InputFieldProps & {
  value: string;
  type?: 'text' | 'number' | 'email' | 'password' | 'search' | 'tel' | 'url';
};

export function TextInput({
  value,
  type = 'text',
  onChange,
  onBlur,
  id,
  errorMessage,
  required = false,
  disabled = false,
  readonly = false,
  label,
  min,
  max,
  className,
}: TextInputProps) {
  const handleTargetValue = (
    e: React.ChangeEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>,
    callback?: (value: string | number) => void,
  ) => {
    const val =
      type === 'number' ? parseInt(e.target.value, 10) : e.target.value;
    if (type === 'number' && typeof val === 'number' && isNaN(val)) {
      return;
    }
    callback?.(val);
  };

  return (
    <FieldWrapper
      label={label}
      id={id}
      required={required}
      disabled={disabled}
      readonly={readonly}
      errorMessage={errorMessage}
      className={className}
    >
      <input
        type={type}
        value={value}
        onChange={(e) => {
          handleTargetValue(e, onChange);
        }}
        onBlur={(e) => {
          handleTargetValue(e, onBlur);
        }}
        {...(type === 'number' ? {min, max} : {minLength: min, maxLength: max})}
      />
    </FieldWrapper>
  );
}
