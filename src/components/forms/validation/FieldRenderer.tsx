import {camelCase} from '@/utils/stringUtils';
import {TextInput} from '../TextInput';
import {FieldType} from '../types';
import {TextArea} from '../Textarea';
import SelectInput from '../SelectInput';

type FieldRendererProps = {
  id: string;
  label: string;
  type: FieldType;
  helpText?: string;
  required?: boolean;
  errorMessage?: {
    required?: string;
  };
  options?: {
    label: string;
    revealOnSelect?: string;
  }[];
  min?: number | Date;
  max?: number | Date;
  onChange?: (id: string, value: string | number | Date) => void;
  value: string | number | Date;
};

const FieldRenderer = ({
  id,
  label,
  type,
  helpText,
  required,
  errorMessage,
  options,
  min,
  max,
  onChange,
  value,
}: FieldRendererProps) => {
  return (
    <div>
      {['text', 'email', 'password', 'number'].includes(type) && (
        <TextInput
          type={type as 'text' | 'email' | 'password' | 'number'}
          value={(value || '').toString()}
          label={label}
          id={id}
          onChange={(val) => onChange?.(id, val)}
          required={required}
          min={typeof min == 'number' ? min : undefined}
          max={typeof max == 'number' ? max : undefined}
        />
      )}
      {['textarea'].includes(type) && (
        <TextArea
          value={(value || '').toString()}
          label={label}
          id={id}
          onChange={(val) => onChange?.(id, val)}
          required={required}
        />
      )}
      {['select'].includes(type) && (
        <SelectInput
          value={{label: (value || '').toString()}}
          id={id}
          label={label}
          enableSearch={(options || []).length > 10}
          options={
            options?.map((field) => ({
              id: camelCase(label),
              label: label,
            })) || []
          }
          onChange={(value) => onChange?.(id, value.label)}
        />
      )}
    </div>
  );
};

export default FieldRenderer;
