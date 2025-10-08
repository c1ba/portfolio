export type FieldType = Lowercase<
  | 'Text'
  | 'Number'
  | 'Email'
  | 'Date'
  | 'File'
  | 'Textarea'
  | 'Select'
  | 'Radio'
  | 'Checkbox'
>;

export type Field = {
  label: string;
  helpText?: string;
  required?: boolean;
  errorMessage?: string;
  min?: number | Date;
  max?: number | Date;
};

export type FieldProps = {
  onChange?: (value: string | number) => void;
  onBlur?: (value: string | number) => void;
  className?: string;
  id: string;
  errorMessage?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  label: string;
};

export type InputFieldProps = FieldProps & {
  min?: number;
  max?: number;
};
