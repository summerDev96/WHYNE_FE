import React, { useState } from 'react';

import Input from '@/components/common/Input';
import { Button } from '@/components/ui/button';

interface ProfileProps {
  nickname: string;
  profileImageUrl: string;
}

export default function Profile({ nickname, profileImageUrl }: ProfileProps) {
  const [newNickname, setNewNickname] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewNickname(e.target.value);
  };

  return (
    <div className='p-5 flex flex-col gap-5 rounded-xl border bg-white'>
      <div className='flex items-center gap-4'>
        <div className='w-16 h-16 rounded-full overflow-hidden'>
          <img
            src={profileImageUrl}
            alt='프로필 플레이스홀더'
            className='w-full h-full object-cover'
          />
        </div>
        <div className='custom-text-xl-bold text-gray-800'>유저 닉네임</div>
      </div>
      <div className='flex flex-col items-end gap-1.5'>
        <div className='flex flex-col w-full gap-2'>
          <label htmlFor='nickname' className='custom-text-md-medium text-gray-800'>
            닉네임
          </label>
          <Input
            id='nickname'
            type='text'
            variant='name'
            placeholder={nickname}
            value={newNickname}
            onChange={handleChange}
            className='w-full'
          />
        </div>
        <Button
          variant='purpleDark'
          className='w-[89px] md:w-[116px] xl:w-[96px]'
          size='sm'
          fontSize='md'
          disabled={!newNickname.trim()}
        >
          변경하기
        </Button>
      </div>
    </div>
  );
}
