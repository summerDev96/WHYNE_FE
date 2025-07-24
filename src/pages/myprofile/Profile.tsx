import React from 'react';

import { useForm } from 'react-hook-form';

import Input from '@/components/common/Input';
import { Button } from '@/components/ui/button';

interface ProfileProps {
  nickname: string;
  profileImageUrl: string;
}

interface FormValues {
  nickname: string;
}

export default function Profile({ nickname, profileImageUrl }: ProfileProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isDirty },
  } = useForm<FormValues>({
    defaultValues: {
      nickname: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(`닉네임 변경: ${nickname} → ${data.nickname}`);
  };

  return (
    <div className='p-5 flex flex-col gap-5 rounded-xl border bg-white max-h-[530px] xl:justify-between xl:py-7 shadow-md'>
      <div className='flex items-center gap-4 xl:flex-col gap-8'>
        <div className='w-16 h-16 rounded-full overflow-hidden xl:w-40 xl:h-40'>
          <img src={profileImageUrl} alt='프로필 이미지' className='w-full h-full object-cover' />
        </div>
        <div className='custom-text-xl-bold text-gray-800 md:custom-text-2xl-bold'>{nickname}</div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col items-end gap-1.5 md:flex-row xl:flex-col'
      >
        <div className='flex flex-col w-full gap-[10px]'>
          <label
            htmlFor='nickname'
            className='custom-text-md-medium text-gray-800 md:custom-text-lg-medium'
          >
            닉네임
          </label>
          <Input
            id='nickname'
            type='text'
            variant='name'
            placeholder={nickname}
            {...register('nickname')}
            className='w-full [&+div[role=alert]]:hidden'
          />
        </div>
        <Button
          type='submit'
          variant='purpleDark'
          className='w-[89px] md:w-[116px] xl:w-[96px]'
          size='sm'
          fontSize='md'
          disabled={!isDirty || !watch('nickname').trim()}
        >
          변경하기
        </Button>
      </form>
    </div>
  );
}
