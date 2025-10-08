'use client';
import {FieldType} from '@/components/forms/types';
import {TextInput} from '../forms/TextInput';
import {camelCase} from '@/utils/stringUtils';
import {useCallback, useState} from 'react';
import {TextArea} from '../forms/Textarea';
import SelectInput from '../forms/SelectInput';
import FieldRenderer from '../forms/validation/FieldRenderer';
import ValidationProvider from '../forms/validation/ValidationProvider';

type EmailTemplateProps = {
  fields: {
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
  }[];
  onChange?: () => void;
  onBlur?: () => void;
};

const EmailTemplate = ({fields}: EmailTemplateProps) => {
  const [data, setData] = useState<{[key: string]: string | number | Date}>({});

  const onChange = useCallback(
    (id: string, value: string | number | Date) => {
      setData((prev) => ({
        ...prev,
        [id]: value,
      }));
    },
    [data],
  );

  const validationRules = Object.fromEntries(
    fields.map((field) => [
      camelCase(field.label),
      {
        required: !!field.required,
        customValidation: undefined,
        visibilityControls: ['Select', 'Radio'].includes(field.type)
          ? [
              ...(field.options || []).map((option) => ({
                value: option.label,
                fields: option.revealOnSelect
                  ? [camelCase(option.revealOnSelect)]
                  : [],
              })),
            ]
          : [],
      },
    ]),
  );
  return (
    <ValidationProvider data={data} rules={validationRules}>
      <form>
        {fields.map((field, idx) => {
          const {label} = field;
          const id = camelCase(label);
          return (
            <FieldRenderer
              key={`field-${idx}`}
              {...field}
              onChange={onChange}
              id={id}
              value={data[id]}
            />
          );
        })}
        <button type="submit">Submit</button>
      </form>
    </ValidationProvider>
  );
};

export default EmailTemplate;
