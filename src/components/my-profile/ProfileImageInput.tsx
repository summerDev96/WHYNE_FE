import React, { useRef, useState } from 'react';

/**
 * 가장 기본적인 이미지 업로드 + 미리보기 컴포넌트
 * - 이미지를 클릭하면 파일 선택창이 열립니다.
 * - 파일을 선택하면 미리보기가 즉시 반영됩니다.
 */
export function ProfileImageInput() {
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

  return (
    <div className='flex flex-col items-center gap-2'>
      {/* 이미지 미리보기 영역 */}
      <div
        onClick={handleImageClick}
        className='w-32 h-32 rounded-full overflow-hidden border cursor-pointer'
      >
        <img
          src={previewUrl ?? 'https://via.placeholder.com/150'}
          alt='프로필 미리보기'
          className='w-full h-full object-cover'
        />
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
