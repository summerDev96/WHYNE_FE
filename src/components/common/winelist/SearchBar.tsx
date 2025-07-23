// src/components/winelist/SearchBar.tsx

import { Search } from 'lucide-react';

export default function SearchBar() {
  return (
    <div
      className='
        flex items-center
        w-[343px] h-[38px]                // 모바일 사이즈
        rounded-full
        border gray-300
        px-[15px] py-[14px]               // 모바일 패딩

        md:w-[396px] md:h-[48px]          // 태블릿
        md:px-[20px]

        xl:w-[800px] xl:h-[48px]          // PC
      '
    >
      {/* 아이콘 */}
      <Search className='w-4 h-4 text-gray-500' />

      {/* 입력창 */}
      <input
        type='text'
        placeholder='와인을 검색해보세요'
        className='
          flex-1
          ml-[10px]
          text-[14px] md:text-[16px]
          bg-transparent
          outline-none
          placeholder:text-gray-500
        '
      />
    </div>
  );
}
