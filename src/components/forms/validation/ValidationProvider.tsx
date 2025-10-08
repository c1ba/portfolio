import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react';

const DEFAULT = {invalidFields: {}, invisibleFields: []};

const ctx = createContext<{
  invalidFields: {
    [key: string]: 'required' | 'invalid';
  };
  invisibleFields: string[];
}>(DEFAULT);

type ValidationProviderProps = {
  rules: {
    [id: string]: {
      required: boolean;
      customValidation?: RegExp;
      visibilityControls?: {value: string; fields: string[]}[];
    };
  };
  data: {
    [id: string]: string | number | Date;
  };
};

const ValidationProvider = ({
  rules,
  data,
  children,
}: PropsWithChildren<ValidationProviderProps>) => {
  const [invalidFields, setInvalidFields] = useState(DEFAULT.invalidFields);
  const [invisibleFields, setInvisibleFields] = useState(
    DEFAULT.invisibleFields,
  );

  const visiblityRules = useMemo(() => {
    return Object.entries(rules).reduce(
      (previousValue, [id, {visibilityControls}]) => {
        if (!visibilityControls) {
          return {...previousValue};
        }
        const visibilityRule = visibilityControls.reduce<{
          [id: string]: {[id: string]: string};
        }>((prev, {value, fields}) => {
          const f = Object.fromEntries(
            fields.map((field) => [
              field,
              {...prev[`${field}`], [`${id}`]: value},
            ]),
          );
          return {...prev, ...f};
        }, {});
        return {...previousValue, ...visibilityRule};
      },
      {},
    );
  }, [rules]);
  console.log(visiblityRules);

  const updateValidationState = (id: string, value: string) => {
    const rule = rules[id];
    if (rule.required && !value) {
      setInvalidFields((prev) => ({...prev, [`${id}`]: 'required'}));
      return;
    }

    if (rule.customValidation && rule.customValidation.test(value)) {
      setInvalidFields((prev) => ({...prev, [`${id}`]: 'invalid'}));
      return;
    }
  };

  const updateVisibilityState = (id: string, value: string) => {};

  return (
    <ctx.Provider value={{invalidFields, invisibleFields}}>
      {children}
    </ctx.Provider>
  );
};

export default ValidationProvider;

export const useValidation = () => {
  return useContext(ctx);
};
