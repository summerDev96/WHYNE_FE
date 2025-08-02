import React from 'react';

import { UseFormSetValue, UseFormClearErrors, Path, FieldValues } from 'react-hook-form';

export function getTrimmedHandlers<T extends FieldValues>(
  field: Path<T>,
  setValue: UseFormSetValue<T>,
  clearErrors: UseFormClearErrors<T>,
) {
  return {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;

      // 특수문자 제거 (한글, 영문, 숫자, 공백만 허용)
      value = value.replace(/[^ㄱ-ㅎ가-힣a-zA-Z0-9\s]/g, '');

      // 실시간 입력 시 앞 공백 막음
      if (value.startsWith(' ')) {
        value = value.trimStart();
      }

      setValue(field, value as T[typeof field], {
        shouldValidate: true,
        shouldDirty: true,
      });
      clearErrors(field);
    },

    //블러 밖으로 가면 공백 제거
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
      const trimmed = e.target.value.trim();
      setValue(field, trimmed as T[typeof field], {
        shouldValidate: true,
        shouldDirty: true,
      });
    },
  };
}
