import React from 'react';
import {FieldWrapper} from '../FieldWrapper';
import {InputFieldProps} from '../types';

type TextInputProps = InputFieldProps & {
  value: string;
};

export function TextArea({
  value,
  onChange,
  onBlur,
  className = '',
  id,
  errorMessage,
  required = false,
  disabled = false,
  readonly = false,
  label,
  min,
  max,
}: TextInputProps) {
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
      <textarea
        value={value}
        onChange={(e) => {
          const val = e.target.value;
          onChange?.(val);
        }}
        onBlur={(e) => {
          const val = e.target.value;
          onBlur?.(val);
        }}
        minLength={min}
        maxLength={max}
      />
    </FieldWrapper>
  );
}
