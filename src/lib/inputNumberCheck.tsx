import React from 'react';

import { UseFormSetValue, UseFormClearErrors, Path } from 'react-hook-form';

export function getCommaNumberHandlers<T extends Record<string, any>>(
  field: Path<T>,
  setValue: UseFormSetValue<T>,
  clearErrors: UseFormClearErrors<T>,
) {
  return {
    ////숫자만 가능하게 하고 0은없애ㅐ고 중간에 쉼표를 섞고 제한도 거는 input ///
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value.replace(/,/g, ''); //쉼표제거
      value = value.replace(/\D/g, ''); //숫자 아닌거 제거

      if (value.startsWith('0')) {
        value = value.replace(/^0+/, ''); //맨 앞에 0 제거
      }

      if (value.length > 10) {
        value = value.slice(0, 10); //자리수 10개로 제한
      }

      //쉼표가 추가된 형식으로 보여줌
      const formatted = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

      setValue(field, formatted as unknown as T[typeof field], {
        shouldValidate: true,
        shouldDirty: true,
      });
      clearErrors(field);
    },
  };
}
