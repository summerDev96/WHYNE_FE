import React, { useRef } from 'react';

import Image from 'next/image';

import Camera from '@/assets/camera.svg';
import UserDefaultImg from '@/assets/icons/userDefaultImg.svg';

interface ProfileImageInputProps {
  /** 미리보기 또는 서버에서 받은 프로필 이미지 URL (null이면 기본 이미지 표시) */
  imageUrl?: string | null;

  /** 이미지 파일이 선택되었을 때 부모에게 전달할 콜백 */
  onFileSelect?: (file: File) => void;
}

/**
 * ProfileImageInput
 *
 * 프로필 이미지 업로드 + 미리보기 컴포넌트
 *
 * - `imageUrl`이 있다면 해당 이미지 렌더링
 * - blob:이면 `<img>`, 일반 URL이면 `<Image>`
 * - 클릭 시 파일 선택창을 열고 이미지 선택 가능
 * - 선택된 파일은 `onFileSelect` 콜백으로 상위 컴포넌트에 전달
 */
export function ProfileImageInput({ imageUrl, onFileSelect }: ProfileImageInputProps) {
  // input[type=file] DOM에 접근하기 위한 ref
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  /**
   * 프로필 이미지 영역 클릭 시 파일 선택창을 오픈함
   */
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  /**
   * 이미지 파일 선택 시 onFileSelect 콜백으로 전달
   *
   * @param e input[type=file]의 change 이벤트
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ['image/png', 'image/jpeg', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        alert('지원하지 않는 이미지 형식입니다.');
        return;
      }

      onFileSelect?.(file);
    }
  };

  return (
    <div className='flex flex-col items-center gap-2'>
      {/* 이미지 렌더링 영역 (클릭 시 파일 선택) */}
      <div
        onClick={handleImageClick}
        className='group relative overflow-hidden rounded-full w-16 h-16 xl:w-40 xl:h-40 cursor-pointer'
      >
        {/* 프로필 이미지 컨테이너 */}
        <div className='w-full h-full flex items-center justify-center  rounded-full border border-gray-300'>
          {/* blob: URL일 경우: <img> 태그 사용 */}
          {imageUrl && imageUrl.startsWith('blob:') ? (
            <img
              src={imageUrl}
              alt='미리보기'
              className='w-full h-full object-cover rounded-full'
            />
          ) : imageUrl ? (
            // 일반 URL일 경우: next/image 사용 (서버 이미지)
            <Image
              src={imageUrl}
              alt='프로필 이미지'
              width={64}
              height={64}
              className='w-full h-full object-cover rounded-full'
              unoptimized
              priority
            />
          ) : (
            // 이미지가 없을 경우 기본 아이콘
            <UserDefaultImg className='w-full h-full text-gray-100' />
          )}
        </div>

        {/* 마우스 오버 시 카메라 아이콘 오버레이 */}
        <div className='absolute inset-0 bg-primary/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition'>
          <Camera className='w-4 h-4 text-white xl:w-8 xl:h-8' />
        </div>
      </div>

      {/* 실제 input[type="file"]: hidden 처리 */}
      <input
        type='file'
        accept='.png, .jpg, .jpeg, .webp'
        onChange={handleFileChange}
        ref={fileInputRef}
        className='hidden'
      />
    </div>
  );
}
