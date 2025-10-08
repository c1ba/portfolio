'use client';
import {useEffect, useMemo, useRef, useState} from 'react';
import {FieldWrapper} from '../FieldWrapper';
import styles from './SelectInput.module.scss';

type SelectInputProps = {
  value?: {
    id?: string;
    label?: string;
  };
  placeholder?: string;
  onChange?: (value: {id: string; label: string}) => void;
  className?: string;
  id: string;
  errorMessage?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  enableSearch?: boolean;
  searchPlaceholder?: string;
  label: string;
  options: {
    id: string;
    label: string;
  }[];
};

const SelectInput = ({
  label,
  options,
  value,
  placeholder = 'Select option',
  onChange,
  id,
  errorMessage,
  required = false,
  disabled = false,
  readonly = false,
  enableSearch,
  searchPlaceholder = 'Search...',
  className,
}: SelectInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const filteredOptions = useMemo(() => {
    if (!searchValue) {
      return options;
    }

    return options.filter(({label}) =>
      label.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }, [options, searchValue]);
  const ref = useRef<HTMLDivElement | null>(null);

  const toggleList = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const onClick = (e: MouseEvent) => {
      if (!isOpen) {
        return;
      }
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', onClick);

    return () => document.removeEventListener('click', onClick);
  }, [isOpen, ref]);

  return (
    <FieldWrapper
      label={label}
      id={id}
      required={required}
      disabled={disabled}
      readonly={readonly}
      errorMessage={errorMessage}
      className={className}
      isSelect
    >
      <div ref={ref} className={styles.inputContainer}>
        <div
          role="button"
          aria-expanded={isOpen}
          onClick={toggleList}
          className={styles.input}
        >
          <p>
            {!value
              ? placeholder
              : options.find((option) => {
                  return option.id === value.id || option.label === value.label;
                })?.label || placeholder}
          </p>
        </div>
        <ul
          role="listbox"
          className={`${styles.list}${isOpen ? ` ${styles.listOpen}` : ''}`}
        >
          {enableSearch && (
            <input
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              className={styles.searchbar}
              placeholder={searchPlaceholder}
              aria-label={`Search ${label}`}
            />
          )}
          {filteredOptions.map(({label, id: optionId}, idx) => {
            return (
              <li
                key={`${id}-${optionId}-${idx}`}
                id={`${id}-${optionId}`}
                role="option"
                tabIndex={0}
                onClick={() => {
                  onChange?.({id, label});
                  setIsOpen(false);
                }}
              >
                {label}
              </li>
            );
          })}
        </ul>
      </div>
    </FieldWrapper>
  );
};

export default SelectInput;
