import React from 'react';

import {
  useFormContext,
  useFormState,
  type FieldErrors,
  type FieldValues,
  type Path,
} from 'react-hook-form';

import Input from '@/components/common/Input';

interface FormInputProps<T> {
  placeholder: string;
  name: Path<T>;
  type: string;
  id: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// FormProvider로 감싸지 않으면 오류 발생
const FormInput = <T extends FieldValues>(props: FormInputProps<T>) => {
  const { placeholder, name, type, id, onChange } = props;
  const methods = useFormContext();
  const { errors } = useFormState({ name });

  function getErrorMessage(errors: FieldErrors) {
    const errMsg = errors[name]?.message;
    const result = errMsg && typeof errMsg === 'string' ? errMsg : '';
    return result;
  }

  const { onChange: FormOnChange, ...field } = methods.register(name);

  return (
    <Input
      {...field}
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      errorMessage={getErrorMessage(errors)}
      onChange={(e) => {
        FormOnChange(e);
        onChange?.(e);
      }}
    />
  );
};

export default FormInput;
