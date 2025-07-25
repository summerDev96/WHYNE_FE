import React from 'react';

import { useForm, type SubmitHandler } from 'react-hook-form';

import Input from '@/components/common/Input';
import { Button } from '@/components/ui/button';

interface ProfileProps {
  nickname: string; // 현재 사용자 닉네임 (초기값으로 사용)
  profileImageUrl: string; // 프로필 이미지 URL (이미지 표시용)
}

interface FormValues {
  nickname: string; // 폼에서 입력할 닉네임 값
}

export default function Profile({ nickname, profileImageUrl }: ProfileProps) {
  // useForm 훅 초기화
  const {
    register, // input 등록용 함수
    handleSubmit, // 폼 제출 핸들러 래퍼
    watch, // 특정 필드 값 관찰
    reset, // 폼 상태 초기화
    formState: { isSubmitting }, // 제출 중 상태
  } = useForm<FormValues>({
    defaultValues: { nickname }, // 초기값으로 기존 닉네임 설정
    mode: 'onChange', // 입력 시마다 유효성 검사 실행
  });

  // 현재 입력된 값을 관찰
  const current = watch('nickname');
  // 기존 닉네임과 다르고 비어있지 않을 때만 true
  const isChanged = current.trim().length > 0 && current !== nickname;

  // 폼 제출 시 호출되는 함수
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      // 실제 API 연결 시 axios/fetch 호출로 교체
      await new Promise((r) => setTimeout(r, 1000));
      console.log(`닉네임 변경: ${nickname} → ${data.nickname}`);

      // 제출 성공 후 폼 상태를 새 기본값으로 초기화
      reset({ nickname: data.nickname });
    } catch (e) {
      // 에러 UI 없이 콘솔에만 출력
      console.error('닉네임 변경 오류:', e);
    }
  };

  return (
    <div className='p-5 flex flex-col gap-5 rounded-xl border bg-white max-h-[530px] xl:justify-between xl:py-7 shadow-md'>
      {/* 프로필 섹션: 이미지 & 현재 닉네임 */}
      <div className='flex items-center gap-4 xl:flex-col xl:gap-8'>
        <div className='w-16 h-16 rounded-full overflow-hidden xl:w-40 xl:h-40'>
          {/* 추후 이미지 업로드 기능 추가 필요 */}
          <img src={profileImageUrl} alt='프로필 이미지' className='w-full h-full object-cover' />
        </div>
        <div className='custom-text-xl-bold text-gray-800 md:custom-text-2xl-bold'>{nickname}</div>
      </div>

      {/* 닉네임 변경 폼 */}
      <form
        onSubmit={handleSubmit(onSubmit)} // react-hook-form 제출 처리
        className='flex flex-col items-end gap-1.5 md:flex-row xl:flex-col'
      >
        {/* 입력 필드 그룹 */}
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
            placeholder='새 닉네임을 입력하세요'
            defaultValue={nickname} // 초기값 설정
            {...register('nickname', {
              required: '닉네임을 입력해주세요.',
              minLength: { value: 2, message: '최소 2자 이상 입력하세요.' },
              maxLength: { value: 20, message: '최대 20자까지 가능합니다.' },
            })}
            onInvalid={(e: React.FormEvent<HTMLInputElement>) =>
              // 브라우저 유효성 오류를 콘솔에만 출력
              console.error(
                '닉네임 유효성 오류:',
                (e.currentTarget as HTMLInputElement).validationMessage,
              )
            }
          />
        </div>

        {/* 제출 버튼: 버튼이 좀 이상해서 api 연결 후 수정해보겠습니다다 */}
        <Button
          type='submit'
          variant='purpleDark'
          className='min-w-[89px] md:min-w-[116px] xl:min-w-[96px]'
          size='sm'
          fontSize='md'
          disabled={!isChanged || isSubmitting} // 변경된 상태 && 제출 중 아님
        >
          {isSubmitting ? '변경 중…' : '변경하기'} {/* 제출 중 텍스트 토글 */}
        </Button>
      </form>
    </div>
  );
}
