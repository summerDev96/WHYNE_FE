// 샤드cn은 아닌데 조합해서 쓸 것 같아서 components/ui에 넣어뒀습니다.
import React, { forwardRef, InputHTMLAttributes } from 'react';

import SearchIcon from '@/assets/search.svg';
import { cn } from '@/lib/utils';

interface Props extends React.ComponentProps<'input'> {
  //name은 내려주면 안됩니다!
  id: string;
  type: InputHTMLAttributes<HTMLInputElement>['type'];
  placeholder?: string;
  className?: string;
  variant?: 'default' | 'search' | 'name';
  errorMessage?: string;
}

//rhf 쓸거면 {...register("name")할 때 ref 반환되니까 여기에서 이어줄려면 forwadRef 필요할듯?}
const Input = forwardRef<HTMLInputElement, Props>(
  (
    { id, type = 'text', placeholder, className, variant = 'default', errorMessage, ...rest },
    ref,
  ) => {
    return (
      <div className='relative'>
        <label
          htmlFor={id}
          aria-label='search아이콘'
          className='absolute left-[20px] top-[9px] w-[20px] h-[20px] cursor-pointer'
        >
          {variant === 'search' && <SearchIcon />}
        </label>
        <input
          ref={ref}
          id={id}
          type={type}
          placeholder={placeholder}
          className={cn(
            variantStyles.base,
            variant && variantStyles[variant],
            errorMessage && 'border-red-500',
            className,
          )}
          {...rest}
        />
        <div role='alert' className='text-red-500 mt-[4px]'>
          {errorMessage}
        </div>
      </div>
    );
  },
);

export default Input;

Input.displayName = 'Input';

//md 768이상  xl 1280이상
const variantStyles = {
  base: 'rounded-[16px] bg-white border border-gray-300 outline-none active:border-gray-500 focus:border-gray-500 font-sans',
  default: 'px-[20px] py-[11px] w-[303px] md:w-[400px]',
  search: 'w-[210px] py-[7px] px-[45px] rounded-[50px] md:w-[400px]',
  name: 'px-[20px] py-[11px]  w-full',
};
