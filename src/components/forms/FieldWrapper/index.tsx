import React from 'react';
import styles from './FieldWrapper.module.scss';

type TextInputProps = {
  className?: string;
  id: string;
  errorMessage?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  label: string;
  isSelect?: boolean;
  placeholder?: string;
  children: React.ReactElement<{
    id: string;
    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    className?: string;
    ['aria-required']: boolean;
    ['aria-invalid']: boolean;
    ['aria-describedby']?: string;
    placeholder?: string;
  }>;
};

export const FieldWrapper = ({
  className = '',
  id,
  errorMessage,
  required = false,
  disabled = false,
  readonly = false,
  label,
  isSelect,
  placeholder,
  children,
}: TextInputProps) => {
  const classNames = [
    styles.fieldWrapperContainer,
    disabled && styles.disabled,
    readonly && styles.readonly,
    errorMessage && styles.error,
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <label htmlFor={id} className={classNames}>
      <span className={styles.fieldWrapperLabel}>
        {label} {!required && '(optional)'}
      </span>
      {React.cloneElement(children, {
        id,
        required,
        disabled,
        readOnly: readonly,
        className: [!isSelect && styles.fieldWrapperField, className]
          .filter(Boolean)
          .join(' '),
        ['aria-required']: required,
        ['aria-invalid']: !!errorMessage,
        ['aria-describedby']: errorMessage ? `${id}-error` : undefined,
        placeholder,
      })}
      {errorMessage && (
        <span
          id={`${id}-error`}
          className={styles.fieldWrapperError}
          role="alert"
        >
          {errorMessage}
        </span>
      )}
    </label>
  );
};
