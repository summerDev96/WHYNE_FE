import React, { useEffect, useRef, useState } from 'react';

import Camera from '@/assets/camera.svg';
import UserDefaultImg from '@/assets/icons/userDefaultImg.svg';

interface ProfileImageInputProps {
  /** 유저가 이미 프로필 이미지를 갖고 있다면 초기 이미지 URL */
  defaultImageUrl?: string;
}

/**
 * 이미지 업로드 + 미리보기 컴포넌트
 * - 이미지를 클릭하면 파일 선택창 오픈
 * - 파일을 선택하면 미리보기가 즉시 반영
 */
export function ProfileImageInput({ defaultImageUrl }: ProfileImageInputProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null); // 숨겨진 input 제어
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // 미리보기 이미지 URL

  /** 이미지 클릭 시 파일 input 클릭 트리거 */
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  /** 파일 선택 시 미리보기 URL 생성 */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file); // 브라우저가 파일을 가짜 주소로 보여줌
      setPreviewUrl(url);
    }
  };

  /** 초기 이미지 설정 */
  useEffect(() => {
    if (defaultImageUrl) {
      setPreviewUrl(defaultImageUrl);
    }
  }, [defaultImageUrl]);

  return (
    <div className='flex flex-col items-center gap-2'>
      {/* 이미지 미리보기 영역 */}
      <div className='group relative overflow-hidden rounded-full w-16 h-16 xl:w-40 xl:h-40 cursor-pointer'>
        <div onClick={handleImageClick} className='rounded-full border border-gray-300'>
          {previewUrl ? (
            <img src={previewUrl} alt='프로필 미리보기' className='w-full h-full object-cover' />
          ) : (
            <UserDefaultImg className='w-full h-full text-gray-100' />
          )}
        </div>

        {/* Hover 시 보여줄 오버레이 */}
        <div className='absolute inset-0 bg-primary/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition'>
          <Camera className='w-4 h-4 text-white xl:w-8 xl:h-8' />
        </div>
      </div>

      {/* 숨겨진 파일 업로드 input */}
      <input
        type='file'
        accept='image/*'
        onChange={handleFileChange}
        ref={fileInputRef}
        className='hidden'
      />
    </div>
  );
}
