import React, { useState } from 'react';

import {
  useFormContext,
  useFormState,
  type FieldErrors,
  type FieldValues,
  type Path,
} from 'react-hook-form';

import PasswordIconOff from '@/assets/icons/visibility_off.svg';
import PasswordIconOn from '@/assets/icons/visibility_on.svg';
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

  const [passwordType, setPasswordType] = useState(type);
  const isPasswordType = type === 'password';
  const showPassword = passwordType === 'text';

  function getErrorMessage(errors: FieldErrors) {
    const errMsg = errors[name]?.message;
    const result = errMsg && typeof errMsg === 'string' ? errMsg : '';
    return result;
  }

  const { onChange: formOnChange, ...inputProps } = methods.register(name);

  const togglePasswordIcon = () => {
    setPasswordType((prev) => (prev === 'password' ? 'text' : 'password'));
  };

  return (
    <div className='relative'>
      <Input
        {...inputProps}
        type={isPasswordType ? passwordType : type}
        id={id}
        name={name}
        placeholder={placeholder}
        errorMessage={getErrorMessage(errors)}
        onChange={(e) => {
          formOnChange(e);
          onChange?.(e);
        }}
      />
      {isPasswordType && (
        <button
          type='button'
          className='absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500'
          aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보이기'}
          aria-pressed={showPassword}
          onClick={togglePasswordIcon}
        >
          {showPassword ? <PasswordIconOn /> : <PasswordIconOff />}
        </button>
      )}
    </div>
  );
};

export default FormInput;
